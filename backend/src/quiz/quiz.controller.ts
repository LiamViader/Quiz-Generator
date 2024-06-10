import { Controller, Get, Query } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Quiz } from './quiz.model';


@Controller('quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService) {}
    
    @Get('public') // Obtener todos los quizzes públicos
    async getPublicQuizzes(@Query('page') page: number, @Query('pageSize') pageSize: number): Promise<Quiz[]> {
        return this.quizService.findPublicQuizzes(page, pageSize);
    }
}
