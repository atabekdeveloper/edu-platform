import { Admins, Books, Category, Home, NotFound, Tag, Users } from 'src/components/admin/screens';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/users', element: <Users /> },
  { path: '/admins', element: <Admins /> },
  { path: '/category', element: <Category /> },
  { path: '/tags', element: <Tag /> },
  { path: '/books', element: <Books /> },
  { path: '*', element: <NotFound /> },
];

export { routes };
