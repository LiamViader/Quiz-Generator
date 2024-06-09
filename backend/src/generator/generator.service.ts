import { Injectable } from '@nestjs/common';
import { GeneratorRequestDto } from './dto/generator-request.dto';

@Injectable()
export class GeneratorService {
    async generateQuiz(createRequestDto: GeneratorRequestDto) {
        // Aquí iría la lógica para generar el quiz basado en los datos recibidos
        // Por ejemplo, puedes llamar a una función externa o realizar operaciones específicas
        // Retorna el resultado del proceso de generación
        return {
          status: 'success',
          message: 'Quiz generated successfully',
          data: createRequestDto,
        };
    }
}
