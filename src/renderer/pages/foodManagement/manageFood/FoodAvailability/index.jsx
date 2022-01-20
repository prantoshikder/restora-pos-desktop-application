import { Col, Row } from 'antd';
import React from 'react';
import FoodAvailabilityList from 'renderer/components/FoodAvailabilityList';
import Heading from 'renderer/components/Heading';
import Sidebar from './../../../../components/partials/Sidebar';
import './FoodAvailability.style.scss';

const FoodAvailability = () => {
  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <Row>
          <Col lg={3}>
            <Sidebar />
          </Col>
          <Col md={21}>
            <Heading title="Food Availability" />
            <FoodAvailabilityList />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FoodAvailability;
