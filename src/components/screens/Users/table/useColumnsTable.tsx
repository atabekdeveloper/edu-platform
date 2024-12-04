import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { MdDeleteOutline } from 'react-icons/md';
import { GlobalPopConfirm } from 'src/components/shareds';
import { useDeleteUserMutation } from 'src/services/index.api';

import { TUserItem } from 'src/services/user/user.types';

export const useColumnsTable = () => {
  const { mutate: deleteUser, isLoading } = useDeleteUserMutation();
  const columns: ColumnsType<TUserItem> = [
    {
      title: 'ИД',
      dataIndex: 'idNumber',
      key: 'idNumber',
      align: 'center',
      render: (value) => value || '-',
    },
    {
      title: 'Ф.И.О',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (value) => value || '-',
    },
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
          title="Удалить пользователь"
          description="Вы уверены, что хотите удалить эту пользователь?"
          onConfirm={() => deleteUser(r._id)}
          loading={isLoading}
        >
          <Button type="primary" danger icon={<MdDeleteOutline />} />
        </GlobalPopConfirm>
      ),
    },
  ];
  return columns;
};
