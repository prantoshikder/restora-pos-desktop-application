import React from 'react';
import { Col, Container } from 'react-bootstrap';
import AllAddonsAssignList from 'renderer/components/AllAddonsAssignList';
import Heading from 'renderer/components/Heading';
import Sidebar from './../../../../components/partials/Sidebar';
import './AddonsAssignList.style.scss';

const AddonsAssignList = () => {
  return (
    <Container fluid className="main-wrapper">
      <div className="flex pos_system">
        <Col lg={2}>
          <Sidebar />
        </Col>

        <Col lg={10}>
          <Heading title="Add-ons Assign List" />
          <AllAddonsAssignList />
        </Col>
      </div>
    </Container>
  );
};

export default AddonsAssignList;
