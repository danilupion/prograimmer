import { Solution } from '@prograimmer/common/model/api/solutions.js';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { getModels } from '../../api/models.ts';
import { generateSolution } from '../../api/solutions.ts';
import FloatInput from '../floatInput';

import styles from './command.module.scss';

type CommandProps = {
  onSolution: (solution: Solution) => void;
  onError: (error: Error) => void;
};

const Command = ({ onSolution, onError }: CommandProps) => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState<string>();
  const [tokens, setTokens] = useState<number>(1000);
  const [temperature, setTemperature] = useState<number>(0);
  const [models, setModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>();

  useEffect(() => {
    getModels().then((models) => {
      setModels(models);
      if (models.length > 0) {
        setSelectedModel(models[0]);
      }
    });
  }, []);

  const modelChangeHandler = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(event.target.value);
  }, []);

  const promptChangeHandler = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setPrompt(event.target.value);
    },
    [setPrompt],
  );

  const tokensChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setTokens(Number(event.target.value));
  }, []);

  const temperatureChangeHandler = useCallback((value: number) => {
    setTemperature(value);
  }, []);

  const sendHandler = useCallback(async () => {
    try {
      if (prompt && selectedModel) {
        setLoading(true);
        const response = await generateSolution(prompt, selectedModel, tokens, temperature);
        onSolution(response);
        setLoading(false);
      }
    } catch (e) {
      onError(e as Error);
      setLoading(false);
    }
  }, [onError, onSolution, prompt, selectedModel]);

  const sendDisabled = loading || !prompt || !prompt.trim() || !selectedModel;

  return (
    <>
      <div className={styles.actions}>
        <button type="submit" disabled={sendDisabled} onClick={sendHandler}>
          {loading ? '...' : 'Send'}
        </button>
        <select value={selectedModel} onChange={modelChangeHandler}>
          {models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
        <input type="number" value={tokens} onChange={tokensChangeHandler} />
        <FloatInput value={temperature} onChange={temperatureChangeHandler} />
      </div>

      <textarea name="input" value={prompt} onChange={promptChangeHandler} />
    </>
  );
};

export default Command;
