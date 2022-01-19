import React from 'react';
import { Col, Container } from 'react-bootstrap';
import Heading from 'renderer/components/Heading';
import AddNewCategory from './../../../../components/AddNewCategory';
import Sidebar from './../../../../components/partials/Sidebar';
import './AddCategory.style.scss';

const AddCategory = () => {
  return (
    <Container fluid className="main-wrapper">
      <div className="flex pos_system">
        <Col lg={2}>
          <Sidebar />
        </Col>

        <Col lg={10}>
          <Heading title="Item Category" />
          <AddNewCategory />
        </Col>
      </div>
    </Container>
  );
};

export default AddCategory;
