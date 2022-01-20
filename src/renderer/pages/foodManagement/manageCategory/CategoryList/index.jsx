import { Col, Row } from 'antd';
import React from 'react';
import Heading from 'renderer/components/Heading';
import AllCategoryList from './../../../../components/AllCategoryList';
import Sidebar from './../../../../components/partials/Sidebar';
import './CategoryList.style.scss';

const CategoryList = () => {
  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <Row>
          <Col lg={3}>
            <Sidebar />
          </Col>

          <Col lg={21}>
            <Heading title="Category List" />
            <AllCategoryList />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CategoryList;
