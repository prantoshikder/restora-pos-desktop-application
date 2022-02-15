import { Button, Col, InputNumber, message, Modal, Row, Space } from 'antd';
import React, { useContext, useState } from 'react';
import foodPlaceholder from '../../../../assets/food-placeholder.png';
import { ContextData } from './../../contextApi';
import './food.item.styles.scss';

const FoodItem = ({ item }) => {
  const [openModal, setOpenModal] = useState(false);
  const [addonsAdd, setAddonsAdd] = useState(null);
  const [foodVariantName, setFoodVariantName] = useState('Regular');
  const [quantityValue, setQuantityValue] = useState('');
  const { cartItems, setCartItems } = useContext(ContextData);

  const handleFoodItem = (e, item) => {
    console.log('item', item);

    if (
      item?.addons?.length > 0 ||
      (Array.isArray(item?.variant) && item?.variant?.length > 0)
    ) {
      setAddonsAdd(item);
      setOpenModal(true);
    } else {
      if (!item.isSelected) {
        item.isSelected = true;
        item.foodVariant = foodVariantName;
        e.currentTarget.style.border = '2px solid #297600';
        setCartItems([...cartItems, item]);
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
        // item.isSelected = false;
        // e.currentTarget.style.border = '';
        // setCartItems(cartItems.filter((cartId) => cartId.id !== item.id));
        // return;
      }
    }
  };

  const handleAddToCart = (e, item) => {
    if (!item.isSelected) {
      item.isSelected = true;

      item.foodVariant = foodVariantName;
      item.price = quantityValue * item.price;
      item.quantity = quantityValue;
      // e.currentTarget.style.border = '2px solid #297600';
      setCartItems([...cartItems, item]);
      setOpenModal(false);
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
  };

  console.log('quantityValue', quantityValue);

  return (
    <>
      <Col lg={4}>
        <div className="food_card" onClick={(e) => handleFoodItem(e, item)}>
          <div className="food_image">
            {item?.image ? (
              <img variant="top" src={item.image} />
            ) : (
              <img variant="top" src={foodPlaceholder} />
            )}
          </div>

          <div className="card_body">
            <p>{item.name}</p>
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
                    <td>{addonsAdd?.name}</td>
                    <td>
                      <select
                        name=""
                        onChange={(e) => setFoodVariantName(e.target.value)}
                      >
                        {addonsAdd?.variant?.map((addonItem, index) => (
                          <option key={index} value={addonItem?.variant_name}>
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
                        onChange={setQuantityValue}
                      />
                    </td>
                    <td>{addonsAdd?.price}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Space className="group_addToCart_btn flex ">
              <Button type="primary" onClick={(e) => handleAddToCart(e, item)}>
                Add to Cart
              </Button>
              <Button type="primary">Add Multiple Variant</Button>
            </Space>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default FoodItem;
