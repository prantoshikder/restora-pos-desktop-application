import foodItems from '../../../temp/foods.json';
import FoodItem from './FoodItem';

const FoodLists = ({ foodLists, setFoodLists }) => {
  // console.log('foodLists', foodLists);
  return (
    <>
      {foodItems?.foods?.map((item) => (
        <FoodItem key={item?.id} item={item} />
      ))}
    </>
  );
};

export default FoodLists;
