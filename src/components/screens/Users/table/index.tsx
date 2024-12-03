import React from 'react';
import { GlobalHead, GlobalTable } from 'src/components/shareds';

import { useGetUsersQuery } from 'src/services/index.api';
import { useColumnsTable } from './useColumnsTable';

const UsersTable: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const columns = useColumnsTable();

  const { data: users, isLoading } = useGetUsersQuery({
    page: currentPage,
  });

  return (
    <GlobalTable
      dataSource={users?.data}
      columns={columns}
      loading={isLoading}
      title={() => <GlobalHead title="Пользователи" />}
      pagination={{
        total: users?.meta.total,
        current: currentPage,
        onChange: (value) => setCurrentPage(value),
      }}
    />
  );
};

export { UsersTable };
