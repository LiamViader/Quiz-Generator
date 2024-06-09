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

export async function generateQuizMessage(): Promise<string> {

  const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });
  try{
    const result = await client.chat.completions.create({
      messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Does Azure OpenAI support customer managed keys?" },
      { role: "assistant", content: "Yes, customer managed keys are supported by Azure OpenAI?" },
      { role: "user", content: "Do other Azure AI services support this too?" },
      ],
      model: "",
    });
  
    if (result.choices && result.choices.length > 0) {
      return result.choices[0].message.content;
    } else {
      throw new Error('No response choices available');
    }
  } catch(error){
    console.error('Error al generar el mensaje:', error);
    throw new Error('Error al generar el mensaje');
  }

}
