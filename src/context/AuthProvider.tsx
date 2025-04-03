import { createContext, ReactNode, useContext } from 'react';

import { useLocalStorage } from '@hooks/useLocalStorage';
import { loginUser, logoutUser } from './../../firebase';
import { UserInfo } from 'firebase/auth';

type TSignInProps = (
  email: string,
  password: string,
  callback?: () => void
) => void;
type TSignoutProps = (callback: () => void) => Promise<void>;
type TAuthContext = {
  userData: UserInfo | null;
  signin: TSignInProps;
  signout: TSignoutProps;
};

const AuthContext = createContext<TAuthContext | null>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useLocalStorage('session', null);

  const signin: TSignInProps = async (email, password, callback) => {
    const credentials = await loginUser(email, password);

    if (credentials?.user) {
      setUserData(credentials.user);
      callback && callback();
    }
  };

  const signout = async (callback: () => void) => {
    await logoutUser();
    setUserData(null);
    callback();
  };

  const value = {
    userData,
    signin,
    signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
