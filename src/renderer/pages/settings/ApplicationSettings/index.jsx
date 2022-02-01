import { Col, ConfigProvider, Row } from 'antd';
import React from 'react';
import Heading from 'renderer/components/Heading';
import ApplicationSetting from './../../../components/ApplicationSetting';
import Sidebar from './../../../components/partials/Sidebar';

const ApplicationSettings = ({ direction }) => {
  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <ConfigProvider direction={direction}>
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
