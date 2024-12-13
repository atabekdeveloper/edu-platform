import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { MdDeleteOutline } from 'react-icons/md';
import { GlobalPopConfirm } from 'src/components/shareds';
import { TCategoryItem } from 'src/services/category/category.types';
import { useDeleteCategoryMutation } from 'src/services/index.api';
import { useFormStorageStore } from 'src/store';

export const useColumnsTable = () => {
  const { t } = useTranslation();
  const { mutate: deleteCategory, isLoading } = useDeleteCategoryMutation();
  const setParamsForm = useFormStorageStore((state) => state.setParamsForm);
  const columns: ColumnsType<TCategoryItem> = [
    {
      title: `${t('title')} (O'zbekcha)`,
      dataIndex: 'nameUz',
      key: 'nameUz',
      onCell: (data) => ({ onClick: () => setParamsForm(data) }),
      render: (value) => value || '-',
    },
    {
      title: `${t('title')} (Русский)`,
      dataIndex: 'nameRu',
      key: 'nameRu',
      onCell: (data) => ({ onClick: () => setParamsForm(data) }),
      render: (value) => value || '-',
    },
    {
      title: `${t('title')} (English)`,
      dataIndex: 'nameEng',
      key: 'nameEng',
      onCell: (data) => ({ onClick: () => setParamsForm(data) }),
      render: (value) => value || '-',
    },
    {
      title: t('bookCount'),
      dataIndex: 'bookCount',
      key: 'bookCount',
      onCell: (data) => ({ onClick: () => setParamsForm(data) }),
      render: (value) => value || '-',
    },
    {
      title: t('createdAt'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      onCell: (data) => ({ onClick: () => setParamsForm(data) }),
      render: (value: string) => value.split('T')[0] || '-',
    },
    {
      title: t('lastUpdatedAt'),
      dataIndex: 'lastUpdatedAt',
      key: 'lastUpdatedAt',
      onCell: (data) => ({ onClick: () => setParamsForm(data) }),
      render: (value: string) => value.split('T')[0] || '-',
    },
    {
      title: t('action'),
      dataIndex: 'action',
      key: 'action',
      render: (_, r) => (
        <GlobalPopConfirm
          title={t('deleteCategory')}
          description={t('deleteCategoryDesc')}
          onConfirm={() => deleteCategory(r._id)}
          loading={isLoading}
        >
          <Button type="primary" danger icon={<MdDeleteOutline />} />
        </GlobalPopConfirm>
      ),
    },
  ];
  return columns;
};
