const { AzureOpenAI } = require("openai");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
const apiKey = process.env["AZURE_OPENAI_API_KEY"];
const apiVersion = "2024-05-01-preview";
const deployment = "gpt4"; //This must match your deployment name.
require("dotenv/config");

export async function generateQuizChoicesWithRetry(prompt, nChoices, maxRetries = 3): Promise<any[]> {
    let retryCount = 0;
    let lastError=null;
    while (retryCount < maxRetries) {
      try {
        console.log("INTENT")
        return await generateQuizChoicesOpenAI(prompt, nChoices);
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

export async function generateQuizChoicesOpenAI(prompt,nChoices): Promise<any[]> {

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
    console.error('Error generating the message', error);
    throw error;
  }

}
