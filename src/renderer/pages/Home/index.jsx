import { Col, ConfigProvider, Input, Row } from 'antd';
import { useContext } from 'react';
import Cart from 'renderer/components/Cart';
import FoodLists from 'renderer/components/FoodLists';
import Header from 'renderer/components/partials/Header';
import PosSidebar from './../../components/PosSidebar';
import { ContextData } from './../../contextApi';
import './Home.style.scss';

const Home = ({ settings }) => {
  // const [cartItems, setCartItems] = useState([]);

  const { cartItems, setCartItems } = useContext(ContextData);

  return (
    <div className="main_wrapper">
      <Header settings={settings} />

      <div className="pos_wrapper">
        <ConfigProvider direction={settings.direction}>
          <Row className="pos_system">
            <Col lg={4}>
              <PosSidebar settings={settings} />
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
                  <Cart
                    settings={settings}
                    setCartItems={setCartItems}
                    cartItems={cartItems}
                  />
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
