import React from 'react';

import { CategoryForm } from './form';
import { CategoryTable } from './table';

const Category: React.FC = () => {
  return (
    <>
      <CategoryForm />
      <CategoryTable />
    </>
  );
};

export { Category };
