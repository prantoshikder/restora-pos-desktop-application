/* eslint-disable */
import React from 'react';
import { Menu, MenuItem, ProSidebar, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import './Sidebar.style.scss';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ProSidebar>
        <Menu iconShape="square">
          <MenuItem icon={<faGem />}>Dashboard</MenuItem>
          <SubMenu title="Components" icon={<faHeart />}>
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar>
    </div>
  );
};

export default Sidebar;
