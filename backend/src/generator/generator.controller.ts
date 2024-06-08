import { Controller, Get } from '@nestjs/common';
import { generateQuizMessage } from './generateQuizMessage';

@Controller('generator')
export class GeneratorController {

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

}
