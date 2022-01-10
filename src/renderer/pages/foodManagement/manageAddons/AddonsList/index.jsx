import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Heading from 'renderer/components/Heading';
import Header from 'renderer/components/partials/Header';
import AllAddonsList from './../../../../components/AllAddonsList';
import Sidebar from './../../../../components/partials/Sidebar';

const AddonsList = () => {
  return (
    <Container fluid className="px-0 main-wrapper">
      <Header />
      <Row className="foodManage_system">
        <Col lg={2}>
          <Sidebar />
        </Col>

        <Col lg={10}>
          <Heading title="Menu Addons" />
          <AllAddonsList />
        </Col>
      </Row>
    </Container>
  );
};

export default AddonsList;
