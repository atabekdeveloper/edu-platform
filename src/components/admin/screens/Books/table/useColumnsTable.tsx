import { Button, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { MdDeleteOutline, MdOutlineEdit } from 'react-icons/md';
import { GlobalPopConfirm } from 'src/components/admin/shareds';
import { TBookItem } from 'src/services/book/book.types';
import { useDeleteBookMutation } from 'src/services/index.api';
import { useFormStorageStore, useLangPersistStore } from 'src/store';
import { capitalizeFirstLetter } from 'src/utils';

export const useColumnsTable = () => {
  const { t } = useTranslation();
  const lang = useLangPersistStore((state) => state.lang);

  const { mutate: deleteBook, isLoading } = useDeleteBookMutation();
  const setParamsForm = useFormStorageStore((state) => state.setParamsForm);
  const columns: ColumnsType<TBookItem> = [
    {
      title: t('title'),
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
      title: t('author'),
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
      title: t('category'),
      dataIndex: 'category',
      key: 'category',
      render: (_, r: any) => r.category[`name${capitalizeFirstLetter(lang)}`] || '',
    },
    {
      title: t('tags'),
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
      width: 100,
      align: 'center',
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
