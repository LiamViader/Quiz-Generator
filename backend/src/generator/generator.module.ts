import { Module } from '@nestjs/common';
import { GeneratorController } from './generator.controller';
import { GeneratorService } from './generator.service';
import { QuizModule } from 'src/quiz/quiz.module';
@Module({
    imports: [QuizModule],
    controllers: [GeneratorController],
    providers: [GeneratorService]
})
export class GeneratorModule {}
