import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { GeneratorRequestDto } from './dto/generator-request.dto';
import { constructQuizPrompt } from './utils/constructQuizPrompt';
import { generateQuizOpenAI } from './utils/generateQuizOpenAI';
import { QuizService } from 'src/quiz/quiz.service';
import { Quiz } from 'src/quiz/quiz.model';

import { shapeQuizName } from './utils/shapeQuizName';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DailyUsage } from './schemas/daily-usage.schema';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class GeneratorService {


    constructor(
        private readonly quizService: QuizService,
        private readonly configService: ConfigService,
        private readonly usersService: UsersService,
        @InjectModel(DailyUsage.name) private dailyUsageModel: Model<DailyUsage>
    ) { }

    async generateQuiz(createRequestDto: GeneratorRequestDto, user?: User) {
        await this.checkAndIncrementDailyUsage(user);

        const topic = createRequestDto.topic;
        const difficulty = createRequestDto.difficulty;
        const numberQuestions = createRequestDto.numberQuestions;
        const language = createRequestDto.language;
        const privacy = createRequestDto.privacy;
        let name = createRequestDto.name;
        name = shapeQuizName(name);

        const prompt = constructQuizPrompt(topic, difficulty, numberQuestions, language);
        console.log("GENERATING THE PROMPT");

        try {
            console.log(name);

            const questions = await generateQuizOpenAI(prompt);

            const quiz = {
                solved: false,
                privacy: privacy,
                name: name,
                topic: topic,
                questions: questions,
                difficulty: difficulty,
                language: language,
                creatorId: user?.id
            };

            const createdQuiz: Quiz = await this.quizService.create(quiz as Quiz);



            return {
                status: 'success',
                message: 'Quiz generated successfully',
                data: createdQuiz,
            };
        } catch (error) {

            if (error instanceof HttpException) {
                throw error;
            }
            if (error.message === 'topic dont make sense' || error.message === 'content not safe') {
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            }
            console.error('INTERNAL GENERATION ERROR:', error);

            throw new HttpException('Something went wrong generating the quiz. Please try again later.', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    private async checkAndIncrementDailyUsage(user?: User): Promise<void> {
        const today = new Date().toISOString().split('T')[0];
        const globalLimit = parseInt(this.configService.get<string>('GLOBAL_DAILY_QUIZ_LIMIT'));
        const personalLimit = parseInt(this.configService.get<string>('PERSONAL_DAILY_QUIZ_LIMIT'));

        // Check if user Quota is exceeded
        if (user) {
            // Reset count if new day
            if (user.lastUsageDate !== today) {
                user.dailyPersonalUsage = 0;
                user.lastUsageDate = today;
            }

            if (user.dailyPersonalUsage < personalLimit) {
                user.dailyPersonalUsage++;
                await this.usersService.update(user);
                return; // Access Granted via Personal Quota
            }
            // If personal limit reached, Fallback to Global Limit logic below
        }

        // 2. Check Global Quota (Shared Lane)
        // This runs if: User is anonymous OR User exhausted personal quota

        // Assure the document exists for today
        await this.dailyUsageModel.updateOne(
            { date: today },
            { $setOnInsert: { count: 0 } },
            { upsert: true }
        );

        // Increment count if within limit
        const usage = await this.dailyUsageModel.findOneAndUpdate(
            {
                date: today,
                count: { $lt: globalLimit }
            },
            {
                $inc: { count: 1 }
            },
            {
                new: true
            }
        );

        if (!usage) {
            let message = `Global daily limit for unlogged users of ${globalLimit} quizzes reached.`;
            if (!user) {
                message += ` Log in to your account to get ${personalLimit} guaranteed daily generations Or try again tomorrow.`;
            } else {
                message += ` You have also exhausted your ${personalLimit} personal daily generations. Please try again tomorrow.`;
            }
            throw new HttpException(message, HttpStatus.TOO_MANY_REQUESTS);
        }
    }
}
