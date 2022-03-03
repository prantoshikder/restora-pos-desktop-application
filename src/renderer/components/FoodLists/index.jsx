import FoodItem from './FoodItem';

const FoodLists = ({ foodLists, setFoodLists, selectedMenu }) => {
  return (
    <>
      {foodLists
        .filter((item) => {
          if (!selectedMenu) {
            return true;
          }

          return item.category_id === selectedMenu;
        })
        ?.map((item) => (
          <FoodItem key={item?.id} item={item} />
        ))}
    </>
  );
};

export default FoodLists;
