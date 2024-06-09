import { Injectable, HttpException,HttpStatus } from '@nestjs/common';
import { GeneratorRequestDto } from './dto/generator-request.dto';
import { constructQuizPrompt } from './utils/constructQuizPrompt';
import { generateQuizChoicesOpenAI } from './utils/generateQuizOpenAI';
import { constructQuizFromChoice } from './utils/constructQuizFromChoice';

@Injectable()
export class GeneratorService {
    async generateQuiz(createRequestDto: GeneratorRequestDto) {
        const topic=createRequestDto.topic;
        const difficulty=createRequestDto.difficulty;
        const numberQuestions=createRequestDto.numberQuestions;
        const language=createRequestDto.language;

        const prompt=constructQuizPrompt(topic,difficulty,numberQuestions,language);
        
        try{
            const choices=await generateQuizChoicesOpenAI(prompt,1);
            const quiz=constructQuizFromChoice(choices[0]);
            return {
                status: 'success',
                message: 'Quiz generated successfully',
                data: quiz,
              };
        } catch(error){
            throw new HttpException('Failed to generate quiz', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }
}
