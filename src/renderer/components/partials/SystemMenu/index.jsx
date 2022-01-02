import { Header, Layout, Menu } from 'antd';
// import { shell } from 'electron';
import React from 'react';
import { Link } from 'react-router-dom';
import './systemMenu.styles.scss';

const { SubMenu, Item } = Menu;
const { Header, Content, Footer } = Layout;

const SystemMenu = () => {
  const getExternaleLink = (url) => {
    // shell.openExternal(url);
  };

  return (
    <Header className="header">
      <Menu mode="horizontal" className="system-menu">
        <SubMenu
          key="submenu_view"
          title="View"
          className="system_submenus"
          popupOffset={[0, 0]}
        >
          <Menu.Item key="foods">Foods</Menu.Item>
          <Menu.Item key="food_addons">Food Addons</Menu.Item>
          <Menu.Item key="food_category">
            <Link to="/food-management">Food Management</Link>
          </Menu.Item>
          <Menu.Item key="tables">Tables</Menu.Item>
          <Menu.Item key="customer_type">Customer Type</Menu.Item>
        </SubMenu>

        <SubMenu
          key="submenu_manage_order"
          title="Manage Order"
          popupOffset={[0, 0]}
        >
          <Menu.Item key="submenu_manage_order:1">Order</Menu.Item>
          <Menu.Item key="submenu_manage_order:2">
            <Link to="/">POS System</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="submenu_settings" title="Settings" popupOffset={[0, 0]}>
          <Menu.Item key="submenu_settings:1">Application Settings</Menu.Item>
          <Menu.Item key="submenu_settings:2">Synchronization</Menu.Item>
        </SubMenu>
        <SubMenu key="submenu_help" title="Help" popupOffset={[0, 0]}>
          <Menu.Item
            key="submenu_help:1"
            onClick={() =>
              getExternaleLink('https://www.bdtask.com/contact.php')
            }
          >
            Contact
          </Menu.Item>
          <Menu.Item key="submenu_help:2">About</Menu.Item>
        </SubMenu>
      </Menu>
    </Header>
  );
};

export default SystemMenu;
