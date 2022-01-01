import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AddNewCategory from './../../../../components/AddNewCategory';
import Header from './../../../../components/partials/Header';
import Sidebar from './../../../../components/partials/Sidebar';
import './AddCategory.style.scss';

const AddCategory = () => {
  return (
    <Container fluid className="p-0">
      <Header />
      <Row className="foodManage-system">
        <Col lg={2}>
          <Sidebar />
        </Col>

        <Col lg={10}>
          <h1>Add Category</h1>
          <AddNewCategory />
        </Col>
      </Row>
    </Container>
  );
};

export default AddCategory;
