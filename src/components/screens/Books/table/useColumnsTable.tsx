import { Button, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { MdDeleteOutline } from 'react-icons/md';
import { TBookItem } from 'src/services/book/book.types';
import { useDeleteBookMutation } from 'src/services/index.api';

export const useColumnsTable = () => {
  const { mutate: deleteBook } = useDeleteBookMutation();
  const columns: ColumnsType<TBookItem> = [
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      render: (value) => value || '-',
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      render: (value) => value || '-',
    },
    {
      title: 'Автор',
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
      title: 'Категория',
      dataIndex: 'category',
      key: 'category',
      render: (_, r) => r.category?.name || '',
    },
    {
      title: 'Теги',
      dataIndex: 'tags',
      key: 'tags',
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
        <Button
          key={r._id}
          type="primary"
          danger
          icon={<MdDeleteOutline />}
          onClick={() => deleteBook(r._id)}
        />
      ),
    },
  ];
  return columns;
};
