import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { GlobalHead } from 'src/components/shareds';
import { UiButton, UiTable } from 'src/components/ui';
import { useGetTagsQuery } from 'src/services/index.api';
import { useFormStorageStore } from 'src/store';

import { useColumnsTable } from './useColumnsTable';

const TagTable: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const columns = useColumnsTable();

  const { data: tags, isLoading } = useGetTagsQuery({
    page: currentPage,
  });

  const setParamsForm = useFormStorageStore((state) => state.setParamsForm);
  const toggleModal = useFormStorageStore((state) => state.toggleModal);

  return (
    <UiTable
      dataSource={tags?.data}
      columns={columns}
      loading={isLoading}
      onRow={(data) => ({
        onClickCapture: (e: any) => e.target?.tagName === 'TD' && setParamsForm(data),
      })}
      title={() => (
        <GlobalHead
          title="Теги"
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
