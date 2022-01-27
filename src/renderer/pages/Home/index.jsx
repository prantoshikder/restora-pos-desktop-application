import { Col, ConfigProvider, Input, Row } from 'antd';
import React, { useContext } from 'react';
import Cart from 'renderer/components/Cart';
import FoodLists from 'renderer/components/FoodLists';
import Header from 'renderer/components/partials/Header';
import PosSidebar from './../../components/PosSidebar';
import { ContextData } from './../../contextApi';
import './Home.style.scss';

const Home = ({ direction }) => {
  // const [cartItems, setCartItems] = useState([]);

  const { cartItems, setCartItems } = useContext(ContextData);

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
                      <FoodLists
                        setCartItems={setCartItems}
                        cartItems={cartItems}
                      />
                    </Row>
                  </div>
                </Col>

                <Col lg={10}>
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
