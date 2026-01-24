import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

export async function generateQuizOpenAI(input: any[]): Promise<any[]> {

  const client = new OpenAI();

  const QuizzModel = z.object({
    questions: z.array(z.object({
      question: z.string(),
      options: z.array(z.string()),
      correctAnswerIndex: z.number()
    }))
  });

  try {

    const response = await client.responses.parse({
      model: "gpt-4.1-nano",
      input: input,
      text: {
        format: zodTextFormat(QuizzModel, "quizz"),
      },
    });

    const quizz = response.output_parsed;

    if (quizz.questions && quizz.questions.length > 0) {

      quizz.questions.forEach((question: any) => {
        question.correctAnswer = question.correctAnswerIndex;
        delete question.correctAnswerIndex;
        question.answers = question.options;
        delete question.options;
        question.userAnswer = null;
      });

      return quizz.questions;
    } else {
      throw new Error('No questions available');
    }
  } catch (error) {
    console.log('Error generating the message', error);
    throw error;
  }

}
