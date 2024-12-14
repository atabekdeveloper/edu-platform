import { ConfigProvider, Table, TableProps } from 'antd';
import React from 'react';
import { useResponsive } from 'src/hooks';
import uniqid from 'uniqid';

const GlobalTable: React.FC<TableProps<any>> = (_props) => {
  const { isMobile } = useResponsive(700);
  return (
    <ConfigProvider theme={{ components: { Table: { headerBg: '#fafafa' } } }}>
      <Table
        {..._props}
        rowKey={() => uniqid()}
        pagination={{ ..._props.pagination, position: ['bottomRight'], size: 'default' }}
        size="middle"
        bordered
        scroll={{ x: isMobile ? 1000 : 'auto' }}
      />
    </ConfigProvider>
  );
};

export { GlobalTable };
