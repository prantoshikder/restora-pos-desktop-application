import { Col, Row } from 'antd';
import React from 'react';
import AllAddonsAssignList from 'renderer/components/AllAddonsAssignList';
import Heading from 'renderer/components/Heading';
import Sidebar from './../../../../components/partials/Sidebar';
import './AddonsAssignList.style.scss';

const AddonsAssignList = () => {
  return (
    <div className="main_wrapper">
      <div className=" pos_system">
        <Row>
          <Col lg={3}>
            <Sidebar />
          </Col>

          <Col lg={21}>
            <Heading title="Add-ons Assign List" />
            <AllAddonsAssignList />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AddonsAssignList;
