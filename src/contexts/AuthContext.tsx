import React, { createContext, useContext, useEffect, useReducer } from 'react';
import * as SecureAuth from '../utils/secureStore';
import type { Credentials } from '../utils/secureStore';

type State = {
  user: { email: string } | null;
  locked: boolean;
  failedAttempts: number;
};

type Action =
  | { type: 'LOGIN'; payload: { email: string } }
  | { type: 'LOGOUT' }
  | { type: 'SET_FAILED'; payload: number }
  | { type: 'LOCK' }
  | { type: 'UNLOCK' };

const initialState: State = { user: null, locked: false, failedAttempts: 0 };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: { email: action.payload.email }, failedAttempts: 0 };
    case 'LOGOUT':
      return { ...state, user: null, failedAttempts: 0 };
    case 'SET_FAILED':
      return { ...state, failedAttempts: action.payload };
    case 'LOCK':
      return { ...state, locked: true };
    case 'UNLOCK':
      return { ...state, locked: false, failedAttempts: 0 };
    default:
      return state;
  }
}

type AuthContextType = {
  state: State;
  register: (email: string, passwordHash: string) => Promise<void>;
  login: (email: string, passwordHash: string) => Promise<{ ok: boolean; attempts?: number }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      const creds = await SecureAuth.getCredentials();
      if (creds) dispatch({ type: 'LOGIN', payload: { email: creds.username } });
    })();
  }, []);

  const register = async (email: string, passwordHash: string) => {
    await SecureAuth.saveCredentials({ username: email, passwordHash });
    dispatch({ type: 'LOGIN', payload: { email } });
  };

  const login = async (email: string, passwordHash: string) => {
    const stored = await SecureAuth.getCredentials();
    if (!stored || stored.passwordHash !== passwordHash) {
      const next = state.failedAttempts + 1;
      dispatch({ type: 'SET_FAILED', payload: next });
      if (next >= 5) dispatch({ type: 'LOCK' });
      return { ok: false, attempts: next };
    }
    dispatch({ type: 'LOGIN', payload: { email } });
    return { ok: true };
  };

  const logout = async () => {
    await SecureAuth.clearCredentials();
    dispatch({ type: 'LOGOUT' });
  };

  return <AuthContext.Provider value={{ state, register, login, logout }}>{children}</AuthContext.Provider>;
};
