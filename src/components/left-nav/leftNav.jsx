import React from 'react'

import { Link } from 'react-router-dom';

import menuList from '../../config/menuConfig';
import './index.scss'
import { Menu } from 'antd'
//? 在 antd 中使用阿里图标
import { createFromIconfontCN } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2372127_cicuaidwmxq.js',
});

export default function LeftNav() {
  const checkedItem = useLocation().pathname
  return (
    <div className="left-nav">
      <IconFont type="icon-twitter" />
      <div style={{ width: "100%" }}>
        <Menu
          mode="inline"
          theme="light"
          selectedKeys={[checkedItem]}
          style={{ fontSize: "16px", color: "#908080" }}
        >
          {menuList.map((menuItem) => {
            return (
              <Menu.Item key={menuItem.route}>
                <IconFont
                  style={{ fontSize: 20, color: "#30CB88" }}
                  type={menuItem.icon}
                />
                <Link to={menuItem.route}>{menuItem.title}</Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </div>
    </div>
  );
}
