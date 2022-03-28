import { ConfigProvider, Header, Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import './systemMenu.styles.scss';

const { SubMenu, Item } = Menu;
const { Header, Content, Footer } = Layout;

const SystemMenu = ({ settings }) => {
  const getExternalLink = (url) => {
    // shell.openExternal(url);
  };

  return (
    <ConfigProvider direction={settings.site_align}>
      <Header className="header">
        <Menu mode="horizontal" className="system-menu">
          <SubMenu
            key="submenu_view"
            title="View"
            className="system_submenus"
            popupOffset={[0, 0]}
          >
            <Menu.Item key="foods">
              <Link to="/add_category">Foods</Link>
            </Menu.Item>
            <Menu.Item key="food_addons">
              <Link to="/add_addons">Food Addons</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="submenu_manage_order"
            title="Manage Order"
            popupOffset={[0, 0]}
          >
            <Menu.Item key="submenu_manage_order:1">
              <Link to="/todays_order">Todays Order</Link>
            </Menu.Item>
            <Menu.Item key="submenu_manage_order:2">
              <Link to="/">POS System</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="submenu_settings" title="Settings" popupOffset={[0, 0]}>
            <Menu.Item key="submenu_settings:1">
              <Link to="/application_setting">Application Settings</Link>
            </Menu.Item>
            {/* <Menu.Item key="submenu_settings:2">Synchronization</Menu.Item> */}
          </SubMenu>
          <SubMenu key="submenu_help" title="Help" popupOffset={[0, 0]}>
            <Menu.Item key="submenu_help:1">
              <Link to="/contact">Contact</Link>
            </Menu.Item>
            {/* <Menu.Item key="submenu_help:2">About</Menu.Item> */}
          </SubMenu>
        </Menu>
      </Header>
    </ConfigProvider>
  );
};

export default SystemMenu;
