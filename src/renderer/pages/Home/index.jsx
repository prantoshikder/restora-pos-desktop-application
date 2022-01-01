import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import FoodLists from 'renderer/components/FoodLists';
import Sidebar from '../../components/partials/Sidebar';
import Header from './../../components/partials/Header';
import './Home.style.scss';

const Home = () => {
  return (
    <Container fluid className="p-0">
      <Header />
      <Row className="pos-system">
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <h1>Food list</h1>
          <Row>
            <Col md={8}>
              <Row>
                <input type="text" placeholder="Search" />
              </Row>
              <Row>
                <FoodLists />
              </Row>
            </Col>
            <Col md={4}>
              <h2>Grand Total</h2>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
