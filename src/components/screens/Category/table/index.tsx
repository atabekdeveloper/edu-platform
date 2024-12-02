import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { GlobalHead } from 'src/components/shareds';
import { UiButton, UiTable } from 'src/components/ui';
import { useGetCategoriesQuery } from 'src/services/index.api';
import { useFormStorageStore } from 'src/store';

import { useColumnsTable } from './useColumnsTable';

const CategoryTable: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const columns = useColumnsTable();

  const { data: category, isLoading } = useGetCategoriesQuery({
    page: currentPage,
  });

  const setParamsForm = useFormStorageStore((state) => state.setParamsForm);
  const toggleModal = useFormStorageStore((state) => state.toggleModal);

  return (
    <UiTable
      dataSource={category?.data}
      columns={columns}
      loading={isLoading}
      onRow={(data) => ({
        onClickCapture: (e: any) => e.target?.tagName === 'TD' && setParamsForm(data),
      })}
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
