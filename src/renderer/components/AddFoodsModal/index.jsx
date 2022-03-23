import {
  Button,
  Checkbox,
  Col,
  InputNumber,
  message,
  Modal,
  Row,
  Space,
} from 'antd';
import { useState } from 'react';
import './AddFoodsModal.style.scss';

const AddFoodsModal = ({
  addonsAdd,
  openModal,
  setOpenModal,
  variantPrice,
  cartItems,
  setCartItems,
  foodVariantName,
  setFoodVariantName,
  variantFixedPrice,
  setVariantFixedPrice,
  closeModal,
  setVariantPrice,
}) => {
  const [addonForCartItem, setAddonForCartItem] = useState([]);
  const [foodQuantity, setFoodQuantity] = useState(1);
  const [addonsQuantity, setAddonsQuantity] = useState(1);
  const [addonsPrice, setAddonsPrice] = useState(0);

  const handleVariantPrice = (variant) => {
    const variantObj = JSON.parse(variant);
    const fixedPrice = variantObj.price;

    setVariantFixedPrice(fixedPrice);
    setFoodVariantName(variantObj);
    setVariantPrice(variantObj.price);
  };

  const calculateVariantQuantity = (quantity) => {
    setFoodQuantity(quantity);
    setVariantPrice(variantFixedPrice * quantity);
  };

  // Addons list if check & uncheck
  function handleAddonsCheck(e, addonItem) {
    const addonObj = {
      id: addonItem.add_on_id,
      add_on_id: addonItem.add_on_id,
      food_id: addonItem.date_inserted,
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
          food_id: addonsItem.date_inserted,
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

  const handleAddToCart = (e, item) => {
    const isCartItemExist = cartItems.find(
      (cartItem) => cartItem.food_id === item.food_id
    );

    const checkedAddons = addonForCartItem.filter((item) => item.isSelected);

    if (!isCartItemExist) {
      const cartItem = {
        id: item.id,
        food_id: item.food_id,
        isSelected: true,
        product_name: item.product_name,
        foodVariant: foodVariantName.variant_name,
        price: variantFixedPrice,
        total_price: variantPrice,
        quantity: foodQuantity,
      };

      setCartItems([...cartItems, { ...cartItem }, ...checkedAddons]);

      setOpenModal(false);
      closeModal();
    } else {
      const index = cartItems.findIndex(
        (cartItem) => cartItem.food_id === item.food_id
      );

      isCartItemExist.quantity += 1;
      isCartItemExist.total_price =
        isCartItemExist.quantity * isCartItemExist.price;

      const newCartItems = [
        ...cartItems.slice(0, index),
        isCartItemExist,
        ...cartItems.slice(index + 1),
      ];

      setCartItems([...newCartItems]);

      if (item?.id) {
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
    const isCartItemExist = cartItems.find(
      (cartItem) => cartItem.food_id === item.food_id
    );

    // cartItem.product_name === foodVariantName.variant_name
    const isVariantExist = cartItems.find(
      (cartItem) => cartItem.foodVariant === foodVariantName.variant_name
    );

    console.log('foodVariantName', foodVariantName);
    console.log('isCartItemExist', isCartItemExist);
    console.log('isVariantExist', isVariantExist);

    const checkedAddons = addonForCartItem.filter((item) => item.isSelected);

    if (!isCartItemExist) {
      const cartItem = {
        id: item.id,
        food_id: item.food_id,
        isSelected: true,
        product_name: item.product_name,
        foodVariant: foodVariantName.variant_name,
        price: variantFixedPrice,
        total_price: variantPrice,
        quantity: foodQuantity,
      };

      setCartItems([...cartItems, { ...cartItem }, ...checkedAddons]);
      closeModal();
    } else {
      console.log('existing item');

      // find the food index from the cartItems Array
      const index = cartItems.findIndex(
        (cartItem) => cartItem.food_id === item.food_id
      );

      // TODO: fixed changing variant name after adding & multiple variant.
      let updateExistingCart = [];

      if (isVariantExist) {
        updateExistingCart = [
          ...cartItems.slice(0, index),
          {
            ...isVariantExist,
            quantity: foodQuantity,
            total_price: variantPrice,
          },
          ...cartItems.slice(index + 1),
        ];

        console.log('exist');
      } else {
        console.log('not exist');
        updateExistingCart = [
          ...cartItems,
          {
            ...foodVariantName,
            foodVariant: foodVariantName.variant_name,
            food_id: item.food_id,
            total_price: variantPrice,
          },
        ];
      }

      console.log('foodVariantName', foodVariantName);
      console.log('updateExistingCart', updateExistingCart);

      let newAddons = [];
      const foodItemIndex = cartItems.findIndex(
        (cartItem) => cartItem.food_id === item.food_id
      );

      const newCartItems = updateExistingCart.map((cartItem, index) => {
        const isExistAddon = checkedAddons.find(
          (addonItem) => addonItem.food_id === cartItem.food_id
        );

        // isExistAddon.food_id !== foodVariantName.date_inserted

        if (isExistAddon && isExistAddon.food_id === cartItem.food_id) {
          if (isExistAddon.food_id === foodVariantName.date_inserted) {
            // updateExistingCart.splice(index, 1);
          }
        } else {
          newAddons.push(cartItem);
        }
      });

      console.log('newAddons', newAddons);

      setCartItems([...newAddons, ...checkedAddons]);

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

  return (
    <>
      <Modal
        title="  "
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
                          style={{
                            height: '1.9rem',
                            width: '5.5rem',
                            borderColor: '#ddd',
                          }}
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
              <Button
                type="primary"
                onClick={(e) => handleAddToCart(e, addonsAdd)}
              >
                Add to Cart
              </Button>
              <Button
                type="primary"
                onClick={(e) => handleMultipleItemAdd(e, addonsAdd)}
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

export default AddFoodsModal;
