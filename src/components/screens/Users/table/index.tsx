import React from 'react';
import { GlobalHead } from 'src/components/shareds';
import { UiTable } from 'src/components/ui';

import { useGetUsersQuery } from 'src/services/index.api';
import { useColumnsTable } from './useColumnsTable';

const UsersTable: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const columns = useColumnsTable();

  const { data: users, isLoading } = useGetUsersQuery({
    page: currentPage,
  });

  return (
    <UiTable
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
