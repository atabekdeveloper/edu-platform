import { Button, ButtonProps, ConfigProvider } from 'antd';
import React from 'react';

const UiButton: React.FC<ButtonProps> = (_props) => {
  const { color } = _props;
  return (
    <ConfigProvider theme={{ token: { colorPrimary: color || '#3783C5' } }}>
      <Button type="primary" {..._props} />
    </ConfigProvider>
  );
};

export { UiButton };
