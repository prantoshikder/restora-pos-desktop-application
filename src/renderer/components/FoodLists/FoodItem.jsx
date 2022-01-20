import { Col } from 'antd';
import React from 'react';
import foodPlaceholder from '../../../../assets/food-placeholder.png';
import './food.item.styles.scss';

const FoodItem = ({ item, setCartItems, cartItems }) => {
  const handleFoodItem = (item) => {
    setCartItems([...cartItems, item]);
  };

  return (
    <Col lg={4}>
      <div className="food-card" onClick={() => handleFoodItem(item)}>
        <div className="food-image">
          {item?.image ? (
            <img variant="top" src={item.image} />
          ) : (
            <img variant="top" src={foodPlaceholder} />
          )}
        </div>
        {/* <Card.Body>
          <Card.Title>{item.name}</Card.Title>
        </Card.Body> */}
        <div>
          <p>{item.name}</p>
        </div>
      </div>
    </Col>
  );
};

export default FoodItem;
