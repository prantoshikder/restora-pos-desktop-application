import { Col, ConfigProvider, Input, Row } from 'antd';
import React from 'react';
import Cart from 'renderer/components/Cart';
import FoodLists from 'renderer/components/FoodLists';
import Header from 'renderer/components/partials/Header';
import PosSidebar from './../../components/PosSidebar';
import './Home.style.scss';

const Home = ({ direction }) => {
  // const [cartItems, setCartItems] = useState([]);

  return (
    <div className="main_wrapper">
      <Header direction={direction} />

      <div className="pos_wrapper">
        <ConfigProvider direction={direction}>
          <Row className="pos_system">
            <Col lg={4}>
              <PosSidebar direction={direction} />
            </Col>

            <Col lg={20}>
              <Row>
                <Col lg={14}>
                  <Row className="search_food_wrapper">
                    <Col lg={18} push={3}>
                      <Input type="text" placeholder="Search" size="large" />
                    </Col>
                  </Row>

                  <div className="foodItems_wrapper">
                    <Row className="foodList_wrapper">
                      <FoodLists />
                    </Row>
                  </div>
                </Col>

                <Col lg={10}>
                  <Cart />
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
