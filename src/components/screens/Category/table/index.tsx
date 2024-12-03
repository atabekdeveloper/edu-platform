import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { GlobalHead, GlobalTable } from 'src/components/shareds';
import { UiButton } from 'src/components/ui';
import { useGetCategoriesQuery } from 'src/services/index.api';
import { useFormStorageStore } from 'src/store';

import { useColumnsTable } from './useColumnsTable';

const CategoryTable: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const columns = useColumnsTable();

  const { data: category, isLoading } = useGetCategoriesQuery({
    page: currentPage,
  });

  const toggleModal = useFormStorageStore((state) => state.toggleModal);

  return (
    <GlobalTable
      dataSource={category?.data}
      columns={columns}
      loading={isLoading}
      title={() => (
        <GlobalHead
          title="Категория"
          childs={[<UiButton icon={<AiOutlinePlus />} onClick={toggleModal} />]}
        />
      )}
      pagination={{
        total: category?.meta.total,
        current: currentPage,
        onChange: (value) => setCurrentPage(value),
      }}
    />
  );
};

export { CategoryTable };
