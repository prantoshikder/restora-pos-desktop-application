/* eslint-disable */
import { faChartLine, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Menu, MenuItem, ProSidebar, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';
import './Sidebar.style.scss';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ProSidebar>
        <Menu iconShape="square">
          <MenuItem>
            <FontAwesomeIcon icon={faHome} />
            <Link to="/">Home</Link>
          </MenuItem>

          <MenuItem>
            <Link to="/report">
              <FontAwesomeIcon icon={faChartLine} />
              Report
            </Link>
          </MenuItem>

          <SubMenu title="Food Management">
            <SubMenu title="Manage Category">
              <MenuItem>
                <Link to="/add_category">Add Category</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/category_list">Category List</Link>
              </MenuItem>
            </SubMenu>

            <SubMenu title="Manage Food">
              <MenuItem>Add Food</MenuItem>
              <MenuItem>Food List</MenuItem>
              <MenuItem>Add Group Item</MenuItem>
              <MenuItem>Food Variant</MenuItem>
              <MenuItem>Food Availability</MenuItem>
              <MenuItem>Menu Type</MenuItem>
            </SubMenu>

            <SubMenu title="Manage Add-ons">
              <MenuItem>Add Add-ons</MenuItem>
              <MenuItem>Add-ons List</MenuItem>
              <MenuItem>Add-ons Assign List</MenuItem>
            </SubMenu>
          </SubMenu>

          <SubMenu title="Setting">
            <MenuItem>
              <Link to="/application_setting">Application Setting</Link>
            </MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar>
    </div>
  );
};

export default Sidebar;
