import { Col, ConfigProvider, Input, Row } from 'antd';
import { getDataFromDatabase } from 'helpers';
import { useContext, useEffect, useState } from 'react';
import Cart from 'renderer/components/Cart';
import FoodLists from 'renderer/components/FoodLists';
import Header from 'renderer/components/partials/Header';
import PosSidebar from './../../components/PosSidebar';
import { ContextData } from './../../contextApi';
import './Home.style.scss';

const Home = ({ settings }) => {
  window.get_food_list_pos.send('get_food_list_pos', {
    status: true,
  });

  // Get all food variant lists as an array
  window.variant_lists_channel.send('variant_lists_channel', { status: true });

  // Food lists (Only ID)
  window.get_food_name_lists_channel.send('get_food_name_lists_channel', {
    status: true,
  });

  // Addons lists (Only ID)
  window.get_addons_name_list.send('get_addons_name_list', { status: true });

  const [foodLists, setFoodLists] = useState([]);
  const { cartItems, setCartItems } = useContext(ContextData);
  const [addonNames, setAddonNames] = useState(null);
  const [foodNames, setFoodNames] = useState(null);

  useEffect(() => {
    getDataFromDatabase(
      'variant_lists_response',
      window.variant_lists_channel
    ).then((data) => {
      console.log('variant data', data);
    });

    // window.variant_lists_channel.once('variant_lists_response', (args) => {
    //   setFoodVariantList(args);
    // });

    getDataFromDatabase(
      'get_food_list_pos_response',
      window.get_food_list_pos
    ).then((data) => {
      console.log('data', data);
      setFoodLists(data);
    });
  }, []);

  useEffect(() => {
    Promise.all([
      getDataFromDatabase(
        'get_addons_name_list_response',
        window.get_addons_name_list
      ),
      getDataFromDatabase(
        'get_food_name_lists_channel_response',
        window.get_food_name_lists_channel
      ),
    ])
      .then(([addonNames, foodNames]) => {
        setAddonNames(addonNames);
        setFoodNames(foodNames);

        let newAddonNames = [];

        addonsList?.map((addon, index) => {
          const newAddons = addonNames.find(
            (addonName) => addonName.add_on_id === addon.add_on_id
          );

          const newFoodItems = foodNames.find(
            (foodItem) => foodItem.id === addon.menu_id
          );

          newAddonNames.push({
            id: addon.id,
            addonsName: newAddons.add_on_name,
            foodName: newFoodItems.product_name,
          });
        });

        console.log('newAddonNames', newAddonNames);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="main_wrapper">
      <Header settings={settings} />

      <div className="pos_wrapper">
        <ConfigProvider direction={settings.site_align}>
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
                        setCartItems={setFoodLists}
                        foodLists={foodLists}
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
