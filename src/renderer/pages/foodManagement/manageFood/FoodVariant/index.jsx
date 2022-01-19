import React from 'react';
import { Col, Container } from 'react-bootstrap';
import Heading from 'renderer/components/Heading';
import FoodVariantList from './../../../../components/FoodVariantList';
import Sidebar from './../../../../components/partials/Sidebar';
import './FoodVariant.style.scss';

const FoodVariant = () => {
  return (
    <Container fluid className="main-wrapper">
      <div className="flex pos_system">
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Heading title="Food Variant" />
          <FoodVariantList />
        </Col>
      </div>
    </Container>
  );
};

export default FoodVariant;
