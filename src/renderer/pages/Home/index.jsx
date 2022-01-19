import { ConfigProvider } from 'antd';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Cart from 'renderer/components/Cart';
import FoodLists from 'renderer/components/FoodLists';
import Header from './../../components/partials/Header';
import PosSidebar from './../../components/PosSidebar';
import './Home.style.scss';

const Home = () => {
  const [cartItems, setCartItems] = useState([]);
  const [direction, setDirection] = useState('rtl');

  return (
    <div className="main-wrapper">
      <ConfigProvider direction={direction}>
        <Header />
        <Container fluid className="pos-wrapper">
          <Row className="pos-system">
            <Col lg={2}>
              <PosSidebar />
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
                      setSelectedItem={setSelectedItem}
                      selectedItem={selectedItem}
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
      </Container>
    </div>
  );
};

export default Home;
