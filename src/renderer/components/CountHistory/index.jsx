import { Row } from 'antd';
import CartHistory from './CartHistory';

const CountHistory = ({ totalCount }) => {

  totalHistory = {
    "foods": [
      {
        "id": 1,
        "name": "Today's Orders",
        "amount": totalCount ? totalCount[3] : 0
      },
      {
        "id": 2,
        "name": "Today's Sales",
        "amount": totalCount ? totalCount[1] : 0
      },
      {
        "id": 3,
        "name": "Total Customers",
        "amount": totalCount ? totalCount[2] : 0

      },
      {
        "id": 4,
        "name": "Lifetime Orders",
        "amount": totalCount ? totalCount[0] : 0
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
