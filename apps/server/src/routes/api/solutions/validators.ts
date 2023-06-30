import { body } from 'express-validator';

export const solutionCreationValidator = [body('prompt').isString().trim().notEmpty()];
