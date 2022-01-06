import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Heading from 'renderer/components/Heading';
import Header from 'renderer/components/partials/Header';
import Sidebar from './../../../components/partials/Sidebar';

const ItemSalesReport = () => {
  return (
    <Container fluid className="p-0">
      <Header />
      <Row className="report">
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Heading title="Reports" />
          <h1>Item Sales Report</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default ItemSalesReport;
