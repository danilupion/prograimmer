import { postRequest } from '@danilupion/turbo-client/rest/request.js';
import { Solution, SolutionReq } from '@prograimmer/common/model/api/solutions.js';

const basePath = '/api/solutions';

export const generateSolution = (
  prompt: string,
  model: string,
  tokens: number,
  temperature: number,
) =>
  postRequest<SolutionReq, Solution>(basePath, {
    prompt,
    model,
    tokens,
    temperature,
  });
