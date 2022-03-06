import { Row } from 'antd';
import OnGoingOrderCart from './../OnGoingOrderCart';

const OnGoingOrderItems = ({ orderData, setOrderComplete }) => {
  return (
    <Row gutter={10} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {orderData?.map((orderCard) => (
        <OnGoingOrderCart
          key={orderCard?.order_id}
          orderCard={orderCard}
          setOrderComplete={setOrderComplete}
        />
      ))}
    </Row>
  );
};

export default OnGoingOrderItems;
