import controller, {
  RequestWithBody,
  ResponseWithBody,
} from '@danilupion/turbo-server/helpers/express/controller.js';
import { SuccessStatusCode } from '@danilupion/turbo-server/http.js';
import { Solution, SolutionReq } from '@prograimmer/common/model/api/solutions.js';

import { askForSolution } from '../../../utils/openai.js';
export const createSolution = controller<RequestWithBody<SolutionReq>, ResponseWithBody<Solution>>(
  async (req, res) => {
    const result = await askForSolution(req.body.prompt);

    res.status(SuccessStatusCode.SuccessOK).json(result);
  },
);
