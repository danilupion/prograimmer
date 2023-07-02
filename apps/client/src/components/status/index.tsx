import { Solution } from '@prograimmer/common/model/api/solutions.js';

import styles from './status.module.scss';

type StatusProps = {
  finishReason?: string;
  usage?: Solution['usage'];
  error?: Error;
};

const Status = ({ finishReason, usage, error }: StatusProps) => {
  const parts: string[] = [];

  if (error) {
    parts.push(`error: ${error.message}`);
  } else {
    if (finishReason) {
      parts.push(`finish reason: ${finishReason}`);
    }
    if (usage) {
      parts.push(`prompt tokens: ${usage.prompt_tokens}`);
      parts.push(`completion tokens: ${usage.completion_tokens}`);
      parts.push(`total tokens: ${usage.total_tokens}`);
    }
    if (parts.length === 0) {
      parts.push('Ready');
    }
  }
  return <div className={styles.status}>{parts.join(' | ')}</div>;
};

export default Status;
