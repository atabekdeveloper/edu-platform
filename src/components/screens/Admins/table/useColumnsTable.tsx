import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { MdDeleteOutline } from 'react-icons/md';
import { GlobalPopConfirm } from 'src/components/shareds';
import { useDeleteAdminMutation } from 'src/services/index.api';

import { TUserItem } from 'src/services/user/user.types';

export const useColumnsTable = () => {
  const { mutate: deleteUserAdmin, isLoading } = useDeleteAdminMutation();
  const columns: ColumnsType<TUserItem> = [
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
      render: (value) => value || '-',
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'role',
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
        <GlobalPopConfirm
          title="Удалить админ"
          description="Вы уверены, что хотите удалить эту админ?"
          onConfirm={() => deleteUserAdmin(r._id)}
          loading={isLoading}
        >
          <Button type="primary" danger icon={<MdDeleteOutline />} />
        </GlobalPopConfirm>
      ),
    },
  ];
  return columns;
};
