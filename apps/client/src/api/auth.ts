import { bodilessPutRequest, postRequest } from '@danilupion/turbo-client/rest/request.js';
import { CreateTokenReq, CreateTokenRes } from '@prograimmer/common/model/api/auth.js';

const basePath = '/api/auth/tokens';

export const generateToken = (email: string, password: string) =>
  postRequest<CreateTokenReq, CreateTokenRes>(basePath, {
    email,
    password,
  }).then((res) => res.token);

export const renewToken = () =>
  bodilessPutRequest<CreateTokenRes>(basePath).then((res) => res.token);
