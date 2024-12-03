import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { GlobalHead } from 'src/components/shareds';
import { UiButton, UiTable } from 'src/components/ui';
import { useGetBooksQuery } from 'src/services/index.api';
import { useFormStorageStore } from 'src/store';

import { useColumnsTable } from './useColumnsTable';

const BooksTable: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const columns = useColumnsTable();

  const { data: books, isLoading } = useGetBooksQuery({
    page: currentPage,
  });

  const toggleModal = useFormStorageStore((state) => state.toggleModal);

  return (
    <UiTable
      dataSource={books?.data}
      columns={columns}
      loading={isLoading}
      title={() => (
        <GlobalHead
          title="Книги"
          childs={[<UiButton icon={<AiOutlinePlus />} onClick={toggleModal} />]}
        />
      )}
      pagination={{
        total: books?.meta.total,
        current: currentPage,
        onChange: (value) => setCurrentPage(value),
      }}
    />
  );
};

export { BooksTable };
