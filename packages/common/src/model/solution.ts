import { WithTimestamps } from '@danilupion/turbo-common/model/timestamps.js';

import { Solution as SolutionItem } from './api/solutions.js';

export interface Solution extends WithTimestamps {
  input: string;
  prompt: string;
  result: SolutionItem;
}
