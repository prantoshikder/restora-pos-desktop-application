import React from 'react';
import { Col, Container } from 'react-bootstrap';
import Heading from 'renderer/components/Heading';
import AllFoodList from './../../../../components/AllFoodList';
import Sidebar from './../../../../components/partials/Sidebar';
import './FoodList.style.scss';

const FoodList = () => {
  return (
    <Container fluid className="main-wrapper">
      <div className="flex pos_system">
        <Col lg={2}>
          <Sidebar />
        </Col>

        <Col lg={10}>
          <Heading title="Item Food" />
          <AllFoodList />
        </Col>
      </div>
    </Container>
  );
};

export default FoodList;
