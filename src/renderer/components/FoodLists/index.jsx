import React from 'react';
import foodItems from '../../../temp/foods.json';
import FoodItem from './FoodItem';

const FoodLists = ({ foodLists, setFoodLists }) => {
  console.log('foodItems json', foodItems.foods);
  return (
    <>
      {foodLists?.map((item) => (
        <FoodItem key={item?.id} item={item} />
      ))}
    </>
  );
};

export default FoodLists;
