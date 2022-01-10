import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Heading from 'renderer/components/Heading';
import Header from '../../../components/partials/Header';
import Sidebar from '../../../components/partials/Sidebar';
import AllSalesReport from './../../../components/AllSalesReport';
import './SalesReport.style.scss';

const SalesReport = () => {
  return (
    <Container fluid className="px-0 main-wrapper">
      <Header />
      <Row className="report">
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Heading title="Reports" />
          <AllSalesReport />
        </Col>
      </Row>
    </Container>
  );
};

export default SalesReport;
