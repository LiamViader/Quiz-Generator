const { AzureOpenAI } = require("openai");
const apiVersion = "2024-02-01";
const deployment = "gpt4";


export async function generateQuizChoicesWithRetry(prompt:any[], nChoices:number, maxRetries:number = 3, endpoint:string, apiKey:string): Promise<any[]> {
    let retryCount = 0;
    let lastError=null;
    while (retryCount < maxRetries) {
      try {
        return await generateQuizChoicesOpenAI(prompt, nChoices,endpoint,apiKey);
      } catch (error) {
        console.error(`Error in try ${retryCount + 1}:`, error);
        console.log(error);
        retryCount++;
        lastError=error;
      }
    }
    const errorMessage = `Exceeded maximum number of retries (${maxRetries}). error: ${lastError}`;
    throw new Error(errorMessage);
}

export async function generateQuizChoicesOpenAI(prompt:any[],nChoices:number, endpoint:string, apiKey:string): Promise<any[]> {

  const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });
  try{
    const result = await client.chat.completions.create({
      messages: prompt,
      model: "",
      n: nChoices,
      temperature: 0.7,
    });
  
    if (result.choices && result.choices.length > 0) {
        return result.choices;
    } else {
        throw new Error('No response choices available');
    }
  } catch(error){
    console.log('Error generating the message', error);
    throw error;
  }

}
