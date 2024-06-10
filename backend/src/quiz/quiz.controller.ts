import { Controller, Get, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Quiz } from './quiz.model';


@Controller('quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService) {}
    
    @Get('public')
    async getPublicQuizzes(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
    ): Promise<Quiz[]> {
        return this.quizService.findPublicQuizzes(page, pageSize);
    }
}
