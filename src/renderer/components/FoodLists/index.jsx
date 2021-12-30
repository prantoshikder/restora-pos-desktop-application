import React from 'react';
import foodLists from '../../../temp/foods.json';
import FoodItem from './FoodItem';

const FoodLists = () => {
  return (
    <>
      {foodLists.foods.map((item) => (
        <FoodItem key={item.id} item={item} />
      ))}
    </>
  );
};

export default FoodLists;
