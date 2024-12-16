import { getRoute } from '@danilupion/turbo-server/helpers/express/route.js';
import jwtAuth from '@danilupion/turbo-server/middleware/express/auth/jwt.js';
import { Router } from 'express';

import userMiddleware from '../../../middleware/user.js';

import { getModels } from './controllers.js';

const router = Router();

getRoute(router, '/', jwtAuth(), userMiddleware, getModels);

export default router;
