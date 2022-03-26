import { Col, ConfigProvider, Row } from 'antd';
import { getDataFromDatabase } from 'helpers';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cart from 'renderer/components/Cart';
import FoodLists from 'renderer/components/FoodLists';
import Header from 'renderer/components/partials/Header';
import Search from 'renderer/components/Search';
import PosSidebar from './../../components/PosSidebar';
import { ContextData } from './../../contextApi';
import './Home.style.scss';

const Home = ({ settings }) => {
  const { state } = useLocation();
  // Get all food list as an array
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
  window.get_addons_list_for_pos.send('get_addons_list_for_pos', {
    status: true,
  });

  let navigate = useNavigate();
  const { cartItems, setCartItems } = useContext(ContextData);
  const [addonNames, setAddonNames] = useState(null);
  const [addonsList, setAddonsList] = useState(null);
  const [foodNames, setFoodNames] = useState(null);
  const [foodLists, setFoodLists] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState();
  const [isRedirect, setRedirect] = useState(false);

  useEffect(() => {
    Promise.all([
      getDataFromDatabase(
        'get_food_list_pos_response',
        window.get_food_list_pos
      ),
      getDataFromDatabase(
        'variant_lists_response',
        window.variant_lists_channel
      ),
      getDataFromDatabase(
        'get_addons_list_for_pos_response',
        window.get_addons_list_for_pos
      ),
    ])
      .then(([foodNames, variants, addons]) => {
        let newFoods = [];
        foodNames?.map((food, index) => {
          const newAddons = addons.filter((addon) => addon.food_id === food.id);

          const newVariants = variants.filter(
            (variant) => variant.food_id === food.id
          );

          newFoods.push({
            id: food.id,
            food_id: food.date_inserted,
            category_id: food.category_id,
            product_name: food.product_name,
            product_image: food.product_image,
            quantity: 1,
            variants: [...newVariants],
            addons: [...newAddons],
          });
        });

        const foods = newFoods.map((food) => {
          return {
            ...food,
            variants: [
              ...food.variants.map((variant) => ({ ...variant, quantity: 1 })),
            ],
          };
        });

        setFoodLists(foods);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log('Home done');

  return (
    <>
      {/* {isRedirect && navigate('/application_setting')} */}
      <div className="main_wrapper">
        <Header settings={settings} />

        <div className="pos_wrapper">
          <ConfigProvider direction={settings.site_align}>
            <Row className="pos_system">
              <Col lg={5} xl={4} xxl={4}>
                <PosSidebar
                  foodLists={foodLists}
                  setFoodLists={setFoodLists}
                  settings={settings}
                  selectedMenu={selectedMenu}
                  setSelectedMenu={setSelectedMenu}
                />
              </Col>

              <Col lg={19} xl={20} xxl={20}>
                <Row>
                  <Col lg={14} xl={14} xxl={14}>
                    <Row className="search_food_wrapper">
                      <Col lg={18} push={3}>
                        <Search foodLists={foodLists} />
                      </Col>
                    </Row>

                    <div className="foodItems_wrapper">
                      <Row className="foodList_wrapper">
                        <FoodLists
                          setCartItems={setFoodLists}
                          foodLists={foodLists}
                          selectedMenu={selectedMenu}
                          setSelectedMenu={setSelectedMenu}
                        />
                      </Row>
                    </div>
                  </Col>

                  <Col lg={10} xl={10} xxl={10}>
                    <Cart
                      settings={settings}
                      setCartItems={setCartItems}
                      cartItems={cartItems}
                      state={state}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </ConfigProvider>
        </div>
      </div>
    </>
  );
};

export default Home;
