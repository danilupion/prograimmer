import type { ChatCompletionRequestMessage, CreateCompletionResponseUsage } from 'openai';

export type SolutionFile = { file: string; language: string; code: string };

export type Solution = {
  messages: ChatCompletionRequestMessage[];
  files: SolutionFile[];
  usage?: CreateCompletionResponseUsage;
  finish_reason?: string;
};

export type SolutionReq = {
  prompt: string;
};
