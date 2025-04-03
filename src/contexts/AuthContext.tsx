import React, { createContext, type Dispatch, type ReactElement, type SetStateAction, useMemo } from 'react';

import { mutate } from 'swr';

import useLocalStorage from '@/hooks/useLocalStorage';
import LocalStorage from '@/services/LocalStorage';

export type AuthStatus = 'authenticated' | 'loading' | 'unauthenticated';

export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

export const AuthContext = createContext<{
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  status: AuthStatus;
  token: null | string;
  user: AuthUser | null;
  setToken: Dispatch<SetStateAction<null | string>>;
}>(null as any);

export function AuthProvider({ children }: { children?: ReactElement }) {
  const [token, setToken, isPending] = useLocalStorage<null | string>('token', null);

  // TODO: replace fake user with api request below
  const user: AuthUser | null = token ? { id: 1, name: 'Fake Name', email: token } : null;
  const isLoading = false;
  // const { data: user = null, isLoading } = useRequest<AuthUser>(token && '/auth/me', {
  //   noCache: true,
  //   autoRevalidate: false,
  //   retryOnError: false,
  // });

  const status: AuthStatus = useMemo(
    () => (isLoading || isPending ? 'loading' : token && user ? 'authenticated' : 'unauthenticated'),
    [isLoading, token, user],
  );

  async function login(email: string, password: string) {
    // TODO: replace fake token with api request below
    console.log('FAKE LOGIN', { email, password });
    setToken(email);

    // const response = await Api.post('/auth', {
    //   email,
    //   password,
    // });
    //
    // setToken(response?.data?.token || null);
  }

  async function logout() {
    const lastLogin = await LocalStorage.get('lastLogin');

    // SWR: clear cache
    await mutate(() => true, undefined, { revalidate: false });

    void Promise.allSettled([LocalStorage.clear(), LocalStorage.set('lastLogin', lastLogin)]);

    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ login, logout, status, token, user, setToken }}>{children}</AuthContext.Provider>
  );
}
