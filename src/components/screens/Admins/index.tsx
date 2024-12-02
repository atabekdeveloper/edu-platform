import React from 'react';

import { AdminsForm } from './form';
import { AdminsTable } from './table';

const Admins: React.FC = () => {
  return (
    <>
      <AdminsForm />
      <AdminsTable />
    </>
  );
};

export { Admins };
