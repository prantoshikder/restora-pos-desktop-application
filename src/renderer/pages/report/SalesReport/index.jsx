import React from 'react';
import { Col, Container } from 'react-bootstrap';
import Heading from 'renderer/components/Heading';
import Sidebar from '../../../components/partials/Sidebar';
import AllSalesReport from './../../../components/AllSalesReport';
import './SalesReport.style.scss';

const SalesReport = () => {
  return (
    <Container fluid className="main-wrapper">
      <div className="flex pos_system">
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Heading title="Sales Report" />
          <AllSalesReport />
        </Col>
      </div>
    </Container>
  );
};

export default SalesReport;
