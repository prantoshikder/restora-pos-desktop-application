import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Heading from 'renderer/components/Heading';
import AddNewFood from './../../../../components/AddNewFood';
import Header from './../../../../components/partials/Header';
import Sidebar from './../../../../components/partials/Sidebar';
import './AddFood.style.scss';

const AddFood = () => {
  return (
    <Container fluid className="px-0 main-wrapper">
      <Header />
      <Row className="foodManage_system">
        <Col lg={2}>
          <Sidebar />
        </Col>

        <Col lg={10}>
          <Heading title="Add Food" />
          <AddNewFood />
        </Col>
      </Row>
    </Container>
  );
};

export default AddFood;
