import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Question {
    @Prop({ required: true })
    question: string;

    @Prop({ type: [String], required: true })
    answers: string[];

    @Prop({ default: null })
    userAnswer: number | null;

    @Prop({ required: true })
    correctAnswer: number;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);

@Schema({ timestamps: true, collection: 'quizzes' })
export class Quiz extends Document {
    @Prop({ default: false })
    solved: boolean;

    @Prop({ required: true, enum: ['public', 'private'] })
    privacy: string;

    @Prop({ default: "untitled", index: true })
    name: string;

    @Prop({ required: false })
    topic: string;

    @Prop({ required: true, enum: ['english', 'spanish', 'catalan', 'french', 'italian'], index: true })
    language: string;

    @Prop({ required: true, enum: ['very easy', 'easy', 'medium', 'hard', 'almost impossible'], index: true })
    difficulty: string;

    @Prop({ type: [QuestionSchema], required: true })
    questions: Question[];

    @Prop({ required: false })
    creatorId: string;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);