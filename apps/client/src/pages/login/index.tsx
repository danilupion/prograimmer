import { ChangeEvent, FormEvent, useCallback, useState } from 'react';

import { useLogin } from '../../state/auth';

import styles from './login.module.scss';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [failed, setFailed] = useState(false);
  const login = useLogin();

  const handleUsernameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }, []);

  const handlePasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }, []);

  const handleRememberMeChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    // Added handler for remember me checkbox
    setRememberMe(event.target.checked);
  }, []);

  const handleLogin = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      setFailed(false);
      if (!(await login(username, password, rememberMe))) {
        setFailed(true);
      }
    },
    [login, password, rememberMe, username],
  );

  return (
    <form onSubmit={handleLogin} className={styles.form}>
      {failed && <div className={styles.error}>Login failed</div>}
      <label>
        Username: <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <label>
        Password: <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <label>
        <input type="checkbox" checked={rememberMe} onChange={handleRememberMeChange} /> Remember me
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
