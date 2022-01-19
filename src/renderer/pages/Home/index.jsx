import { ConfigProvider, Row } from 'antd';
import React, { useState } from 'react';
import { Col, Container } from 'react-bootstrap';
import Cart from 'renderer/components/Cart';
import FoodLists from 'renderer/components/FoodLists';
import Header from './../../components/partials/Header';
import PosSidebar from './../../components/PosSidebar';
import './Home.style.scss';

const Home = ({ direction }) => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <div className="main-wrapper">
      <Header direction={direction} />

      <Container fluid className="pos-wrapper">
        <ConfigProvider direction={direction}>
          <Row className="pos-system">
            <Col lg={2}>
              <PosSidebar direction={direction} />
            </Col>

            <Col lg={10}>
              <Row>
                <Col lg={7}>
                  <Row className="search-food-wrapper justify-content-md-center">
                    <Col lg={8}>
                      <input
                        type="text"
                        placeholder="Search"
                        className="form-control"
                      />
                    </Col>
                  </Row>
                  <Row className="foodList-wrapper">
                    <FoodLists
                      setCartItems={setCartItems}
                      cartItems={cartItems}
                    />
                  </Row>
                </Col>

                <Col lg={5}>
                  <Cart setCartItems={setCartItems} cartItems={cartItems} />
                </Col>
              </Row>
            </Col>
          </Row>
        </ConfigProvider>
      </Container>
    </div>
  );
};

export default Home;
