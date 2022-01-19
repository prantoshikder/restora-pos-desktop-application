import React from 'react';
import foodLists from '../../../temp/foods.json';
import FoodItem from './FoodItem';

const FoodLists = ({ setCartItems, cartItems }) => {
  return (
    <>
      {foodLists.foods.map((item) => (
        <FoodItem
          setCartItems={setCartItems}
          cartItems={cartItems}
          key={item.id}
          item={item}
        />
      ))}
    </>
  );
};

export default FoodLists;
