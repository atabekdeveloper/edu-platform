import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { GlobalHead, GlobalTable } from 'src/components/admin/shareds';
import { UiButton } from 'src/components/admin/ui';
import { useGetBooksQuery, useGetCategoriesQuery, useGetTagsQuery } from 'src/services/index.api';
import { useAuthPersistStore, useFormStorageStore, useLangPersistStore } from 'src/store';

import { Input, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'src/hooks';
import { capitalizeFirstLetter } from 'src/utils';
import { useColumnsTable } from './useColumnsTable';

const BooksTable: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [author, setAuthor] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [categoryId, setCategoryId] = React.useState('');
  const [tagIds, setTagIds] = React.useState<string[]>([]);

  const { data: category } = useGetCategoriesQuery({ count: 100, page: 1 });
  const { data: tags } = useGetTagsQuery({ count: 100, page: 1 });

  const lang = useLangPersistStore((state) => state.lang);

  const signOut = useAuthPersistStore((state) => state.signOut);

  const { t } = useTranslation();

  const debounceTitle = useDebounce(title);
  const debounceAuthor = useDebounce(author);

  const columns = useColumnsTable();

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
          filterChilds={[
            <Input
              className="w-full"
              placeholder={t('title')}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />,
            <Input
              className="w-full"
              placeholder={t('author')}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />,
            <Select
              className="w-full"
              showSearch
              allowClear
              optionFilterProp="label"
              placeholder={t('category')}
              value={categoryId || null}
              onSelect={(value) => setCategoryId(value)}
              onClear={() => setCategoryId('')}
              options={category?.data.map((el: any) => ({
                value: el._id,
                label: el[`name${capitalizeFirstLetter(lang)}`],
              }))}
            />,
            <Select
              className="w-full"
              mode="multiple"
              showSearch
              allowClear
              optionFilterProp="label"
              placeholder={t('tags')}
              value={tagIds.length ? tagIds : null}
              onSelect={(value) => setTagIds((prev) => [...prev, value])}
              onDeselect={(value) => setTagIds((prev) => prev.filter((el) => el !== value))}
              onClear={() => setTagIds([])}
              options={tags?.data.map((el: any) => ({
                value: el._id,
                label: el[`name${capitalizeFirstLetter(lang)}`],
              }))}
            />,
          ]}
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
