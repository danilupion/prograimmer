import { Solution } from '@prograimmer/common/model/api/solutions.js';
import { ChangeEvent, useCallback, useState } from 'react';

import { generateSolution } from '../../api/solutions.ts';

import styles from './command.module.scss';

type CommandProps = {
  onSolution: (solution: Solution) => void;
};

const Command = ({ onSolution }: CommandProps) => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState<string>();

  const promptChangeHandler = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setPrompt(event.target.value);
    },
    [setPrompt],
  );

  const sendHandler = useCallback(async () => {
    if (prompt) {
      setLoading(true);
      const response = await generateSolution(prompt);
      onSolution(response);
      setLoading(false);
    }
  }, [onSolution, prompt]);

  const sendDisabled = loading || !prompt || !prompt.trim();

  return (
    <>
      <div className={styles.actions}>
        <button type="submit" disabled={sendDisabled} onClick={sendHandler}>
          {loading ? '...' : 'Send'}
        </button>
      </div>

      <textarea name="input" value={prompt} onChange={promptChangeHandler} />
    </>
  );
};

export default Command;
