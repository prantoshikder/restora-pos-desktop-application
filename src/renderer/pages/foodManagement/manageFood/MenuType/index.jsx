import { Col, Row } from 'antd';
import React from 'react';
import Heading from 'renderer/components/Heading';
import MenuTypeList from './../../../../components/MenuTypeList';
import Sidebar from './../../../../components/partials/Sidebar';
import './MenuType.style.scss';

const MenuType = () => {
  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <Row>
          <Col lg={3}>
            <Sidebar />
          </Col>
          <Col md={21}>
            <Heading title="Menu Type" />
            <MenuTypeList />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MenuType;
