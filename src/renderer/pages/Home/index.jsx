import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from '../../components/partials/Sidebar';
import Footer from './../../components/partials/Footer';
import Header from './../../components/partials/Header';
import './Home.style.scss';
import FoodLists from 'renderer/components/FoodLists';


const Home = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <h1>Categories</h1>
        </Col>
        <Col md={9}>
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
