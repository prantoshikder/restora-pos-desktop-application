import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from '../../components/partials/Sidebar/index';
import Footer from './../../components/partials/Footer/index';
import Header from './../../components/partials/Header/index';
import './Home.style.scss';

const Home = () => {
  return (
    <>
      <Container fluid className="p-0">
        <Header />
        <Row className="pos-system">
          <Col lg={2}>
            <Sidebar />
          </Col>

          <Col lg={10}>
            <Footer />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
