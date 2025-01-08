import { Popconfirm, PopconfirmProps } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const GlobalPopConfirm: React.FC<PopconfirmProps & { loading: boolean }> = (_props) => {
  const { t } = useTranslation();
  return (
    <Popconfirm
      {..._props}
      okText={t('yes')}
      cancelText={t('no')}
      placement="topLeft"
      okButtonProps={{ loading: _props.loading }}
    />
  );
};

export { GlobalPopConfirm };
