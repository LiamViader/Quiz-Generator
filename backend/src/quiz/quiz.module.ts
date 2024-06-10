import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizSchema } from './quiz.model';
import { MongoModule } from 'src/mongo/mongo.module';

@Module({
    imports: [
        MongoModule,
        MongooseModule.forFeature([{ name: 'Quiz', schema: QuizSchema }]),   
    ],
    providers: [QuizService],
    controllers: [QuizController],
    exports: [QuizService]
})
export class QuizModule {}
