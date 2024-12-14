import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { GlobalHead, GlobalTable } from 'src/components/admin/shareds';
import { UiButton } from 'src/components/admin/ui';
import { useGetTagsQuery } from 'src/services/index.api';
import { useAuthPersistStore, useFormStorageStore } from 'src/store';

import { useTranslation } from 'react-i18next';
import { useColumnsTable } from './useColumnsTable';

const TagTable: React.FC = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = React.useState(1);
  const columns = useColumnsTable();

  const signOut = useAuthPersistStore((state) => state.signOut);

  const {
    data: tags,
    isLoading,
    isError,
    error,
  } = useGetTagsQuery({
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
      dataSource={tags?.data}
      columns={columns}
      loading={isLoading}
      title={() => (
        <GlobalHead
          title={t('tags')}
          childs={[<UiButton icon={<AiOutlinePlus />} onClick={toggleModal} />]}
        />
      )}
      pagination={{
        total: tags?.meta.total,
        current: currentPage,
        onChange: (value) => setCurrentPage(value),
      }}
    />
  );
};

export { TagTable };
