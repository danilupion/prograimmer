import { useRecoilValue } from 'recoil';

import Ide from './pages/ide';
import Login from './pages/login';
import { loggedUserState } from './state/auth.ts';

const App = () => {
  const loggedUser = useRecoilValue(loggedUserState);

  return loggedUser ? <Ide /> : <Login />;
};

export default App;
