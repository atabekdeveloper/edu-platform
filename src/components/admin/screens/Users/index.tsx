import React from 'react';

import { UserBookModal } from './modal';
import { UsersTable } from './table';

const Users: React.FC = () => {
  return (
    <>
      <UserBookModal />
      <UsersTable />
    </>
  );
};

export { Users };
