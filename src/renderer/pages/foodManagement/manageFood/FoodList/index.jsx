import { Col, Row } from 'antd';
import React from 'react';
import Heading from 'renderer/components/Heading';
import AllFoodList from './../../../../components/AllFoodList';
import Sidebar from './../../../../components/partials/Sidebar';
import './FoodList.style.scss';

const FoodList = () => {
  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <Row>
          <Col lg={3}>
            <Sidebar />
          </Col>

          <Col lg={21}>
            <Heading title="Food List" />
            <AllFoodList />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FoodList;
