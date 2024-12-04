import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { GlobalHead, GlobalTable } from 'src/components/shareds';
import { UiButton } from 'src/components/ui';
import { useGetBooksQuery } from 'src/services/index.api';
import { useFormStorageStore } from 'src/store';

import { useColumnsTable } from './useColumnsTable';
import { useDebounce } from 'src/hooks';

const BooksTable: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [author, setAuthor] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [categoryId, setCategoryId] = React.useState('');
  const [tagIds, setTagIds] = React.useState<string[]>([]);

  const debounceTitle = useDebounce(title);
  const debounceAuthor = useDebounce(author);

  const columns = useColumnsTable({
    title,
    author,
    categoryId,
    tagIds,
    setAuthor,
    setCategoryId,
    setTagIds,
    setTitle,
  });

  const { data: books, isLoading } = useGetBooksQuery({
    page: currentPage,
    author: debounceAuthor,
    title: debounceTitle,
    categoryId: categoryId || null,
    tagIds,
  });

  const toggleModal = useFormStorageStore((state) => state.toggleModal);

  return (
    <GlobalTable
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
