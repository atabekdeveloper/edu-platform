import { ConfigProvider, Table, TableProps } from 'antd';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useResponsive } from 'src/hooks';
import { useFormStorageStore } from 'src/store';
import uniqid from 'uniqid';

const UiTable: React.FC<TableProps<any>> = (_props) => {
  const { isMobile } = useResponsive(700);
  const { pathname } = useLocation();

  const setParamsForm = useFormStorageStore((state) => state.setParamsForm);

  const onClickRowCapture = (e: any, data: any) => {
    if (
      e.target?.tagName === 'BUTTON' ||
      e.target?.tagName === 'svg' ||
      e.target?.tagName === 'path'
    ) {
      return;
    } else if (pathname === '/admins') {
      return;
    } else {
      setParamsForm(data);
    }
  };
  return (
    <ConfigProvider theme={{ components: { Table: { headerBg: '#fafafa' } } }}>
      <Table
        {..._props}
        rowKey={() => uniqid()}
        pagination={{ ..._props.pagination, position: ['bottomRight'], size: 'default' }}
        size="middle"
        bordered
        scroll={{ x: isMobile ? 'auto' : 1000 }}
        onRow={(data) => ({
          onClickCapture: (e) => onClickRowCapture(e, data),
        })}
      />
    </ConfigProvider>
  );
};

export { UiTable };
