import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AllItemSalesReport from 'renderer/components/AllItemSalesReport';
import Heading from 'renderer/components/Heading';
import Header from 'renderer/components/partials/Header';
import Sidebar from './../../../components/partials/Sidebar';

const ItemSalesReport = () => {
  return (
    <Container fluid className="px-0 main-wrapper">
      <Header />
      <Row className="report">
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Heading title="Reports" />
          <AllItemSalesReport />
        </Col>
      </Row>
    </Container>
  );
};

export default ItemSalesReport;
