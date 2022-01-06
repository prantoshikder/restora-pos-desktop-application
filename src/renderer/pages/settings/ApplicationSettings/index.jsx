import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Heading from 'renderer/components/Heading';
import ApplicationSetting from './../../../components/ApplicationSetting';
import Header from './../../../components/partials/Header';
import Sidebar from './../../../components/partials/Sidebar';

const ApplicationSettings = () => {
  return (
    <Container fluid className="p-0">
      <Header />
      <Row>
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Heading title="Setting" />
          <ApplicationSetting />
        </Col>
      </Row>
    </Container>
  );
};

export default ApplicationSettings;
