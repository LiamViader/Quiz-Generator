import { Module } from '@nestjs/common';
import { GeneratorController } from './generator.controller';
import { GeneratorService } from './generator.service';
import { QuizModule } from 'src/quiz/quiz.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DailyUsage, DailyUsageSchema } from './schemas/daily-usage.schema';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        QuizModule,
        ConfigModule.forRoot(),
        MongooseModule.forFeature([{ name: DailyUsage.name, schema: DailyUsageSchema }]),
        UsersModule
    ],
    controllers: [GeneratorController],
    providers: [GeneratorService]
})
export class GeneratorModule { }
