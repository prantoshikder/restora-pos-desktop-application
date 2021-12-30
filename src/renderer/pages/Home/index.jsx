import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import FoodLists from 'renderer/components/FoodLists';
import Sidebar from '../../components/partials/Sidebar';
import Footer from './../../components/partials/Footer';
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
        <Col md={10} className="mt-3">
          <Row>
            <Col md={8}>
              <Row className="search-food-wrapper">
                <input
                  type="text"
                  placeholder="Search"
                  className="form-control"
                />
              </Row>
              <Row>
                <FoodLists />
              </Row>
            </Col>
            <Col md={4}></Col>
          </Row>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
