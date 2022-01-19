import React from 'react';
import { Col, Container } from 'react-bootstrap';
import Heading from 'renderer/components/Heading';
import AddNewFood from './../../../../components/AddNewFood';
import Sidebar from './../../../../components/partials/Sidebar';
import './AddFood.style.scss';

const AddFood = () => {
  return (
    <Container fluid className="main-wrapper">
      <div className="flex pos_system">
        <Col lg={2}>
          <Sidebar />
        </Col>

        <Col lg={10}>
          <Heading title="Add Food" />
          <AddNewFood />
        </Col>
      </div>
    </Container>
  );
};

export default AddFood;
