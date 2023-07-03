import { setToken } from '@danilupion/turbo-client/rest/init.js';
import jwtDecode from 'jwt-decode';
import { atom, selector, useSetRecoilState } from 'recoil';

import { generateToken } from '../api/auth.ts';

// const TOKEN_RENEWAL_FREQUENCY = 1000 * 60 * 5;
const TOKEN_KEY = 'token';

type LoggedUser = {
  id: string;
  username: string;
};

type AuthState = {
  token?: string;
  loggedUser?: LoggedUser;
  rememberMe?: boolean;
};

const userFromToken = (token: string) => {
  const { id, username } = jwtDecode<LoggedUser>(token);

  return {
    id,
    username,
  };
};

const defaultState: AuthState = (() => {
  const token = localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
  if (token) {
    setToken(token);
    return {
      token,
      loggedUser: userFromToken(token),
    };
  }
  return {};
})();

export const authState = atom<AuthState>({
  key: 'auth',
  default: defaultState,
});

export const loggedUserState = selector<LoggedUser | undefined>({
  key: 'loggedUser',
  get: ({ get }) => {
    const { loggedUser } = get(authState);
    return loggedUser;
  },
});

export const useLogin = () => {
  const setAuth = useSetRecoilState(authState);

  return async (username: string, password: string, rememberMe = false) => {
    try {
      const token = await generateToken(username, password);

      if (token) {
        const loggedUser = userFromToken(token);

        localStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem(TOKEN_KEY);

        setToken(token);

        if (rememberMe) {
          localStorage.setItem(TOKEN_KEY, token);
        } else {
          sessionStorage.setItem(TOKEN_KEY, token);
        }

        // Update the authState atom
        setAuth({
          token,
          loggedUser,
          rememberMe,
        });

        return true;
      }
      throw new Error('Invalid credentials');
    } catch (error) {
      console.error('Failed to log in:', error);
      return false;
    }
  };
};
