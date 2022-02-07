import { Col, message } from 'antd';
import React, { useContext } from 'react';
import foodPlaceholder from '../../../../assets/food-placeholder.png';
import { ContextData } from './../../contextApi';
import './food.item.styles.scss';

const FoodItem = ({ item }) => {
  const { cartItems, setCartItems } = useContext(ContextData);

  const handleFoodItem = (e, item) => {
    if (!item.isSelected) {
      item.isSelected = true;
      e.currentTarget.style.border = '2px solid #297600';
      setCartItems([...cartItems, item]);
    } else {
      console.log('item', item);

      // const [filterItem] = cartItems.filter((cartId) => cartId.id === item.id);

      if (item.id) {
        message.info({
          content: 'Item already added',
          duration: 1,
          style: {
            marginTop: '5vh',
            float: 'right',
          },
        });

        // console.log('item.quantity', item.quantity + 1);

        // let itemQuantity = item.quantity + 1;

        // console.log({ ...item, quantity: itemQuantity++ });
      }
      // item.isSelected = false;
      // e.currentTarget.style.border = '';
      // setCartItems(cartItems.filter((cartId) => cartId.id !== item.id));
      // return;
    }
  };

  return (
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
  );
};

export default FoodItem;
