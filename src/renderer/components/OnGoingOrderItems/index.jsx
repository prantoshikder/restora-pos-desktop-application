import { Row } from 'antd';
import foodItems from '../../../temp/foods.json';
import OnGoingOrderCart from './../OnGoingOrderCart';

const OnGoingOrderItems = () => {
  return (
    <Row gutter={10} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {foodItems?.foods?.map((foodItem) => (
        <OnGoingOrderCart key={foodItem?.id} foodItem={foodItem} />
      ))}
    </Row>
  );
};

export default OnGoingOrderItems;
