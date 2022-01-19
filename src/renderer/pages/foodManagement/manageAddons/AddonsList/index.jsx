import React from 'react';
import { Col, Container } from 'react-bootstrap';
import Heading from 'renderer/components/Heading';
import Header from 'renderer/components/partials/Header';
import AllAddonsList from './../../../../components/AllAddonsList';
import Sidebar from './../../../../components/partials/Sidebar';

const AddonsList = () => {
  return (
    <Container fluid className="main-wrapper">
      <Header />
      <div className="flex pos_system">
        <Col lg={2}>
          <Sidebar />
        </Col>

        <Col lg={10}>
          <Heading title="Menu Addons" />
          <AllAddonsList />
        </Col>
      </div>
    </Container>
  );
};

export default AddonsList;
