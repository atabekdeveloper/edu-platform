import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { GlobalHead, GlobalTable } from 'src/components/admin/shareds';
import { UiButton } from 'src/components/admin/ui';
import { useGetBooksQuery } from 'src/services/index.api';
import { useAuthPersistStore, useFormStorageStore } from 'src/store';

import { useTranslation } from 'react-i18next';
import { useDebounce } from 'src/hooks';
import { useColumnsTable } from './useColumnsTable';

const BooksTable: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [author, setAuthor] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [categoryId, setCategoryId] = React.useState('');
  const [tagIds, setTagIds] = React.useState<string[]>([]);

  const signOut = useAuthPersistStore((state) => state.signOut);

  const { t } = useTranslation();

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

  const {
    data: books,
    isLoading,
    isError,
    error,
  } = useGetBooksQuery({
    page: currentPage,
    count: 10,
    author: debounceAuthor,
    title: debounceTitle,
    categoryId: categoryId || null,
    tagIds,
  });

  const toggleModal = useFormStorageStore((state) => state.toggleModal);

  React.useEffect(() => {
    if (isError && error?.status === 401) {
      signOut();
    }
  }, [isError]);

  return (
    <GlobalTable
      dataSource={books?.data}
      columns={columns}
      loading={isLoading}
      title={() => (
        <GlobalHead
          title={t('books')}
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
