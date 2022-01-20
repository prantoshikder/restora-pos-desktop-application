import { Col, Row } from 'antd';
import React from 'react';
import AllItemSalesReport from 'renderer/components/AllItemSalesReport';
import Heading from 'renderer/components/Heading';
import Sidebar from './../../../components/partials/Sidebar';

const ItemSalesReport = () => {
  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <Row>
          <Col lg={3}>
            <Sidebar />
          </Col>
          <Col md={21}>
            <Heading title="Items Sales Report" />
            <AllItemSalesReport />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ItemSalesReport;
