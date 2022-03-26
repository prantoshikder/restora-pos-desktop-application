import { Row } from 'antd';
import totalHistory from '../../../temp/foods.json';
import CartHistory from './CartHistory';

const CountHistory = () => {
  return (
    <Row gutter={20}>
      {totalHistory.foods.map((item) => (
        <CartHistory key={item?.id} item={item} />
      ))}
    </Row>
  );
};

export default CountHistory;
