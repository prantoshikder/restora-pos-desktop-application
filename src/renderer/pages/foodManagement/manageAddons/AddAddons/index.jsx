import { Col, Row } from 'antd';
import React from 'react';
import Heading from 'renderer/components/Heading';
import AddNewAddons from './../../../../components/AddNewAddons';
import Sidebar from './../../../../components/partials/Sidebar';

const AddAddons = () => {
  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <Row>
          <Col lg={3}>
            <Sidebar />
          </Col>

          <Col lg={21}>
            <Heading title="Add Add-ons" />
            <AddNewAddons />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AddAddons;
