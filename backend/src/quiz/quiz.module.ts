import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizSchema } from './quiz.model';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Quiz', schema: QuizSchema }])],
    providers: [QuizService],
    controllers: [QuizController],
    exports: [QuizService]
})
export class QuizModule {}
