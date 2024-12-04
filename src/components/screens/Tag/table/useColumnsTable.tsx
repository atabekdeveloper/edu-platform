import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { MdDeleteOutline } from 'react-icons/md';
import { GlobalPopConfirm } from 'src/components/shareds';
import { TCategoryItem } from 'src/services/category/category.types';
import { useDeleteTagMutation } from 'src/services/index.api';
import { useFormStorageStore } from 'src/store';

export const useColumnsTable = () => {
  const { mutate: deleteTag, isLoading } = useDeleteTagMutation();
  const setParamsForm = useFormStorageStore((state) => state.setParamsForm);
  const columns: ColumnsType<TCategoryItem> = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      onCell: (data) => ({ onClick: () => setParamsForm(data) }),
      render: (value) => value || '-',
    },
    {
      title: 'Количество книг',
      dataIndex: 'bookCount',
      key: 'bookCount',
      onCell: (data) => ({ onClick: () => setParamsForm(data) }),
      render: (value) => value || '-',
    },
    {
      title: 'Создано',
      dataIndex: 'createdAt',
      key: 'createdAt',
      onCell: (data) => ({ onClick: () => setParamsForm(data) }),
      render: (value) => value || '-',
    },
    {
      title: 'Обновлено',
      dataIndex: 'lastUpdatedAt',
      key: 'lastUpdatedAt',
      onCell: (data) => ({ onClick: () => setParamsForm(data) }),
      render: (value) => value || '-',
    },
    {
      title: 'Действие',
      dataIndex: 'action',
      key: 'action',
      render: (_, r) => (
        <GlobalPopConfirm
          title="Удалить тег"
          description="Вы уверены, что хотите удалить эту тег?"
          onConfirm={() => deleteTag(r._id)}
          loading={isLoading}
        >
          <Button type="primary" danger icon={<MdDeleteOutline />} />
        </GlobalPopConfirm>
      ),
    },
  ];
  return columns;
};
