import { postRoute } from '@danilupion/turbo-server/helpers/express/route.js';
import { Router } from 'express';

import { createSolution } from './controllers.js';
import { solutionCreationValidator } from './validators.js';

const router = Router();

postRoute(router, '/', solutionCreationValidator, createSolution);

export default router;
