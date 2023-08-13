import controller, {
  RequestWithBody,
  RequestWithFields,
  ResponseWithBody,
} from '@danilupion/turbo-server/helpers/express/controller.js';
import { SuccessStatusCode } from '@danilupion/turbo-server/http.js';
import { UserData } from '@danilupion/turbo-server/middleware/express/auth/user.js';
import { Solution, SolutionReq } from '@prograimmer/common/model/api/solutions.js';

import SolutionModel from '../../../model/solution.js';
import { UserDocument } from '../../../model/user.js';
import { askForSolution } from '../../../utils/openai.js';

export const createSolution = controller<
  RequestWithBody<SolutionReq, RequestWithFields<UserData<UserDocument>>>,
  ResponseWithBody<Solution>
>(async (req, res) => {
  const result = await askForSolution(req.body.prompt);

  const solution = await SolutionModel.create({
    input: req.body.prompt,
    prompt: req.body.prompt,
    user: req.user,
    result,
  });

  await solution.save();

  res.status(SuccessStatusCode.SuccessOK).json(result);
});
