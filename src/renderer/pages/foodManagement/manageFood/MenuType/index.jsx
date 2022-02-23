import { Col, ConfigProvider, Row } from 'antd';
import Heading from 'renderer/components/Heading';
import MenuTypeList from './../../../../components/MenuTypeList';
import Sidebar from './../../../../components/partials/Sidebar';
import './MenuType.style.scss';

const MenuType = ({ settings }) => {
  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <ConfigProvider direction={settings.site_align}>
          <Row>
            <Col lg={3}>
              <Sidebar />
            </Col>
            <Col md={21}>
              <Heading title="Menu Type" />

              <MenuTypeList />
            </Col>
          </Row>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default MenuType;
