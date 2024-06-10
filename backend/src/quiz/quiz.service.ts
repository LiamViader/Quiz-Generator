import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz } from './quiz.model';

@Injectable()
export class QuizService {
    constructor(@InjectModel('Quiz') private readonly quizModel: Model<Quiz>) {}

    async create(quiz: Quiz): Promise<Quiz> {
        const createdQuiz = new this.quizModel(quiz);
        return await createdQuiz.save();
    }

    async findAll(): Promise<Quiz[]> {
        return await this.quizModel.find().exec();
    }

    async findPublicQuizzes(page: number = 1, pageSize: number = 10): Promise<Quiz[]> {
        const skip = (page - 1) * pageSize;
        return this.quizModel
            .find({ privacy: 'public' })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(pageSize)
            .exec();
    }

    async findOne(id: string): Promise<Quiz> {
        return await this.quizModel.findById(id).exec();
    }

    async update(id: string, quiz: Quiz): Promise<Quiz> {
        return await this.quizModel.findByIdAndUpdate(id, quiz, { new: true }).exec();
    }

    async remove(id: string): Promise<Quiz> {
        return await this.quizModel.findByIdAndDelete(id).exec();
    }
}
