import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeneratorModule } from './generator/generator.module';
import { MongoModule } from './mongo/mongo.module';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [GeneratorModule, MongoModule, QuizModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
