import { Controller, Get, Post, Body } from '@nestjs/common';
import { GeneratorRequestDto } from './dto/generator-request.dto';
import { GeneratorService } from './generator.service';

@Controller('generator')
export class GeneratorController {
    constructor(private readonly generatorService: GeneratorService) { }


    @Post('generate-quiz')
    async create(@Body() createRequestDto: GeneratorRequestDto) {
        const result = await this.generatorService.generateQuiz(createRequestDto);
        return result;
    }
}
