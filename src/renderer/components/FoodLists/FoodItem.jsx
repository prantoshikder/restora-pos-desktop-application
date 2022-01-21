import { Col } from 'antd';
import React from 'react';
import foodPlaceholder from '../../../../assets/food-placeholder.png';
import './food.item.styles.scss';

const FoodItem = ({ item, setCartItems, cartItems }) => {
  const handleFoodItem = (e, item) => {
    if (!item.isSelected) {
      item.isSelected = true;
      e.currentTarget.style.border = '2px solid #297600';
    } else {
      item.isSelected = false;
      e.currentTarget.style.border = '';
    }

    setCartItems([...cartItems, item]);
  };

  return (
    <Col lg={4}>
      <div className="food_card" onClick={(e) => handleFoodItem(e, item)}>
        <div className="food_image">
          {item?.image ? (
            <img
              variant="top"
              src={item.image}
              // onClick={(e) => handleFoodItem(e, item)}
            />
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
