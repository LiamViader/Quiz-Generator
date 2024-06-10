import { Controller, Get, Post, Body } from '@nestjs/common';
import { generateQuizMessage } from './generateQuizMessage';
import { GeneratorRequestDto } from './dto/generator-request.dto';
import { GeneratorService } from './generator.service';

@Controller('generator')
export class GeneratorController {
    constructor(private readonly generatorService: GeneratorService) {}
    
    @Get() //per provar si hi ha connexio amb openai, retorna missatge generat per gpt
    async simplePrompt() {
        try {
            const generatedMessage = await generateQuizMessage(); // Llama a la función para generar el mensaje
            return generatedMessage;
          } catch (error) {
            // Maneja errores y proporciona retroalimentación adecuada
            console.error('Error en el controlador:', error);
            return 'Error al generar el mensaje';
          }
    }

    @Post('generate-quiz')
    async create(@Body() createRequestDto: GeneratorRequestDto) {
        console.log("ENTRA AL POST");
        const result = await this.generatorService.generateQuiz(createRequestDto);
        return result;
    }
}
