/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { Layout } from 'src/components/admin/layout/Layout';

import { adminRoutes, userRoutes } from 'src/routes';

import { AuthLogin } from './components/admin/screens';
import { useAuthPersistStore, useLangPersistStore } from './store';

import { useTranslation } from 'react-i18next';
// @ts-ignore
import 'swiper/css';
import { UserLayout } from './components/user/layout/Layout';

const App: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const lang = useLangPersistStore((state) => state.lang);

  const token = useAuthPersistStore((state) => state.accessToken);
  const roleName = useAuthPersistStore((state) => state.roleName);

  React.useEffect(() => {
    if (token && pathname === '/login') {
      if (roleName === 'admin') navigate('/admin/users');
      else navigate('/');
    }
  }, [navigate, pathname, roleName, token]);
  React.useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);
  return (
    <Routes>
      <Route path="/login" element={<AuthLogin />} />
      {roleName === 'admin' && (
        <Route path="/admin" element={<Layout />}>
          {adminRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      )}
      <Route path="/" element={<UserLayout />}>
        {userRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>
    </Routes>
  );
};

export { App };
