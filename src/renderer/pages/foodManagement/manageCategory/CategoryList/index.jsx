import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Heading from 'renderer/components/Heading';
import AllCategoryList from './../../../../components/AllCategoryList';
import Header from './../../../../components/partials/Header';
import Sidebar from './../../../../components/partials/Sidebar';
import './CategoryList.style.scss';

const CategoryList = () => {
  return (
    <Container fluid className="p-0">
      <Header />
      <Row className="foodManage_system">
        <Col lg={2}>
          <Sidebar />
        </Col>

        <Col lg={10}>
          <Heading title="Item Category" />
          <AllCategoryList />
        </Col>
      </Row>
    </Container>
  );
};

export default CategoryList;
