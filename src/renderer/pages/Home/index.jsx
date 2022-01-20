import { Col, ConfigProvider, Input, Row } from 'antd';
import React, { useState } from 'react';
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

      <div className="pos-wrapper">
        <ConfigProvider direction={direction}>
          <Row className="pos-system">
            <Col span={4}>
              <PosSidebar direction={direction} />
            </Col>

            <Col span={20}>
              <Row>
                <Col span={15}>
                  <Row className="search-food-wrapper justify-content-md-center">
                    <Col span={18} push={3}>
                      <Input type="text" placeholder="Search" size="large" />
                    </Col>
                  </Row>
                  <Row gutter={30} className="foodList-wrapper">
                    <FoodLists
                      setCartItems={setCartItems}
                      cartItems={cartItems}
                    />
                  </Row>
                </Col>

                <Col span={9}>
                  <Cart setCartItems={setCartItems} cartItems={cartItems} />
                </Col>
              </Row>
            </Col>
          </Row>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default Home;
