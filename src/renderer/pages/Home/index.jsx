import { CloseOutlined } from '@ant-design/icons';
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

  const { cartItems, setCartItems } = useContext(ContextData);
  const [addonNames, setAddonNames] = useState(null);
  const [addonsList, setAddonsList] = useState(null);
  const [foodNames, setFoodNames] = useState(null);
  const [foodLists, setFoodLists] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedMenu, setSelectedMenu] = useState();
  const [isLoading, setLoading] = useState(false);

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

  // Search Food Items
  const handleSearchProducts = () => {
    setLoading(true);

    if (searchValue?.length > 1) {
      const searchItems = foodLists.filter((foodItems) =>
        foodItems.product_name
          .toLowerCase()
          .match(new RegExp(searchValue.toLowerCase(), 'g'))
      );

      if (searchItems?.length > 0) {
        setSearchResults(searchItems);
        setLoading(false);
      }
    } else {
      closeModal();
      setLoading(false);
    }
  };

  function closeModal() {
    setSearchResults('');
    setSearchValue('');
  }

  const isEmpty = !searchResults || searchResults.length === 0;

  const expandContainer = () => {
    setIsExpanded(true);
  };

  const handleAddToCartItem = (foodCartItem) => {
    if (foodCartItem?.variants?.length > 1) {
      setIsExpanded(false);
      closeModal();
      setCartItems(foodCartItem);
    } else {
      setIsExpanded(false);
      closeModal();
      setCartItems(foodCartItem);
    }
  };

  return (
    <div className="main_wrapper">
      <Header settings={settings} />

      <div className="pos_wrapper">
        <ConfigProvider direction={settings.site_align}>
          <Row className="pos_system">
            <Col lg={4}>
              <PosSidebar
                foodLists={foodLists}
                setFoodLists={setFoodLists}
                settings={settings}
                selectedMenu={selectedMenu}
                setSelectedMenu={setSelectedMenu}
              />
            </Col>

            <Col lg={20}>
              <Row>
                <Col lg={14}>
                  <Row className="search_food_wrapper">
                    <Col lg={18} push={3}>
                      <Input
                        type="text"
                        placeholder="Search"
                        size="large"
                        onFocus={expandContainer}
                        value={searchValue}
                        onChange={(e) => {
                          handleSearchProducts();
                          setSearchValue(e.target.value);
                        }}
                      />

                      {isExpanded && (
                        <div className="searchResultWrapper">
                          <CloseOutlined
                            onClick={() => {
                              setIsExpanded(false);
                              closeModal();
                            }}
                          />

                          <div className="">
                            {isLoading && (
                              <div>
                                <p>Loading...</p>
                              </div>
                            )}

                            {!isLoading && isEmpty && (
                              <div>
                                <p>Start typing to search</p>
                              </div>
                            )}

                            {searchResults?.length > 0 && (
                              <>
                                {searchResults?.map((item) => (
                                  <div
                                    key={item?.id}
                                    className="flex content_between item_center"
                                    style={{
                                      marginTop: '10px',
                                      cursor: 'pointer',
                                      backgroundColor: '#f4f4f4',
                                      padding: '0.5rem 2rem',
                                    }}
                                    onClick={() => handleAddToCartItem(item)}
                                  >
                                    <p>{item?.product_name}</p>

                                    <img
                                      src={item?.product_image}
                                      height="50px"
                                      width="50px"
                                      style={{
                                        float: 'right',
                                        width: '50px',
                                        height: '50px',
                                        objectFit: 'cover',
                                      }}
                                      alt=""
                                    />
                                  </div>
                                ))}
                              </>
                            )}
                          </div>
                        </div>
                      )}
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
