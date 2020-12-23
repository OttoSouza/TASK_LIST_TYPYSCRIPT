import React, { createContext, useCallback, useContext, useState } from "react";
import api from "../services/api";

interface User {
  id: string;
  name: string;
  email: string;
  cell: string;
}

interface SignInProps {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInProps): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@ToDo:token");
    const user = localStorage.getItem("@ToDo:user");

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem("@ToDo:user", JSON.stringify(user));
      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token]
  );

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post("sessions", { email, password });
    const { token, user } = response.data;
    localStorage.setItem("@ToDo:token", token);
    localStorage.setItem("@ToDo:user", JSON.stringify(user));
    api.defaults.headers.authorization = `Bearer ${token}`;
    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@ToDo:token");
    localStorage.removeItem("@ToDo:user");

    setData({} as AuthState);
  }, []);
  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "Para ter acesso ao useAuth precisa ter um usuario autenticado"
    );
  }

  return context;
}

export { AuthProvider, useAuth };
