import { getRequest } from '@danilupion/turbo-client/rest/request.js';
import { ModelList } from '@prograimmer/common/model/api/models.js';

const basePath = '/api/models';

export const getModels = () =>
  getRequest<ModelList>(basePath);
