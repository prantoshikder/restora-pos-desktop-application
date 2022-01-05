import {
  faChartLine,
  faCog,
  faCube,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.style.scss';

const { SubMenu } = Menu;
// submenu keys of first level
const rootSubmenuKeys = ['food_management', 'setting'];

const Sidebar = ({ home }) => {
  const [openKeys, setOpenKeys] = useState(['home']);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <div className="sidebar">
      <Menu
        theme="dark"
        style={{
          height: '100%',
        }}
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      >
        <Menu.Item key="home" icon={<FontAwesomeIcon icon={faHome} />}>
          <Link to="/">Home</Link>
        </Menu.Item>

        <SubMenu
          key="food_management"
          title="Food Management"
          icon={<FontAwesomeIcon icon={faCube} />}
        >
          <SubMenu key="manage_category" title="Manage Category">
            <Menu.Item key="manage_category:1">
              <Link to="/add_category">Add Category</Link>
            </Menu.Item>
            <Menu.Item key="manage_category:2">
              <Link to="/category_list">Category List</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="manage_food" title="Manage Food">
            <Menu.Item key="manage_food:1">
              <Link to="/add_food">Add Food</Link>
            </Menu.Item>
            <Menu.Item key="manage_food:2">
              <Link to="/food_list">Food List</Link>
            </Menu.Item>
            <Menu.Item key="manage_food:3">Add Group Item</Menu.Item>
            <Menu.Item key="manage_food:4">Food Variant</Menu.Item>
            <Menu.Item key="manage_food:5">Food Availability</Menu.Item>
            <Menu.Item key="manage_food:6">Menu Type</Menu.Item>
          </SubMenu>

          <SubMenu key="manage_addons" title="Manage Add-ons">
            <Menu.Item key="manage_addons:1">Add Add-ons</Menu.Item>
            <Menu.Item key="manage_addons:2">Add-ons Lists</Menu.Item>
            <Menu.Item key="manage_addons:3">Add-ons Assign List</Menu.Item>
          </SubMenu>
        </SubMenu>

        <SubMenu
          key="setting"
          title="Setting"
          icon={<FontAwesomeIcon icon={faCog} />}
        >
          <Menu.Item key="application_setting:1">
            <Link to="/application_setting">Application Setting</Link>
          </Menu.Item>
        </SubMenu>

        <Menu.Item key="report" icon={<FontAwesomeIcon icon={faChartLine} />}>
          <Link to="/report">Report</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;
