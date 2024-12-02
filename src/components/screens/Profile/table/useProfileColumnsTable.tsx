import { ColumnsType } from 'antd/es/table';
import { TAuthUserItem } from 'src/services/auth/auth.types';

export const useProfileColumnsTable = () => {
  const columns: ColumnsType<TAuthUserItem> = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
      ellipsis: true,
    },
  ];
  return columns;
};
