import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { MdDeleteOutline } from 'react-icons/md';
import { TCategoryItem } from 'src/services/category/category.types';
import { useDeleteTagMutation } from 'src/services/index.api';

export const useColumnsTable = () => {
  const { mutate: deleteTag } = useDeleteTagMutation();
  const columns: ColumnsType<TCategoryItem> = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      render: (value) => value || '-',
    },
    {
      title: 'Количество книг',
      dataIndex: 'bookCount',
      key: 'bookCount',
      render: (value) => value || '-',
    },
    {
      title: 'Создано',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value) => value || '-',
    },
    {
      title: 'Обновлено',
      dataIndex: 'lastUpdatedAt',
      key: 'lastUpdatedAt',

      render: (value) => value || '-',
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
          onClick={() => deleteTag(r._id)}
        />
      ),
    },
  ];
  return columns;
};
