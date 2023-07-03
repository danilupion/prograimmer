import { Solution as SolutionType } from '@prograimmer/common/model/api/solutions.js';
import { useCallback, useState } from 'react';

import Command from '../../components/command';
import Solution from '../../components/solution';
import Status from '../../components/status';

import styles from './ide.module.scss';

const Ide = () => {
  const [solution, setSolution] = useState<SolutionType>();
  const [error, setError] = useState<Error>();

  const handleSolutionChange = useCallback((solution: SolutionType) => {
    setError(undefined);
    setSolution(solution);
  }, []);

  const handleError = useCallback((error: Error) => {
    setError(error);
  }, []);

  return (
    <main>
      <section className={styles.top}>
        <Solution files={solution && solution.files} />
      </section>
      <section className={styles.bottom}>
        <Command onSolution={handleSolutionChange} onError={handleError} />
        <Status
          finishReason={solution && solution.finish_reason}
          usage={solution && solution.usage}
          error={error}
        />
      </section>
    </main>
  );
};

export default Ide;
