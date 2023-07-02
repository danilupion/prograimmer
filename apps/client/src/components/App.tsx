import { Solution as SolutionType } from '@prograimmer/common/model/api/solutions.js';
import { useCallback, useState } from 'react';

import styles from './App.module.scss';
import Command from './command';
import Solution from './solution';
import Status from './status';

const App = () => {
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

export default App;
