import { Col, Row } from 'antd';
import React from 'react';
import Heading from 'renderer/components/Heading';
import FoodVariantList from './../../../../components/FoodVariantList';
import Sidebar from './../../../../components/partials/Sidebar';
import './FoodVariant.style.scss';

const FoodVariant = () => {
  return (
    <div className="main_wrapper">
      <div className=" pos_system">
        <Row>
          <Col lg={3}>
            <Sidebar />
          </Col>
          <Col md={21}>
            <Heading title="Food Variant" />
            <FoodVariantList />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FoodVariant;
