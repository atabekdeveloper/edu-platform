import { Popconfirm, PopconfirmProps } from 'antd';
import React from 'react';

const GlobalPopConfirm: React.FC<PopconfirmProps & { loading: boolean }> = (_props) => {
  return (
    <Popconfirm
      {..._props}
      okText="Да"
      cancelText="Нет"
      placement="topLeft"
      okButtonProps={{ loading: _props.loading }}
    />
  );
};

export { GlobalPopConfirm };
