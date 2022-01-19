import React from 'react';
import { Col, Container } from 'react-bootstrap';
import FoodAvailabilityList from 'renderer/components/FoodAvailabilityList';
import Heading from 'renderer/components/Heading';
import Sidebar from './../../../../components/partials/Sidebar';
import './FoodAvailability.style.scss';

const FoodAvailability = () => {
  return (
    <Container fluid className="main-wrapper">
      <div className="flex pos_system">
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Heading title="Food Availability" />
          <FoodAvailabilityList />
        </Col>
      </div>
    </Container>
  );
};

export default FoodAvailability;
