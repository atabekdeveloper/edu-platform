import React from 'react';
import { GlobalHead, GlobalTable } from 'src/components/admin/shareds';

import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useGetUsersQuery } from 'src/services/index.api';
import { useAuthPersistStore } from 'src/store';
import { useColumnsTable } from './useColumnsTable';

const UsersTable: React.FC = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = React.useState(1);
  const columns = useColumnsTable();

  const [role, setRole] = React.useState('');
  const [status, setStatus] = React.useState<boolean | null>(null);

  const signOut = useAuthPersistStore((state) => state.signOut);

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useGetUsersQuery({
    page: currentPage,
    isActive: status,
    role,
  });

  const roleItems = [
    {
      value: 'student',
      title: t('student'),
    },
    {
      value: 'teacher',
      title: t('teacher'),
    },
    {
      value: 'parent',
      title: t('parent'),
    },
  ];

  React.useEffect(() => {
    if (isError && error?.status === 401) {
      signOut();
    }
  }, [isError]);

  return (
    <GlobalTable
      dataSource={users?.data}
      columns={columns}
      loading={isLoading}
      title={() => (
        <GlobalHead
          title={t('users')}
          childs={[
            <Select
              className="w-[150px]"
              value={status}
              allowClear
              placeholder="Status"
              options={[
                { value: true, label: t('active') },
                { value: false, label: t('notActive') },
              ]}
              onClear={() => setStatus(null)}
              onChange={(value) => setStatus(value)}
            />,
            <Select
              className="w-[150px]"
              allowClear
              placeholder={t('role')}
              value={role || null}
              onSelect={(value) => setRole(value)}
              onClear={() => setRole('')}
              options={roleItems.map((el) => ({
                value: el.value,
                label: el.title,
              }))}
            />,
          ]}
        />
      )}
      pagination={{
        total: users?.meta.total,
        current: currentPage,
        onChange: (value) => setCurrentPage(value),
      }}
    />
  );
};

export { UsersTable };
