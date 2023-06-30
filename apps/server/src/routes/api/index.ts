import { ServerErrorStatusCode } from '@danilupion/turbo-server/http.js';
import { Router } from 'express';

import solutions from './solutions/index.js';

const router = Router();

router.use('/solutions', solutions);

router.use('*', (_, res) => {
  res.sendStatus(ServerErrorStatusCode.ServerErrorNotImplemented);
});

export default router;
