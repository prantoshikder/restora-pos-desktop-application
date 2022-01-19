import React from 'react';
import { Col, Container } from 'react-bootstrap';
import Heading from 'renderer/components/Heading';
import AllCategoryList from './../../../../components/AllCategoryList';
import Sidebar from './../../../../components/partials/Sidebar';
import './CategoryList.style.scss';

const CategoryList = () => {
  return (
    <Container fluid className="main-wrapper">
      <div className="flex pos_system">
        <Col lg={2}>
          <Sidebar />
        </Col>

        <Col lg={10}>
          <Heading title="Item Category" />
          <AllCategoryList />
        </Col>
      </div>
    </Container>
  );
};

export default CategoryList;
