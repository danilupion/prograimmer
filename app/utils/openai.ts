import { Configuration, OpenAIApi } from "openai";
import process from "process";

const { OPENAI_KEY, OPENAI_MODEL, OPENAI_MAX_TOKENS, OPENAI_TEMPERATURE } =
  process.env;

const configuration = new Configuration({
  apiKey: OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

const model = OPENAI_MODEL || "gpt-3.5-turbo";
const maxTokens = Number(OPENAI_MAX_TOKENS || 100);
const temperature = Number(OPENAI_TEMPERATURE || 0);

export const createCompletion = async (prompt: string) => {
  try {
    const completion = await openai.createChatCompletion({
      model,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful Software Engineer that provides code solutions to requests, with a focus on quality and speed. You only provide code responses refraining from any other communication, including explanations to the code",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: maxTokens,
      temperature,
    });

    return completion.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching data from OpenAI API");
  }
};
