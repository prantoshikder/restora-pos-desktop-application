import React from 'react';
import { Col, Container } from 'react-bootstrap';
import Heading from 'renderer/components/Heading';
import ApplicationSetting from './../../../components/ApplicationSetting';
import Sidebar from './../../../components/partials/Sidebar';

const ApplicationSettings = () => {
  return (
    <Container fluid className="main-wrapper">
      <div className="flex pos_system">
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Heading title="Setting" />
          <ApplicationSetting />
        </Col>
      </div>
    </Container>
  );
};

export default ApplicationSettings;
