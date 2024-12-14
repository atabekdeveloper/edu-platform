import React from 'react';

import { BooksForm } from './form';
import { BooksTable } from './table';

const Books: React.FC = () => {
  return (
    <>
      <BooksForm />
      <BooksTable />
    </>
  );
};

export { Books };
