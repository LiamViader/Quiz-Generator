import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { GeneratorRequestDto } from './dto/generator-request.dto';
import { constructQuizPrompt } from './utils/constructQuizPrompt';
import { generateQuizChoicesOpenAI } from './utils/generateQuizOpenAI';
import { constructQuestionsFromChoice } from './utils/constructQuizFromChoice';
import { QuizService } from 'src/quiz/quiz.service';
import { Quiz } from 'src/quiz/quiz.model';

import { shapeQuizName } from './utils/shapeQuizName';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DailyUsage } from './schemas/daily-usage.schema';

@Injectable()
export class GeneratorService {


    constructor(
        private readonly quizService: QuizService,
        private readonly configService: ConfigService,
        @InjectModel(DailyUsage.name) private dailyUsageModel: Model<DailyUsage>
    ) { }

    async generateQuiz(createRequestDto: GeneratorRequestDto) {
        console.time('Total Generation Time');

        console.time('Rate Limit Check');
        await this.checkAndIncrementDailyUsage();
        console.timeEnd('Rate Limit Check');

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

            console.time('OpenAI API Call');
            const choices = await generateQuizChoicesOpenAI(prompt);
            console.timeEnd('OpenAI API Call');

            console.log("GENERATING THE CHOICES");

            console.time('Parsing Questions');
            const questions = constructQuestionsFromChoice(choices[0]);
            console.timeEnd('Parsing Questions');

            const quiz = {
                solved: false,
                privacy: privacy,
                name: name,
                topic: topic,
                questions: questions,
                difficulty: difficulty,
                language: language
            };

            console.time('DB Save');
            const createdQuiz: Quiz = await this.quizService.create(quiz as Quiz);
            console.timeEnd('DB Save');

            console.timeEnd('Total Generation Time');

            return {
                status: 'success',
                message: 'Quiz generated successfully',
                data: createdQuiz,
            };
        } catch (error) {
            console.timeEnd('Total Generation Time');

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

    private async checkAndIncrementDailyUsage(): Promise<void> {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const dailyLimit = parseInt(this.configService.get<string>('DAILY_QUIZ_LIMIT'));

        const usage = await this.dailyUsageModel.findOneAndUpdate(
            { date: today },
            { $inc: { count: 1 } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        if (usage.count > dailyLimit) {
            throw new HttpException(
                `Global daily limit of ${dailyLimit} quizzes reached. Please try again tomorrow or Log in to your account to generate more quizzes.`,
                HttpStatus.TOO_MANY_REQUESTS
            );
        }
    }
}
