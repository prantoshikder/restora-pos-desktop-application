import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import FoodAvailabilityList from 'renderer/components/FoodAvailabilityList';
import Heading from 'renderer/components/Heading';
import Header from 'renderer/components/partials/Header';
import Sidebar from './../../../../components/partials/Sidebar';
import './FoodAvailability.style.scss';

const FoodAvailability = () => {
  return (
    <Container fluid className="px-0 main-wrapper">
      <Header />
      <Row className="foodManage_system">
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Heading title="Item Food" />
          <FoodAvailabilityList />
        </Col>
      </Row>
    </Container>
  );
};

export default FoodAvailability;
