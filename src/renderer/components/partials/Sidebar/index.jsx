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
const rootSubmenuKeys = ['food_management', 'setting', 'report'];

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

  const onClick = (e) => {
    console.log('e', e);
  };

  return (
    <div className="sidebar">
      <Menu
        theme="dark"
        style={{
          height: '100%',
        }}
        onClick={onClick}
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

            {/* <Menu.Item key="manage_food:3">Add Group Item</Menu.Item> */}

            <Menu.Item key="manage_food:4">
              <Link to="/food_variant">Food Variant</Link>
            </Menu.Item>

            <Menu.Item key="manage_food:5">
              <Link to="/food_availability">Food Availability</Link>
            </Menu.Item>

            <Menu.Item key="manage_food:6">
              <Link to="/food_menuType">Menu Type</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="manage_addons" title="Manage Add-ons">
            <Menu.Item key="manage_addons:1">
              <Link to="/add_addons">Add Add-ons</Link>
            </Menu.Item>

            <Menu.Item key="manage_addons:2">
              <Link to="/addons_list">Add-ons Lists</Link>
            </Menu.Item>

            <Menu.Item key="manage_addons:3">
              <Link to="/addons_assign_list">Add-ons Assign List</Link>
            </Menu.Item>
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

          <Menu.Item key="currency:2">
            <Link to="/currency">Currency</Link>
          </Menu.Item>

          <Menu.Item key="language:2">
            <Link to="/language">Language</Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key="report"
          title="Report"
          icon={<FontAwesomeIcon icon={faChartLine} />}
        >
          <Menu.Item key="salesReport">
            <Link to="/sales_report">Sales Report</Link>
          </Menu.Item>

          <Menu.Item key="itemsSalesReport">
            <Link to="/items_sales_report">Items Sales Report</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default Sidebar;
