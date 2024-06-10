import { Schema, Document } from 'mongoose';

export interface Question {
    question: string;
    answers: string[];
    userAnswer: number | null;
    correctAnswer: number;
}

export interface Quiz extends Document {
    solved: boolean;
    privacy: string;
    name: string;
    topic: string;
    language: string;
    difficulty: string;
    questions: Question[];
}

const QuestionSchema = new Schema({
    question: { type: String, required: true },
    answers: [{ type: String, required: true }],
    userAnswer: { type: Number, default: null },
    correctAnswer: { type: Number, required: true },
});

export const QuizSchema = new Schema({
    solved: { type: Boolean, default: false },
    privacy: { type: String,enum: ['public', 'private'], required: true },
    name: { type: String, default: "untitled", index: true },
    topic: { type: String, required: false },
    language: {type: String, enum:['english', 'spanish', 'catalan', 'french', 'italian'], required: true, index: true},
    difficulty: {type: String, enum: ['very easy','easy', 'medium', 'hard', 'almost impossible'], required: true, index: true},
    questions: { type: [QuestionSchema],  required: true },
}, { timestamps: true,
    collection: 'quizzes',
});