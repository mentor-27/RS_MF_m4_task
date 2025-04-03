import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '@context/AuthProvider';

type TProps = {
  children: ReactNode;
};

export const PrivateRoute: FC<TProps> = ({ children }) => {
  const auth = useAuth();

  if (!auth?.userData) {
    return <Navigate to={'/login'} replace />;
  }

  return children;
};
