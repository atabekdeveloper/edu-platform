import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { GlobalHead, GlobalTable } from 'src/components/shareds';
import { UiButton } from 'src/components/ui';
import { useFormStorageStore } from 'src/store';

import { useTranslation } from 'react-i18next';
import { useGetAdminsQuery } from 'src/services/index.api';
import { useColumnsTable } from './useColumnsTable';

const AdminsTable: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const columns = useColumnsTable();

  const { t } = useTranslation();

  const { data: admins, isLoading } = useGetAdminsQuery({
    page: currentPage,
  });

  const toggleModal = useFormStorageStore((state) => state.toggleModal);

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
