import React from 'react';

import { TagForm } from './form';
import { TagTable } from './table';

const Tag: React.FC = () => {
  return (
    <>
      <TagForm />
      <TagTable />
    </>
  );
};

export { Tag };
