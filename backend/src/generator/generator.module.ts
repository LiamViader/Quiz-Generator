import { Module } from '@nestjs/common';
import { GeneratorController } from './generator.controller';
import { GeneratorService } from './generator.service';
import { QuizModule } from 'src/quiz/quiz.module';
import { ConfigModule } from '@nestjs/config';
@Module({
    imports: [
        QuizModule,
        ConfigModule.forRoot(),
    ],
    controllers: [GeneratorController],
    providers: [GeneratorService]
})
export class GeneratorModule {}
