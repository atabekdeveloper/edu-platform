import React from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { Layout } from 'src/components/admin/layout/Layout';

import { adminRoutes, userRoutes } from 'src/routes';

import { AuthLogin } from './components/admin/screens';
import { useAuthPersistStore, useLangPersistStore } from './store';

import { useTranslation } from 'react-i18next';

import { UserLayout } from './components/user/layout/Layout';

const App: React.FC = () => {
  const { i18n } = useTranslation();
  const lang = useLangPersistStore((state) => state.lang);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const roleName = useAuthPersistStore((state) => state.roleName);

  React.useEffect(() => {
    if (roleName === 'admin') {
      if (!pathname.includes('admin')) navigate('/admin/users');
      else navigate(pathname);
    } else {
      if (pathname.includes('admin')) navigate('/');
      else navigate(pathname);
    }
  }, []);

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
