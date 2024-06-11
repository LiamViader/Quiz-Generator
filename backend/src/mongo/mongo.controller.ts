import { Controller, Get } from '@nestjs/common';

@Controller('mongo')
export class MongoController {
    @Get() 
    async simplePrompt() {
        return "Funciona"
    }
}
