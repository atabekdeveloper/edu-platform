import { Button, Input, Select, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { MdDeleteOutline } from 'react-icons/md';
import { GlobalPopConfirm } from 'src/components/shareds';
import { TBookItem } from 'src/services/book/book.types';
import {
  useDeleteBookMutation,
  useGetCategoriesQuery,
  useGetTagsQuery,
} from 'src/services/index.api';
import { useFormStorageStore } from 'src/store';

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
  const { mutate: deleteBook, isLoading } = useDeleteBookMutation();
  const { data: category } = useGetCategoriesQuery({ count: 100, page: 1 });
  const { data: tags } = useGetTagsQuery({ count: 100, page: 1 });
  const setParamsForm = useFormStorageStore((state) => state.setParamsForm);
  const columns: ColumnsType<TBookItem> = [
    {
      title: (
        <Input placeholder="Название" value={title} onChange={(e) => setTitle(e.target.value)} />
      ),
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      onCell: (data) => ({ onClick: () => setParamsForm(data) }),
      render: (value) => value || '-',
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      onCell: (data) => ({ onClick: () => setParamsForm(data) }),
      render: (value) => value || '-',
    },
    {
      title: (
        <Input placeholder="Автор" value={author} onChange={(e) => setAuthor(e.target.value)} />
      ),
      dataIndex: 'author',
      key: 'author',
      onCell: (data) => ({ onClick: () => setParamsForm(data) }),
      render: (value) => value || '-',
    },
    {
      title: 'ISBN',
      dataIndex: 'isbn',
      key: 'isbn',
      onCell: (data) => ({ onClick: () => setParamsForm(data) }),
      render: (value) => value || '-',
    },
    {
      title: (
        <Select
          className="w-full"
          showSearch
          allowClear
          optionFilterProp="label"
          placeholder="Категория"
          value={categoryId || null}
          onSelect={(value) => setCategoryId(value)}
          onClear={() => setCategoryId('')}
          options={category?.data.map((el) => ({ value: el._id, label: el.name }))}
        />
      ),
      dataIndex: 'category',
      key: 'category',
      onCell: (data) => ({ onClick: () => setParamsForm(data) }),
      render: (_, r) => r.category?.name || '',
    },
    {
      title: (
        <Select
          className="w-full"
          mode="multiple"
          showSearch
          allowClear
          optionFilterProp="label"
          placeholder="Теги"
          value={tagIds.length ? tagIds : null}
          onSelect={(value) => setTagIds((prev) => [...prev, value])}
          onDeselect={(value) => setTagIds((prev) => prev.filter((el) => el !== value))}
          onClear={() => setTagIds([])}
          options={tags?.data.map((el) => ({ value: el._id, label: el.name }))}
        />
      ),
      dataIndex: 'tags',
      key: 'tags',
      onCell: (data) => ({ onClick: () => setParamsForm(data) }),
      render: (_, r) => (
        <div className="flex flex-wrap gap-1">
          {r.tags.map((tag) => (
            <Tag key={tag._id}>{tag.name}</Tag>
          ))}
        </div>
      ),
    },
    {
      title: 'Фото',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      onCell: (data) => ({ onClick: (e: any) => e.target?.tagName !== 'A' && setParamsForm(data) }),
      render: (value) => (
        <a className="hover:underline text-primary" href={value} target="_blank">
          Ссылка
        </a>
      ),
    },
    {
      title: 'Основная книга',
      dataIndex: 'pdfUrl',
      key: 'pdfUrl',
      onCell: (data) => ({ onClick: (e: any) => e.target?.tagName !== 'A' && setParamsForm(data) }),
      render: (value) => (
        <a className="hover:underline text-primary" href={value} target="_blank">
          Ссылка
        </a>
      ),
    },
    {
      title: 'Рабочая книга',
      dataIndex: 'workBookPdfUrl',
      key: 'workBookPdfUrl',
      onCell: (data) => ({ onClick: (e: any) => e.target?.tagName !== 'A' && setParamsForm(data) }),
      render: (value) => (
        <a className="hover:underline text-primary" href={value} target="_blank">
          Ссылка
        </a>
      ),
    },
    {
      title: 'Действие',
      dataIndex: 'action',
      key: 'action',
      render: (_, r) => (
        <GlobalPopConfirm
          title="Удалить книгу"
          description="Вы уверены, что хотите удалить эту книгу?"
          onConfirm={() => deleteBook(r._id)}
          loading={isLoading}
        >
          <Button type="primary" danger icon={<MdDeleteOutline />} />
        </GlobalPopConfirm>
      ),
    },
  ];
  return columns;
};
