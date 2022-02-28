import {
  Button,
  Checkbox,
  Col,
  Image,
  InputNumber,
  message,
  Modal,
  Row,
  Space,
  Typography,
} from 'antd';
import { useContext, useState } from 'react';
import { ContextData } from './../../contextApi';
import './food.item.styles.scss';

const { Title } = Typography;

const FoodItem = ({ item }) => {
  const [openModal, setOpenModal] = useState(false);
  const [addonsAdd, setAddonsAdd] = useState(null);
  const [foodVariantName, setFoodVariantName] = useState('Regular');
  const [foodQuantity, setFoodQuantity] = useState(0);
  const [variantPrice, setVariantPrice] = useState(0);
  const [variantFixedPrice, setVariantFixedPrice] = useState(0);
  const [foodAddonsOrVariant, setFoodAddonsOrVariant] = useState({});

  const [addonsQuantity, setAddonsQuantity] = useState(0);
  const [addonsPrice, setAddonsPrice] = useState(0);
  const [addonsItemForCart, setAddonsItemForCart] = useState({});

  const { cartItems, setCartItems } = useContext(ContextData);

  // Onclick opens a modal
  const handleFoodItem = (e, item) => {
    window.get_addons_and_variant.send('get_addons_and_variant', item.id);

    window.get_addons_and_variant.once(
      'get_addons_and_variant_response',
      (args) => {
        // console.log('******************args', args);
        setFoodAddonsOrVariant(args);
      }
    );

    if (item?.variants?.length > 1) {
      setVariantPrice(item.variants[0].price);
      setVariantFixedPrice(item.variants[0].price);
      setAddonsAdd(item);
      setOpenModal(true);
    } else if (
      item?.addons?.length > 0 ||
      (Array.isArray(item?.addons) && item?.addons?.length > 0)
    ) {
      setVariantPrice(item.variants[0].price);
      setVariantFixedPrice(item.variants[0].price);
      setAddonsAdd(item);
      setOpenModal(true);
    } else {
      const isCartItemExist = cartItems.find(
        (item) => item.foodVariant === foodVariantName
      );

      if (!isCartItemExist) {
        const cartItem = {
          id: item.id,
          isSelected: true,
          product_name: item.product_name,
          foodVariant: foodVariantName,
          price: variantFixedPrice,
          totalPrice: variantPrice,
          quantity: foodQuantity,
        };

        e.currentTarget.style.border = '2px solid #297600';

        setCartItems([...cartItems, cartItem]);
      } else {
        if (item.id) {
          message.info({
            content: 'Item already added',
            duration: 1,
            style: {
              marginTop: '5vh',
              float: 'right',
            },
          });
        }
      }
    }
  };

  const handleAddToCart = (e, item) => {
    const isCartItemExist = cartItems.find(
      (item) => item.foodVariant === foodVariantName
    );

    if (!isCartItemExist) {
      const cartItem = {
        id: item.id,
        isSelected: true,
        product_name: item.product_name,
        foodVariant: foodVariantName,
        price: variantFixedPrice,
        totalPrice: variantPrice,
        quantity: foodQuantity,
      };

      setCartItems([...cartItems, cartItem]);
      setOpenModal(false);
    } else {
      if (item.id) {
        message.info({
          content: `${foodVariantName} variant has already been added.`,
          duration: 1,
          style: {
            marginTop: '5vh',
            float: 'right',
          },
        });
      }
    }
  };

  const handleMultipleItemAdd = (e, item) => {
    const isCartItemExist = cartItems.find(
      (item) => item.foodVariant === foodVariantName
    );

    console.log('addon', addonsPrice, addonsQuantity);

    if (!isCartItemExist) {
      const cartItem = {
        id: item.id,
        isSelected: true,
        product_name: item.product_name,
        foodVariant: foodVariantName,
        price: variantFixedPrice,
        totalPrice: variantPrice,
        quantity: foodQuantity,
      };

      setCartItems([...cartItems, cartItem]);
    } else {
      if (item.id) {
        message.info({
          content: `${foodVariantName} variant has already been added`,
          duration: 1,
          style: {
            marginTop: '5vh',
            float: 'right',
          },
        });
      }
    }
  };

  function handleAddonsCheck(e, addonItem) {
    console.log(`checked = ${e.target.checked}`);

    if (e.target.checked) {
      console.log('addonItem', addonItem);
    } else {
    }
  }

  const handleVariantPrice = (variant) => {
    const variantObj = JSON.parse(variant);
    const fixedPrice = variantObj.price;
    setVariantFixedPrice(fixedPrice);
    setFoodVariantName(variantObj.variant_name);
  };

  // TODO: Quantity value & price changes
  const calculateVariantQuantity = (quantity) => {
    setFoodQuantity(quantity);
    setVariantPrice(variantFixedPrice * quantity);
  };

  const handleAddons = (quantity, addonsItem) => {
    setAddonsQuantity(quantity);
    setAddonsPrice(quantity * addonsItem.price);
    setAddonsItemForCart(addonsItem);

    const totalPrice = quantity * addonsItem.price;

    const updateItemPrice = addonsAdd?.addons.find(
      (item) => item.add_on_id === addonsItem.add_on_id
    );

    const index = addonsAdd?.addons.findIndex(
      (item) => item === updateItemPrice
    );

    const newAddons = [
      ...addonsAdd?.addons.slice(0, index),
      { ...updateItemPrice, total_price: totalPrice },
      ...addonsAdd?.addons.slice(index + 1),
    ];

    setAddonsAdd((prevState) => ({
      ...prevState,
      addons: newAddons,
    }));
  };

  return (
    <>
      <Col lg={4}>
        <div className="food_card" onClick={(e) => handleFoodItem(e, item)}>
          <div className="food_image">
            {item?.product_image ? (
              <Image
                variant="top"
                src={item.product_image}
                alt={item.product_name}
                preview={false}
                fallback={
                  'https://restorapos.com/newrpos/application/modules/itemmanage/assets/images/small/0a00c70bfef9545def90b28b58b79675.jpg'
                }
              />
            ) : (
              <div style={{ backgroundColor: '#ddd', height: '90px' }}>
                <Title
                  style={{
                    marginBottom: '0',
                    padding: '2rem 0.5rem',
                    color: '#818181',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  level={5}
                >
                  {item.product_name}
                </Title>
                {/* <p style={{ marginBottom: '0', padding: '2rem 0.5rem' }}>
                  {item.product_name}
                </p> */}
                {/* <img variant="top" src={foodPlaceholder} /> */}
              </div>
            )}
          </div>

          <div className="card_body">
            <p>{item.product_name}</p>
          </div>
        </div>
      </Col>

      <Modal
        title="Add food variant or addons"
        visible={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        footer={null}
        width={650}
      >
        <Row>
          <Col lg={24}>
            {addonsAdd?.variants?.length > 0 && (
              <div className="select_item">
                <table>
                  <thead>
                    <tr>
                      <th>Item Information</th>
                      <th>Variant</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>{addonsAdd?.product_name}</td>
                      <td>
                        <select
                          name=""
                          onChange={(e) => handleVariantPrice(e.target.value)}
                        >
                          {addonsAdd?.variants?.map((addonItem, index) => (
                            <option
                              key={addonItem.id}
                              value={JSON.stringify(addonItem)}
                            >
                              {addonItem?.variant_name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <InputNumber
                          min={1}
                          max={100}
                          defaultValue={addonsAdd?.quantity}
                          bordered={true}
                          onChange={calculateVariantQuantity}
                        />
                      </td>
                      {/* <td>{addonsAdd?.price}</td> */}
                      <td>{variantPrice}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {addonsAdd?.addons?.length > 0 && (
              <div className="select_item" style={{ marginTop: '1rem' }}>
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Add-ons Name</th>
                      <th>Add-ons Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>

                  <tbody>
                    {addonsAdd?.addons?.map((addonsItem) => (
                      <tr key={addonsItem?.id}>
                        <td>
                          <Checkbox
                            onChange={(e) => handleAddonsCheck(e, addonsItem)}
                          />
                        </td>
                        <td>{addonsItem?.add_on_name}</td>
                        <td>
                          <InputNumber
                            min={1}
                            max={100}
                            defaultValue={addonsAdd?.quantity}
                            bordered={true}
                            onChange={(quantity) =>
                              handleAddons(quantity, addonsItem)
                            }
                          />
                        </td>
                        <td>{addonsItem?.total_price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <Space className="group_addToCart_btn flex ">
              <Button type="primary" onClick={(e) => handleAddToCart(e, item)}>
                Add to Cart
              </Button>
              <Button
                type="primary"
                onClick={(e) => handleMultipleItemAdd(e, item)}
              >
                Add Multiple Variant
              </Button>
            </Space>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default FoodItem;
