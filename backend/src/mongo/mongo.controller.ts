import { Controller, Get } from '@nestjs/common';

@Controller('mongo')
export class MongoController {
    @Get() //per provar si hi ha connexio amb openai, retorna missatge generat per gpt
    async simplePrompt() {
        return "Funciona"
    }
}
