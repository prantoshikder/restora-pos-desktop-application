import React from 'react';
import { Col, Container } from 'react-bootstrap';
import Heading from 'renderer/components/Heading';
import Header from 'renderer/components/partials/Header';
import MenuTypeList from './../../../../components/MenuTypeList';
import Sidebar from './../../../../components/partials/Sidebar';
import './MenuType.style.scss';

const MenuType = () => {
  return (
    <Container fluid className="main-wrapper">
      <Header />
      <div className="flex pos_system">
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Heading title="Item Food" />
          <MenuTypeList />
        </Col>
      </div>
    </Container>
  );
};

export default MenuType;
