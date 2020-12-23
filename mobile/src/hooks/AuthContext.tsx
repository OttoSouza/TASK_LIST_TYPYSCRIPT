import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';
interface User {
  id: string;
  name: string;
  email: string;
  cell: string;
  password: string;
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
  loading: boolean;
  signIn(credentials: SignInProps): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStorage = async (): Promise<void> => {
      const token = await AsyncStorage.getItem('@ToDo:token');
      const user = await AsyncStorage.getItem('@ToDo:user');

      if (token && user) {
        api.defaults.headers.authorization = `Bearer ${token}`;
        setData({token, user: JSON.parse(user)});
      }

      setLoading(false);
    };

    loadStorage();
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      AsyncStorage.setItem('@ToDo:user', JSON.stringify(user));
      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  const signIn = useCallback(async ({email, password}) => {
    const response = await api.post('sessions', {email, password});
    const {token, user} = response.data;
    await AsyncStorage.setItem('@ToDo:token', token);
    await AsyncStorage.setItem('@ToDo:user', JSON.stringify(user));
    api.defaults.headers.authorization = `Bearer ${token}`;
    setData({token, user});
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('@ToDo:token');
    await AsyncStorage.removeItem('@ToDo:user');

    setData({} as AuthState);
  }, []);
  return (
    <AuthContext.Provider
      value={{user: data.user, signIn, signOut, updateUser, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'Para ter acesso ao useAuth precisa ter um usuario autenticado',
    );
  }

  return context;
}

export {AuthProvider, useAuth};
