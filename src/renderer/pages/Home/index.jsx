import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Cart from 'renderer/components/Cart';
import FoodLists from 'renderer/components/FoodLists';
import Layout from 'renderer/components/Layout';
import Sidebar from '../../components/partials/Sidebar';
import Header from './../../components/partials/Header';
import './Home.style.scss';

const Home = () => {
  return (
    <Layout>
      <Container fluid className="px-0 main-wrapper">
        <Header />
        <Row className="pos-system">
          <Col lg={2}>
            <Sidebar />
          </Col>
          <Col md={10} className="mt-3">
            <Row>
              <Col md={7}>
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
              <Col md={5}>
                <Cart />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Home;
