import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { MdDeleteOutline } from 'react-icons/md';
import { GlobalPopConfirm } from 'src/components/shareds';
import { useDeleteUserMutation } from 'src/services/index.api';

import { TUserItem } from 'src/services/user/user.types';

export const useColumnsTable = () => {
  const { t } = useTranslation();
  const { mutate: deleteUser, isLoading } = useDeleteUserMutation();
  const columns: ColumnsType<TUserItem> = [
    {
      title: 'ID',
      dataIndex: 'idNumber',
      key: 'idNumber',
      align: 'center',
      render: (value) => value || '-',
    },
    {
      title: t('fullName'),
      dataIndex: 'fullName',
      key: 'fullName',
      render: (value) => value || '-',
    },
    {
      title: t('phone'),
      dataIndex: 'phone',
      key: 'phone',
      render: (value) => value || '-',
    },
    {
      title: t('role'),
      dataIndex: 'role',
      key: 'role',
      render: (value) => value || '-',
    },
    {
      title: t('createdAt'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value) => value || '-',
    },
    {
      title: t('lastUpdatedAt'),
      dataIndex: 'lastUpdatedAt',
      key: 'lastUpdatedAt',
      render: (value) => value || '-',
    },
    {
      title: t('action'),
      dataIndex: 'action',
      key: 'action',
      render: (_, r) => (
        <GlobalPopConfirm
          title={t('deleteUser')}
          description={t('deleteUserDesc')}
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
