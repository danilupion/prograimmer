import controller, {
  RequestWithBody,
  RequestWithFields,
  ResponseWithBody,
} from '@danilupion/turbo-server/helpers/express/controller.js';
import { ClientErrorUnauthorized } from '@danilupion/turbo-server/helpers/httpError.js';
import { SuccessStatusCode } from '@danilupion/turbo-server/http.js';
import { JwtData, generateToken } from '@danilupion/turbo-server/middleware/express/auth/jwt.js';
import { CreateTokenReq, CreateTokenRes } from '@prograimmer/common/model/api/auth.js';

import UserModel from '../../../../model/user.js';
import { getTokenPayload } from '../../../../utils/auth.js';

export const createToken = controller<
  RequestWithBody<CreateTokenReq>,
  ResponseWithBody<CreateTokenRes>
>(async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    throw new ClientErrorUnauthorized();
  }

  const match = await user.comparePassword(req.body.password);
  if (!match) {
    throw new ClientErrorUnauthorized();
  }

  return res.status(SuccessStatusCode.SuccessCreated).send({
    token: await generateToken(getTokenPayload(user)),
  });
});

export const renewToken = controller<RequestWithFields<JwtData>, ResponseWithBody<CreateTokenRes>>(
  async (req, res) => {
    const user = await UserModel.findById(req.jwtUser.id);

    if (!user) {
      throw new ClientErrorUnauthorized();
    }

    return res
      .status(SuccessStatusCode.SuccessOK)
      .send({ token: await generateToken(getTokenPayload(user)) });
  },
);
