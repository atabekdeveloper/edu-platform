import { ConfigProvider, Menu, MenuProps } from 'antd';
import React from 'react';

const UiMenu: React.FC<MenuProps> = (_props) => (
  <ConfigProvider
    theme={{
      components: {
        Menu: {
          groupTitleColor: '#121926',
          itemHoverBg: '#E3F2FD',
          itemSelectedColor: '#3783C5',
          subMenuItemBg: '#fff',
          colorPrimary: '#3783C5',
          controlItemBgActive: '#E3F2FD',
          groupTitleFontSize: 14,
        },
      },
    }}
  >
    <Menu {..._props} />
  </ConfigProvider>
);

export { UiMenu };
