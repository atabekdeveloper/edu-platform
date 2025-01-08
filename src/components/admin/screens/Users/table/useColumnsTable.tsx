import { Button, Select } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { GrBook } from 'react-icons/gr';
import { MdDeleteOutline } from 'react-icons/md';
import { GlobalPopConfirm } from 'src/components/admin/shareds';
import { useDeleteUserMutation, useUpdateActiveMutation } from 'src/services/index.api';

import { TUserItem } from 'src/services/user/user.types';
import { useFormStorageStore } from 'src/store';

export const useColumnsTable = () => {
  const { t } = useTranslation();
  const { mutate: userActiveChange } = useUpdateActiveMutation();
  const { mutate: deleteUser, isLoading } = useDeleteUserMutation();

  const setParamsForm = useFormStorageStore((state) => state.setParamsForm);

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
      title: t('age'),
      dataIndex: 'age',
      key: 'age',
      render: (value) => <span className="text-nowrap">{value || '-'}</span>,
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
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (_, r) => (
        <Select
          className="w-full"
          value={r.isActive}
          options={[
            { value: true, label: t('active') },
            { value: false, label: t('notActive') },
          ]}
          onChange={(value) => userActiveChange({ id: r._id, isActive: value })}
        />
      ),
    },
    {
      title: t('createdAt'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value: string) => <span className="text-nowrap">{value.split('T')[0] || '-'}</span>,
    },
    {
      title: t('lastUpdatedAt'),
      dataIndex: 'lastUpdatedAt',
      key: 'lastUpdatedAt',
      render: (value: string) => <span className="text-nowrap">{value.split('T')[0] || '-'}</span>,
    },
    {
      title: t('action'),
      dataIndex: 'action',
      key: 'action',
      width: 100,
      align: 'center',
      render: (_, r) => (
        <div className="flex gap-3">
          <Button type="primary" icon={<GrBook />} onClick={() => setParamsForm({ ...r })} />
          <GlobalPopConfirm
            title={t('deleteUser')}
            description={t('deleteUserDesc')}
            onConfirm={() => deleteUser(r._id)}
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
