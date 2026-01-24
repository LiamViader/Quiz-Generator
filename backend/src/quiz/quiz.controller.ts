import { Controller, Get, Query, DefaultValuePipe, ParseIntPipe, UseGuards, Req, Patch, Param, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OptionalJwtAuthGuard } from '../auth/optional-jwt-auth.guard';
import { QuizService } from './quiz.service';
import { Quiz } from './quiz.model';


@Controller('quizzes')
export class QuizzesController {
    constructor(private readonly quizService: QuizService) { }

    @Get('mine')
    @UseGuards(JwtAuthGuard)
    async getMyQuizzes(
        @Req() req,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('pageSize', new DefaultValuePipe(20), ParseIntPipe) pageSize: number,
    ): Promise<Quiz[]> {
        return this.quizService.findByCreator(req.user._id, page, pageSize);
    }

    @Get('public')
    @UseGuards(OptionalJwtAuthGuard)
    async getPublicQuizzes(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('pageSize', new DefaultValuePipe(20), ParseIntPipe) pageSize: number,
        @Req() req
    ): Promise<Quiz[]> {
        const userId = req.user ? req.user._id : null;
        return this.quizService.findPublicQuizzes(page, pageSize, userId);
    }

    @Patch(':id/privacy')
    @UseGuards(JwtAuthGuard)
    async updatePrivacy(
        @Param('id') id: string,
        @Body('privacy') privacy: string,
        @Req() req
    ): Promise<Quiz> {
        return this.quizService.updateAccess(id, req.user._id, privacy);
    }
}
