import React from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { Layout } from 'src/components/layout/Layout';

import { routes } from 'src/routes';

import { AuthLogin } from './components/screens';
import { useAuthPersistStore } from './store';

const App: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const token = useAuthPersistStore((state) => state.accessToken);

  React.useEffect(() => {
    if (token && pathname === '/login') navigate('/users');
  }, [navigate, pathname, token]);
  return (
    <Routes>
      <Route path="/login" element={<AuthLogin />} />
      <Route path="/" element={<Layout />}>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>
    </Routes>
  );
};

export { App };
