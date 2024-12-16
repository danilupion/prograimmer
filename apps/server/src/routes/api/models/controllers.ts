import controller, {
  ResponseWithBody,
} from '@danilupion/turbo-server/helpers/express/controller.js';
import { SuccessStatusCode } from '@danilupion/turbo-server/http.js';
import { ModelList } from '@prograimmer/common/model/api/models.js';
import { Request } from 'express';

import { availableModels } from '../../../utils/openai.js';

export const getModels = controller<Request, ResponseWithBody<ModelList>>(async (_req, res) => {
  const result = await availableModels();

  res.status(SuccessStatusCode.SuccessOK).json(result.filter((model) => model.match(/gpt/gi)));
});
