import type { CreateCompletionResponseUsage } from 'openai';

export type SolutionFile = { file: string; language: string; code: string };

export type Solution = {
  files: SolutionFile[];
  usage?: CreateCompletionResponseUsage;
  finish_reason?: string;
};

export type SolutionReq = {
  prompt: string;
};
