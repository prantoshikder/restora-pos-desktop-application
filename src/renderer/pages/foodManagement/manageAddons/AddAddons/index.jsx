import React from 'react';
import { Col, Container } from 'react-bootstrap';
import Heading from 'renderer/components/Heading';
import AddNewAddons from './../../../../components/AddNewAddons';
import Sidebar from './../../../../components/partials/Sidebar';

const AddAddons = () => {
  return (
    <Container fluid className="main-wrapper">
      <div className="flex pos_system">
        <Col lg={2}>
          <Sidebar />
        </Col>

        <Col lg={10}>
          <Heading title="Add Add-ons" />
          <AddNewAddons />
        </Col>
      </div>
    </Container>
  );
};

export default AddAddons;
