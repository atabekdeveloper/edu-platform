import { Button, Input, Select, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { MdDeleteOutline, MdOutlineEdit } from 'react-icons/md';
import { GlobalPopConfirm } from 'src/components/admin/shareds';
import { TBookItem } from 'src/services/book/book.types';
import {
  useDeleteBookMutation,
  useGetCategoriesQuery,
  useGetTagsQuery,
} from 'src/services/index.api';
import { useFormStorageStore, useLangPersistStore } from 'src/store';
import { capitalizeFirstLetter } from 'src/utils';

interface IUseColumnsTable {
  title: string;
  author: string;
  categoryId: string;
  tagIds: string[];
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setAuthor: React.Dispatch<React.SetStateAction<string>>;
  setCategoryId: React.Dispatch<React.SetStateAction<string>>;
  setTagIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export const useColumnsTable = ({
  title,
  author,
  categoryId,
  tagIds,
  setAuthor,
  setCategoryId,
  setTagIds,
  setTitle,
}: IUseColumnsTable) => {
  const { t } = useTranslation();
  const lang = useLangPersistStore((state) => state.lang);

  const { mutate: deleteBook, isLoading } = useDeleteBookMutation();
  const { data: category } = useGetCategoriesQuery({ count: 100, page: 1 });
  const { data: tags } = useGetTagsQuery({ count: 100, page: 1 });
  const setParamsForm = useFormStorageStore((state) => state.setParamsForm);
  const columns: ColumnsType<TBookItem> = [
    {
      title: (
        <Input
          className="w-40"
          placeholder={t('title')}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ),
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      render: (value) => value || '-',
    },
    {
      title: t('desc'),
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      render: (value) => value || '-',
    },
    {
      title: (
        <Input
          className="w-40"
          placeholder={t('author')}
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      ),
      dataIndex: 'author',
      key: 'author',
      render: (value) => value || '-',
    },
    {
      title: 'ISBN',
      dataIndex: 'isbn',
      key: 'isbn',
      render: (value) => value || '-',
    },
    {
      title: (
        <Select
          className="w-40"
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
        />
      ),
      dataIndex: 'category',
      key: 'category',
      render: (_, r: any) => r.category[`name${capitalizeFirstLetter(lang)}`] || '',
    },
    {
      title: (
        <Select
          className="w-40"
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
        />
      ),
      dataIndex: 'tags',
      key: 'tags',
      render: (_, r) => (
        <div className="flex flex-wrap gap-1">
          {r.tags.map((tag: any) => (
            <Tag key={tag._id}>{tag[`name${capitalizeFirstLetter(lang)}`]}</Tag>
          ))}
        </div>
      ),
    },
    {
      title: t('photo'),
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (value) => (
        <a className="hover:underline text-primary" href={value} target="_blank">
          Link
        </a>
      ),
    },
    {
      title: t('studentBook'),
      dataIndex: 'pdfUrl',
      key: 'pdfUrl',
      render: (value) => (
        <a className="hover:underline text-primary" href={value} target="_blank">
          Link
        </a>
      ),
    },
    {
      title: t('workBook'),
      dataIndex: 'workBookPdfUrl',
      key: 'workBookPdfUrl',
      render: (value) => (
        <a className="hover:underline text-primary" href={value} target="_blank">
          Link
        </a>
      ),
    },
    {
      title: t('action'),
      dataIndex: 'action',
      key: 'action',
      render: (_, r) => (
        <div className="flex gap-2">
          <Button icon={<MdOutlineEdit />} type="default" onClick={() => setParamsForm(r)} />
          <GlobalPopConfirm
            title={t('deleteBook')}
            description={t('deleteBookDesc')}
            onConfirm={() => deleteBook(r._id)}
            loading={isLoading}
          >
            <Button type="primary" danger icon={<MdDeleteOutline />} />
          </GlobalPopConfirm>
        </div>
      ),
    },
  ];
  return columns;
};
