import { Row } from 'antd';
import OnGoingOrderCart from './../OnGoingOrderCart';

const OnGoingOrderItems = ({ orderData, setOrderData, setOrderComplete }) => {
  function selectedItem() {
    orderData.forEach((selectItem) => {
      selectItem.selected = true;
    });

    setOrderData(orderData);
  }
  return (
    <Row gutter={10} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {orderData?.map((orderCard) => (
        <OnGoingOrderCart
          key={orderCard?.order_id}
          selectedItem={selectedItem}
          orderCard={orderCard}
          setOrderComplete={setOrderComplete}
        />
      ))}
    </Row>
  );
};

export default OnGoingOrderItems;
