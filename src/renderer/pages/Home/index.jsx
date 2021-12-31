import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
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

        <Col lg={10}>
          <h1>Home</h1>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
