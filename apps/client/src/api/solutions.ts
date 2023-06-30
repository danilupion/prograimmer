import { postRequest } from '@danilupion/turbo-client/rest/request.js';
import { Solution, SolutionReq } from '@prograimmer/common/model/api/solutions.js';

const basePath = '/api/solutions';

export const generateSolution = (prompt: string) =>
  postRequest<SolutionReq, Solution>(basePath, {
    prompt,
  });
