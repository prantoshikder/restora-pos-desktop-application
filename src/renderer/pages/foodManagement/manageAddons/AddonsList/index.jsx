import { Col, ConfigProvider, Row } from 'antd';
import Heading from 'renderer/components/Heading';
import AllAddonsList from './../../../../components/AllAddonsList';
import Sidebar from './../../../../components/partials/Sidebar';

const AddonsList = ({ settings }) => {
  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <ConfigProvider direction={settings.site_align}>
          <Row>
            <Col lg={5} xl={3} xxl={3}>
              <Sidebar />
            </Col>

            <Col lg={19} xl={21} xxl={21}>
              <Heading title="Add-ons List" />

              <AllAddonsList />
            </Col>
          </Row>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default AddonsList;
