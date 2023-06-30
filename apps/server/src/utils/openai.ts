import { Solution, SolutionFile } from '@prograimmer/common/model/api/solutions.js';
import config from 'config';
import { Configuration, OpenAIApi } from 'openai';

const OPENAI_KEY = config.get<string>('openai.key');

const configuration = new Configuration({
  apiKey: OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

const model = config.get<string>('openai.model');
const maxTokens = config.get<number>('openai.maxTokens');
const temperature = config.get<number>('openai.temperature');

export const askForSolution = async (prompt: string): Promise<Solution> => {
  try {
    const completion = await openai.createChatCompletion({
      model,
      messages: [
        {
          role: 'system',
          content:
            'You are a Software Engineer that provides code solutions to requests, with a focus on quality and speed.',
        },
        {
          role: 'user',
          content: `You will be provided with a text delimited by triple quotes,
          It will contain the requirements for the code you need to write.
          Your soulution should satisfy the requirements and only that, nothing else.
          Please refrain from supplying any type of explanation or comment.
          You should follow best practices and generate full implementation of the requirement,
          when requested to, also provide tests.
          Your response may contain several files, you should provide the file name with full path relative to 
          project root; in the code blocks of your responses do not state the language, as it should be provided
          as a separate field. Use json format for the response. as follows:
          
          {
            "files": [
                {
                    "file": "<filename with relative path>",
                    "language": "<language>",
                    "code": "<code>"
                }y
            ]
          }

          """${prompt}"""`,
        },
      ],
      max_tokens: maxTokens,
      temperature,
    });

    console.log(JSON.stringify(completion.data));

    const files = completion.data.choices[0].message
      ? (JSON.parse(completion.data.choices[0].message.content as string).files as SolutionFile[])
      : [];

    return {
      files,
      usage: completion.data.usage,
      finish_reason: completion.data.choices[0].finish_reason,
    };
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching data from OpenAI API');
  }
};
