import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { GeneratorService } from './generator.service';
import { GeneratorRequestDto } from './dto/generator-request.dto';
import { OptionalJwtAuthGuard } from '../auth/optional-jwt-auth.guard';

@Controller('generator')
export class GeneratorController {
    constructor(private readonly generatorService: GeneratorService) { }


    @Post('generate-quiz')
    @UseGuards(OptionalJwtAuthGuard)
    async create(@Body() createRequestDto: GeneratorRequestDto, @Req() req) {
        const result = await this.generatorService.generateQuiz(createRequestDto, req.user);
        return result;
    }
}
