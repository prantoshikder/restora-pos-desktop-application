import React from 'react';
import { Col, Container } from 'react-bootstrap';
import AllItemSalesReport from 'renderer/components/AllItemSalesReport';
import Heading from 'renderer/components/Heading';
import Sidebar from './../../../components/partials/Sidebar';

const ItemSalesReport = () => {
  return (
    <Container fluid className="main-wrapper">
      <div className="flex pos_system">
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Heading title="Items Sales Report" />
          <AllItemSalesReport />
        </Col>
      </div>
    </Container>
  );
};

export default ItemSalesReport;
