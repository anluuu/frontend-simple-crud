import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface User {
  id: string;
  avatar: string;
  created_at: string;
  updated_at: string;
  email: string;
  name: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser({
    name,
    email,
    id,
  }: {
    name: string;
    email: string;
    id: string;
  }): Promise<{ name: string; email: string }>;
  deleteUser(id: string): void;
}

const Auth = createContext<AuthContextData>({} as AuthContextData);

function useAuth(): AuthContextData {
  const context = useContext(Auth);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@simpleCrud:token');
    const user = localStorage.getItem('@simpleCrud:user');

    if (token && user) {
      return {
        token,
        user: JSON.parse(user),
      };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@simpleCrud:token', token);
    localStorage.setItem('@simpleCrud:user', JSON.stringify(user));
    setData({ token, user });
  }, []);

  const updateUser = useCallback(
    async ({ name, email, id }) => {
      const response = await api.put(
        `/users/${id}`,
        {
          name,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        },
      );
      setData({ token: data.token, user: response.data });
      localStorage.setItem('@simpleCrud:user', JSON.stringify(response.data));
      return response.data;
    },
    [data.token],
  );

  const deleteUser = useCallback(
    async id => {
      await api.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
    },
    [data.token],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@simpleCrud:token');
    localStorage.removeItem('@simpleCrud:user');
    setData({} as AuthState);
  }, []);

  return (
    <Auth.Provider
      value={{ user: data.user, signOut, signIn, updateUser, deleteUser }}
    >
      {children}
    </Auth.Provider>
  );
};

export { AuthProvider, useAuth };
