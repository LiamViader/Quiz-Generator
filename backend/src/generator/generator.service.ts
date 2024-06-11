import { Injectable, HttpException,HttpStatus } from '@nestjs/common';
import { GeneratorRequestDto } from './dto/generator-request.dto';
import { constructQuizPrompt } from './utils/constructQuizPrompt';
import { generateQuizChoicesOpenAI } from './utils/generateQuizOpenAI';
import { constructQuestionsFromChoice } from './utils/constructQuizFromChoice';
import { QuizService } from 'src/quiz/quiz.service';
import { Quiz } from 'src/quiz/quiz.model';
import { generateQuizChoicesWithRetry } from './utils/generateQuizOpenAI';
import { shapeQuizName } from './utils/shapeQuizName';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class GeneratorService {
    private endpointGPT4: string;
    private apiKeyGPT4: string;

    constructor(private readonly quizService: QuizService, private readonly configService: ConfigService,) {
        this.endpointGPT4 = this.configService.get<string>('AZURE_OPENAI_ENDPOINT');
        this.apiKeyGPT4 = this.configService.get<string>('AZURE_OPENAI_API_KEY');
        
    }

    async generateQuiz(createRequestDto: GeneratorRequestDto) {
        const topic=createRequestDto.topic;
        const difficulty=createRequestDto.difficulty;
        const numberQuestions=createRequestDto.numberQuestions;
        const language=createRequestDto.language;
        const privacy=createRequestDto.privacy;
        let name=createRequestDto.name;
        name=shapeQuizName(name);


        const prompt=constructQuizPrompt(topic,difficulty,numberQuestions,language);
        console.log("GENERA LA PROMPT");

        try{
            console.log(name);
            const choices=await generateQuizChoicesWithRetry(prompt,1,2,this.endpointGPT4,this.apiKeyGPT4);
            console.log("GENERA ELS CHOICES");
            const questions=constructQuestionsFromChoice(choices[0]);
            const quiz={
                solved: false,
                privacy: privacy,
                name: name,
                topic: topic,
                questions: questions,
                difficulty: difficulty,
                language: language
            };
            const createdQuiz: Quiz = await this.quizService.create(quiz as Quiz);
            return {
                status: 'success',
                message: 'Quiz generated successfully',
                data: createdQuiz,
            };
        } catch(error){
            throw new HttpException('Failed to generate quiz: '+error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }
}
