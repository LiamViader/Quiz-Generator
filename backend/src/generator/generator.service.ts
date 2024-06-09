import { Injectable, HttpException,HttpStatus } from '@nestjs/common';
import { GeneratorRequestDto } from './dto/generator-request.dto';
import { constructQuizPrompt } from './utils/constructQuizPrompt';
import { generateQuizChoicesOpenAI } from './utils/generateQuizOpenAI';
import { constructQuestionsFromChoice } from './utils/constructQuizFromChoice';

@Injectable()
export class GeneratorService {
    async generateQuiz(createRequestDto: GeneratorRequestDto) {
        const topic=createRequestDto.topic;
        const difficulty=createRequestDto.difficulty;
        const numberQuestions=createRequestDto.numberQuestions;
        const language=createRequestDto.language;
        const privacy=createRequestDto.privacy;
        let name=createRequestDto.name;
        if (name=="") name="Untitled";

        const prompt=constructQuizPrompt(topic,difficulty,numberQuestions,language);
        
        try{
            const choices=await generateQuizChoicesOpenAI(prompt,1);
            const questions=constructQuestionsFromChoice(choices[0]);
            const quiz={
                solved: false,
                privacy: privacy,
                name: name,
                topic: topic,
                id:2,
                questions: questions
            };
            return {
                status: 'success',
                message: 'Quiz generated successfully',
                data: quiz,
              };
        } catch(error){
            throw new HttpException('Failed to generate quiz:'+error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }
}
