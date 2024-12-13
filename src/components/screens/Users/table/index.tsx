import React from 'react';
import { GlobalHead, GlobalTable } from 'src/components/shareds';

import { useTranslation } from 'react-i18next';
import { useGetUsersQuery } from 'src/services/index.api';
import { useColumnsTable } from './useColumnsTable';

const UsersTable: React.FC = () => {
  const { t } = useTranslation();
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
      title={() => <GlobalHead title={t('users')} />}
      pagination={{
        total: users?.meta.total,
        current: currentPage,
        onChange: (value) => setCurrentPage(value),
      }}
    />
  );
};

export { UsersTable };
