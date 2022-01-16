import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Cart from 'renderer/components/Cart';
import FoodLists from 'renderer/components/FoodLists';
import Header from './../../components/partials/Header';
import PosSidebar from './../../components/PosSidebar';
import './Home.style.scss';

const Home = () => {
  return (
    <div fluid className="main-wrapper">
      <Container fluid className="main-wrapper">
        <Header />
        <Row className="pos-system">
          <Col lg={2}>
            {/* <Sidebar /> */}
            <PosSidebar />
          </Col>
          <Col lg={10} className="mt-3">
            <Row>
              <Col lg={7}>
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
              <Col lg={5}>
                <Cart />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
