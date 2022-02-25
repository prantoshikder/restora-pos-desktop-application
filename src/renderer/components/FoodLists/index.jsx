import FoodItem from './FoodItem';

const FoodLists = ({ foodLists, setFoodLists }) => {
  return (
    <>
      {foodLists?.map((item) => (
        <FoodItem key={item?.id} item={item} />
      ))}
    </>
  );
};

export default FoodLists;
