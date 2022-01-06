import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AllAddonsAssignList from 'renderer/components/AllAddonsAssignList';
import Heading from 'renderer/components/Heading';
import Header from 'renderer/components/partials/Header';
import Sidebar from './../../../../components/partials/Sidebar';
import './AddonsAssignList.style.scss';

const AddonsAssignList = () => {
  return (
    <Container fluid className="p-0">
      <Header />
      <Row className="foodManage_system">
        <Col lg={2}>
          <Sidebar />
        </Col>

        <Col lg={10}>
          <Heading title="Menu Addons" />
          <AllAddonsAssignList />
        </Col>
      </Row>
    </Container>
  );
};

export default AddonsAssignList;
