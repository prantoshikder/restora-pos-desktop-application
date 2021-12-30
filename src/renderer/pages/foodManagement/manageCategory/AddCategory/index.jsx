import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AddNewCategory from './../../../../components/AddNewCategory';
import Footer from './../../../../components/partials/Footer';
import Header from './../../../../components/partials/Header';
import Sidebar from './../../../../components/partials/Sidebar';
import './AddCategory.style.scss';

const AddCategory = () => {
  return (
    <div>
      <Container fluid className="p-0">
        <Header />
        <Row className="foodManage-system">
          <Col lg={2}>
            <Sidebar />
          </Col>

          <Col lg={10}>
            <h1>Add Category</h1>
            <AddNewCategory />
            <Footer />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddCategory;
