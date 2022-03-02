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
  const [foodQuantity, setFoodQuantity] = useState(1);
  const [variantPrice, setVariantPrice] = useState(0);
  const [variantFixedPrice, setVariantFixedPrice] = useState(0);
  const [foodVariantName, setFoodVariantName] = useState('Regular');

  // Only for addons
  const [addonForCartItem, setAddonForCartItem] = useState([]);
  const [addonsQuantity, setAddonsQuantity] = useState(1);
  const [addonsPrice, setAddonsPrice] = useState(0);

  // TODO: variant add
  const [variantForCartItem, setVariantForCartItem] = useState([]);

  const { cartItems, setCartItems } = useContext(ContextData);

  // Onclick opens a modal
  const handleFoodItem = (e, item) => {
    // window.get_addons_and_variant.send('get_addons_and_variant', item.id);

    // window.get_addons_and_variant.once(
    //   'get_addons_and_variant_response',
    //   (args) => {
    //     console.log('******************args', args);
    //     setFoodAddonsAndVariant(args);
    //   }
    // );

    if (Array.isArray(item?.variants) && item?.variants?.length > 1) {
      setVariantPrice(item.variants[0].price);
      setVariantFixedPrice(item.variants[0].price);
      setAddonsAdd(item);
      setOpenModal(true);
      setFoodVariantName(item?.variants[0]);
    } else if (Array.isArray(item?.addons) && item?.addons?.length > 0) {
      setVariantPrice(item.variants[0].price);
      setVariantFixedPrice(item.variants[0].price);
      setAddonsAdd(item);
      setOpenModal(true);
      setFoodVariantName(item?.variants[0]);
    } else {
      const isCartItemExist = cartItems.find(
        (item) =>
          item.variant.foodVariant === foodVariantName.variant_name &&
          item.variant.id === foodVariantName.food_id
      );

      if (!isCartItemExist) {
        const cartItem = {
          id: item.id,
          isSelected: true,
          product_name: item.product_name,
          foodVariant: foodVariantName.variant_name,
          price: variantFixedPrice,
          totalPrice: variantPrice,
          quantity: foodQuantity,
        };

        const foodAddonsAndVariant = {
          variant: cartItem, // Variant is an Object
          addons: addonForCartItem, //Addons is an Array
        };

        e.currentTarget.style.border = '2px solid #297600';
        setCartItems([...cartItems, { ...foodAddonsAndVariant }]);
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
      (item) =>
        item.foodVariant === foodVariantName.variant_name &&
        item.id === foodVariantName.food_id
    );

    const checkedAddons = addonForCartItem.filter((item) => item.isSelected);

    if (!isCartItemExist) {
      const cartItem = {
        id: item.id,
        isSelected: true,
        product_name: item.product_name,
        foodVariant: foodVariantName.variant_name,
        price: variantFixedPrice,
        total_price: variantPrice,
        quantity: foodQuantity,
      };

      setCartItems([...cartItems, { ...cartItem }, ...checkedAddons]);

      setOpenModal(false);
    } else {
      if (item.id) {
        message.info({
          content: `${foodVariantName.variant_name} variant has already been added, we just increased the amount.`,
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
    console.log('item', item);
    const isCartItemExist = cartItems.find(
      (item) =>
        item.foodVariant === foodVariantName.variant_name &&
        item.id === foodVariantName.food_id
    );

    console.log('cartItems', cartItems);

    const checkedAddons = addonForCartItem.filter((item) => item.isSelected);

    if (!isCartItemExist) {
      const cartItem = {
        id: item.id,
        isSelected: true,
        product_name: item.product_name,
        foodVariant: foodVariantName.variant_name,
        price: variantFixedPrice,
        total_price: variantPrice,
        quantity: foodQuantity,
      };

      setCartItems([...cartItems, { ...cartItem }, ...checkedAddons]);
    } else {
      const index = cartItems.findIndex(
        (item) => item.foodVariant === foodVariantName.variant_name
      );

      let myItems = [];
      const checkAddonExist = cartItems.map((item) => {
        const ad = checkedAddons.find(
          (addon) => addon.product_name === item.product_name
        );
        console.log('addon ffff', ad);
      });

      const updateExistingCart = [
        ...cartItems.slice(0, index),
        {
          ...isCartItemExist,
          quantity: foodQuantity,
          total_price: variantPrice,
        },
        ...cartItems.slice(index + 1),
      ];
      console.log('checkedAddons', checkedAddons);
      cartItems.map((item) => console.log('item my', item));

      // const filterCheckedAddon = checkedAddons.find(item => item.product_name === )
      setCartItems([...updateExistingCart]);

      // if (item.id) {
      message.info({
        content: `${foodVariantName.variant_name} variant has already been added we just increased the amount`,
        duration: 1,
        style: {
          marginTop: '5vh',
          float: 'right',
        },
      });
      // }
    }
  };

  // Addons list if check & uncheck
  function handleAddonsCheck(e, addonItem) {
    const addonObj = {
      id: addonItem.add_on_id,
      add_on_id: addonItem.add_on_id,
      addOnId: addonItem.add_on_id,
      price: addonItem.price,
      total_price:
        addonsPrice === 0 ? addonsQuantity * addonItem.price : addonsPrice,
      tax0: addonItem.tax0,
      tax1: addonItem.tax1,
      foodId: addonItem.food_id,
      product_name: addonItem.add_on_name,
      isSelected: addonItem.isChecked,
      quantity: addonsQuantity,
    };

    if (e.target.checked) {
      setAddonForCartItem([...addonForCartItem, addonObj]);

      const updateAddons = addonForCartItem.find(
        (item) => item.id === addonItem.add_on_id
      );

      const index = addonForCartItem.findIndex(
        (item) => item.id === addonItem.add_on_id
      );

      if (updateAddons) {
        setAddonForCartItem([
          ...addonForCartItem.slice(0, index),
          {
            ...updateAddons,
            total_price: addonsPrice,
            quantity: addonsQuantity,
            isSelected: addonItem.isChecked,
          },
          ...addonForCartItem.slice(index + 1),
        ]);
      } else {
        setAddonForCartItem([...addonForCartItem, addonObj]);
      }
    } else {
      const filterAddonsListIfUncheck = addonForCartItem.filter(
        (addonsItem) => addonsItem.add_on_id !== addonItem.add_on_id
      );

      setAddonForCartItem(filterAddonsListIfUncheck);
    }
  }

  const handleVariantPrice = (variant) => {
    const variantObj = JSON.parse(variant);
    const fixedPrice = variantObj.price;

    setVariantFixedPrice(fixedPrice);
    setFoodVariantName(variantObj);
    setVariantPrice(variantObj.price);
  };

  // TODO: Quantity value & price changes
  const calculateVariantQuantity = (quantity) => {
    setFoodQuantity(quantity);
    setVariantPrice(variantFixedPrice * quantity);
  };

  const handleAddons = (quantity, addonsItem) => {
    setAddonsQuantity(quantity);
    setAddonsPrice(quantity * addonsItem.price);

    const totalPrice = quantity * addonsItem.price;

    const isExistAddon = addonForCartItem.find(
      (item) => item?.id === addonsItem?.add_on_id
    );

    // add_on_id
    if (!isExistAddon) {
      setAddonForCartItem([
        ...addonForCartItem,
        {
          ...addonsItem,
          id: addonsItem.add_on_id,
          product_name: addonsItem.add_on_name,
          total_price: totalPrice,
          quantity,
        },
      ]);
    } else {
      const index = addonForCartItem.findIndex(
        (item) => item.id === addonsItem.add_on_id
      );

      setAddonForCartItem([
        ...addonForCartItem.slice(0, index),
        { ...isExistAddon, total_price: totalPrice, quantity },
        ...addonForCartItem.slice(index + 1),
      ]);
    }

    const updateItemPrice = addonsAdd?.addons.find(
      (item) => item.add_on_id === addonsItem.add_on_id
    );

    const index = addonsAdd?.addons.findIndex(
      (item) => item.add_on_id === updateItemPrice.add_on_id
    );

    const newAddons = [
      ...addonsAdd?.addons.slice(0, index),
      { ...updateItemPrice, total_price: totalPrice, quantity },
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
                      <tr key={addonsItem?.add_on_name}>
                        <td>
                          <Checkbox
                            onChange={(e) =>
                              handleAddonsCheck(e, {
                                ...addonsItem,
                                isChecked: e.target.checked,
                              })
                            }
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
