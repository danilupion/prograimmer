import { body } from 'express-validator';

export const solutionCreationValidator = [
  body('prompt').isString().trim().notEmpty(),
  body('model').isString().trim().notEmpty(),
  body('tokens').isInt(),
  body('temperature').isFloat(),
];
