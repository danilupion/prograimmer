import { postRoute } from '@danilupion/turbo-server/helpers/express/route.js';
import jwtAuth from '@danilupion/turbo-server/middleware/express/auth/jwt.js';
import { Router } from 'express';

import userMiddleware from '../../../middleware/user.js';

import { createSolution } from './controllers.js';
import { solutionCreationValidator } from './validators.js';

const router = Router();

postRoute(router, '/', jwtAuth(), userMiddleware, solutionCreationValidator, createSolution);

export default router;
