import { Row } from 'antd';
import CartHistory from './CartHistory';

const CountHistory = ({ totalCount }) => {

  totalHistory = {
    "foods": [
      {
        "id": 1,
        "name": "Lifetime Orders",
        "amount": totalCount[0]
      },
      {
        "id": 2,
        "name": "Tatal Sales",
        "amount": totalCount[1]
      },
      {
        "id": 3,
        "name": "Total Customers",
        "amount": totalCount[2]
      }
    ]
  }

  return (
    <Row gutter={20}>
      {totalHistory.foods.map((item) => (
        <CartHistory key={item?.id} item={item} />
      ))}
    </Row>
  );
};

export default CountHistory;
