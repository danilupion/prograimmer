import { Configuration, OpenAIApi } from "openai";
import process from "process";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

export const createCompletion = async (prompt: string) => {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that provides Software Engineering solutions",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 100,
      temperature: 0,
    });

    return completion.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching data from OpenAI API");
  }
};
