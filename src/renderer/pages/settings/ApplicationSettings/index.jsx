import { Col, ConfigProvider, Row } from 'antd';
import Heading from 'renderer/components/Heading';
import ApplicationSetting from './../../../components/ApplicationSetting';
import Sidebar from './../../../components/partials/Sidebar';

const ApplicationSettings = ({ settings }) => {
  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <ConfigProvider direction={settings.direction}>
          <Row>
            <Col lg={3}>
              <Sidebar />
            </Col>
            <Col md={21}>
              <Heading title="Application Settings" />

              <ApplicationSetting />
            </Col>
          </Row>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default ApplicationSettings;
