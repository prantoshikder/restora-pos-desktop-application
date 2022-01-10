import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Heading from 'renderer/components/Heading';
import Header from 'renderer/components/partials/Header';
import MenuTypeList from './../../../../components/MenuTypeList';
import Sidebar from './../../../../components/partials/Sidebar';
import './MenuType.style.scss';

const MenuType = () => {
  return (
    <Container fluid className="px-0 main-wrapper">
      <Header />
      <Row className="foodManage_system">
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Heading title="Item Food" />
          <MenuTypeList />
        </Col>
      </Row>
    </Container>
  );
};

export default MenuType;
