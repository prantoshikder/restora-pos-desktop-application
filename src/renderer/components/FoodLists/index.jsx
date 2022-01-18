import React from 'react';
import foodLists from '../../../temp/foods.json';
import FoodItem from './FoodItem';

const FoodLists = ({ setSelectedItem, selectedItem }) => {
  return (
    <>
      {foodLists.foods.map((item) => (
        <FoodItem
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
          key={item.id}
          item={item}
        />
      ))}
    </>
  );
};

export default FoodLists;
