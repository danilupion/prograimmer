import { ServerErrorStatusCode } from '@danilupion/turbo-server/http.js';
import { Router } from 'express';

import auth from './auth/index.js';
import models from './models/index.js';
import solutions from './solutions/index.js';


const router = Router();

router.use('/auth', auth);
router.use('/models', models);
router.use('/solutions', solutions);


router.use('*', (_, res) => {
  res.sendStatus(ServerErrorStatusCode.ServerErrorNotImplemented);
});

export default router;
