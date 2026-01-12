import OpenAI from "openai";

export async function generateQuizChoicesOpenAI(prompt: any[]): Promise<any[]> {

  const client = new OpenAI();

  try {
    const result = await client.chat.completions.create({
      messages: prompt as any,
      model: "gpt-5-nano",
      response_format: { type: "json_object" },
    });

    if (result.choices && result.choices.length > 0) {
      return result.choices;
    } else {
      throw new Error('No response choices available');
    }
  } catch (error) {
    console.log('Error generating the message', error);
    throw error;
  }

}
