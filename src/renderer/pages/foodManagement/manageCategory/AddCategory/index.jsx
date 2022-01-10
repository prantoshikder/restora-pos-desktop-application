import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Heading from 'renderer/components/Heading';
import AddNewCategory from './../../../../components/AddNewCategory';
import Header from './../../../../components/partials/Header';
import Sidebar from './../../../../components/partials/Sidebar';
import './AddCategory.style.scss';

const AddCategory = () => {
  return (
    <Container fluid className="px-0 main-wrapper">
      <Header />
      <Row className="foodManage_system">
        <Col lg={2}>
          <Sidebar />
        </Col>

        <Col lg={10}>
          <Heading title="Item Category" />
          <AddNewCategory />
        </Col>
      </Row>
    </Container>
  );
};

export default AddCategory;
