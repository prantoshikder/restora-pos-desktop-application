import { Col, Input, Row } from 'antd';
import React, { useState } from 'react';
import Cart from 'renderer/components/Cart';
import FoodLists from 'renderer/components/FoodLists';
// import Header from './../../components/partials/Header';
import PosSidebar from './../../components/PosSidebar';
import './Home.style.scss';

const Home = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <div className="main_wrapper">
      {/* <Header /> */}
      <div className="pos_wrapper">
        <div className="pos_system">
          <Row gutter={25}>
            <Col lg={4}>
              <PosSidebar />
            </Col>

            <Col lg={20}>
              <Row gutter={20}>
                <Col lg={14}>
                  <Row className="search-food-wrapper justify-center">
                    <Col lg={24}>
                      <Input
                        type="text"
                        placeholder="Search"
                        className="form-control"
                      />
                    </Col>
                  </Row>
                  <Row gutter={25} className="foodList-wrapper">
                    <FoodLists
                      setCartItems={setCartItems}
                      cartItems={cartItems}
                    />
                  </Row>
                </Col>

                <Col lg={10}>
                  <Cart setCartItems={setCartItems} cartItems={cartItems} />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Home;
