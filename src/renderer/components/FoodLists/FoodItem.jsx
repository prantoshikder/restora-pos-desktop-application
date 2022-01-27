import { Col } from 'antd';
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
      item.isSelected = false;
      e.currentTarget.style.border = '';
      setCartItems(cartItems.filter((cartId) => cartId.id !== item.id));
      return;
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
