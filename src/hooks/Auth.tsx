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
  updateUser({ name, email }: { name: string; email: string }): Promise<void>;
  deleteUser(): void;
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
    async ({ name, email }) => {
      const response = await api.put(
        `/users/${data.user.id}`,
        {
          name,
          email,
        },
        {
          headers: {
            Authorization: data.token,
          },
        },
      );
      const { user } = response.data;

      setData(prev => {
        if (user) {
          return {
            ...prev,
            user: JSON.parse(user),
          };
        }
        return {} as AuthState;
      });
    },
    [data.token, data.user.id],
  );

  const deleteUser = useCallback(async () => {
    await api.delete(`/users/${data.user.id}`, {
      headers: {
        Authorization: data.token,
      },
    });
  }, [data.token, data.user.id]);

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
