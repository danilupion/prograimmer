import { Solution as SolutionType } from '@prograimmer/common/model/api/solutions.js';
import { useCallback, useState } from 'react';

import styles from './App.module.scss';
import Command from './command';
import Solution from './solution';
import Status from './status';

const App = () => {
  const [solution, setSolution] = useState<SolutionType>();

  const handleSolutionChange = useCallback((solution: SolutionType) => {
    setSolution(solution);
  }, []);

  return (
    <main>
      <section className={styles.top}>
        <Solution files={solution && solution.files} />
      </section>
      <section className={styles.bottom}>
        <Command onSolution={handleSolutionChange} />
        <Status
          finishReason={solution && solution.finish_reason}
          usage={solution && solution.usage}
        />
      </section>
    </main>
  );
};

export default App;
