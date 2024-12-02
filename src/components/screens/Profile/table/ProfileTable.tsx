import { Tooltip } from 'antd';
import React from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { GlobalHead } from 'src/components/shareds';
import { UiButton, UiTable } from 'src/components/ui';

import { useGetAuthUserQuery } from 'src/services/index.api';

import { useProfileColumnsTable } from './useProfileColumnsTable';

const ProfileTable: React.FC = () => {
  const { data: profile, isLoading } = useGetAuthUserQuery();
  const columns = useProfileColumnsTable();
  const navigate = useNavigate();
  return (
    <UiTable
      dataSource={[profile?.data]}
      columns={columns}
      loading={isLoading}
      title={() => (
        <GlobalHead
          title="Профиль"
          childs={[
            <Tooltip title="Назад">
              <UiButton icon={<IoArrowBackOutline />} onClick={() => navigate(-1)} />
            </Tooltip>,
          ]}
        />
      )}
      pagination={false}
    />
  );
};

export { ProfileTable };
