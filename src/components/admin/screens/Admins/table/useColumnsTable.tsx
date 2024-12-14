import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { MdDeleteOutline } from 'react-icons/md';
import { GlobalPopConfirm } from 'src/components/admin/shareds';
import { useDeleteAdminMutation } from 'src/services/index.api';

import { TUserItem } from 'src/services/user/user.types';

export const useColumnsTable = () => {
  const { t } = useTranslation();
  const { mutate: deleteUserAdmin, isLoading } = useDeleteAdminMutation();
  const columns: ColumnsType<TUserItem> = [
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
      render: (value: string) => value.split('T')[0] || '-',
    },
    {
      title: t('lastUpdatedAt'),
      dataIndex: 'lastUpdatedAt',
      key: 'lastUpdatedAt',
      render: (value: string) => value.split('T')[0] || '-',
    },
    {
      title: t('action'),
      dataIndex: 'action',
      key: 'action',
      render: (_, r) => (
        <GlobalPopConfirm
          title={t('deleteAdmin')}
          description={t('deleteAdminDesc')}
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
