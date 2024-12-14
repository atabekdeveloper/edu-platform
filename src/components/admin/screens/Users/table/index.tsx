import React from 'react';
import { GlobalHead, GlobalTable } from 'src/components/admin/shareds';

import { useTranslation } from 'react-i18next';
import { useGetUsersQuery } from 'src/services/index.api';
import { useAuthPersistStore } from 'src/store';
import { useColumnsTable } from './useColumnsTable';

const UsersTable: React.FC = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = React.useState(1);
  const columns = useColumnsTable();

  const signOut = useAuthPersistStore((state) => state.signOut);

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useGetUsersQuery({
    page: currentPage,
  });

  React.useEffect(() => {
    if (isError && error?.status === 401) {
      signOut();
    }
  }, [isError]);

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
