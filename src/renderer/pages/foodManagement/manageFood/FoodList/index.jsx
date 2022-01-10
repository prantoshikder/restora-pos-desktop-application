import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Heading from 'renderer/components/Heading';
import AllFoodList from './../../../../components/AllFoodList';
import Header from './../../../../components/partials/Header';
import Sidebar from './../../../../components/partials/Sidebar';
import './FoodList.style.scss';

const FoodList = () => {
  return (
    <Container fluid className="px-0 main-wrapper">
      <Header />
      <Row className="foodManage_system">
        <Col lg={2}>
          <Sidebar />
        </Col>

        <Col lg={10}>
          <Heading title="Item Food" />
          <AllFoodList />
        </Col>
      </Row>
    </Container>
  );
};

export default FoodList;
