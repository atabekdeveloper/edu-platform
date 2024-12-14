import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { GlobalHead, GlobalTable } from 'src/components/admin/shareds';
import { UiButton } from 'src/components/admin/ui';
import { useAuthPersistStore, useFormStorageStore } from 'src/store';

import { useTranslation } from 'react-i18next';
import { useGetAdminsQuery } from 'src/services/index.api';
import { useColumnsTable } from './useColumnsTable';

const AdminsTable: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const columns = useColumnsTable();
  const signOut = useAuthPersistStore((state) => state.signOut);

  const { t } = useTranslation();

  const {
    data: admins,
    isLoading,
    error,
    isError,
  } = useGetAdminsQuery({
    page: currentPage,
  });

  const toggleModal = useFormStorageStore((state) => state.toggleModal);

  React.useEffect(() => {
    if (isError && error?.status === 401) {
      signOut();
    }
  }, [isError]);

  return (
    <GlobalTable
      dataSource={admins?.data}
      columns={columns}
      loading={isLoading}
      title={() => (
        <GlobalHead
          title={t('admins')}
          childs={[<UiButton icon={<AiOutlinePlus />} onClick={toggleModal} />]}
        />
      )}
      pagination={{
        total: admins?.meta.total,
        current: currentPage,
        onChange: (value) => setCurrentPage(value),
      }}
    />
  );
};

export { AdminsTable };
