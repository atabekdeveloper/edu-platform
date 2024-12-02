import { ConfigProvider, Table, TableProps } from 'antd';
import React from 'react';
import uniqid from 'uniqid';

const UiTable: React.FC<TableProps<any>> = (_props) => {
  return (
    <ConfigProvider theme={{ components: { Table: { headerBg: '#fafafa' } } }}>
      <Table
        {..._props}
        rowKey={() => uniqid()}
        pagination={{ ..._props.pagination, position: ['bottomRight'], size: 'default' }}
        size="middle"
        bordered
      />
    </ConfigProvider>
  );
};

export { UiTable };
