import { Navigate, Route, Routes } from 'react-router-dom';

import { internalRoutes } from './internalRoutes.ts';
import { PrivateRoute } from '@hoc/PrivateRoute';
import { AuthProvider } from '@/context/AuthProvider.tsx';
import { Main } from '@pages/Main/Main';
import { Login } from '@pages/Auth/Login';
import { Register } from '@pages/Auth/Register';
import { Content } from '@components/Content';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path={internalRoutes.home}
          element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          }
        >
          <Route path={internalRoutes.note(':id')} element={<Content />} />
        </Route>
        <Route path={internalRoutes.login} element={<Login />} />
        <Route path={internalRoutes.register} element={<Register />} />
        <Route path="*" element={<Navigate to={internalRoutes.home} />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
