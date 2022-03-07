import { Row } from 'antd';
import OnGoingOrderCart from './../OnGoingOrderCart';

const OnGoingOrderItems = ({ orderData, setOrderData, setOrderComplete }) => {
  // function selectedItem() {
  //   orderData.forEach((selectItem) => {
  //     selectItem.isSelected = false;
  //   });

  //   setOrderData(orderData);
  // }

  return (
    <Row gutter={[20, 20]} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {orderData?.map((orderCard) => (
        <OnGoingOrderCart
          key={orderCard?.order_id}
          // selectedItem={selectedItem}
          orderCard={orderCard}
          setOrderComplete={setOrderComplete}
        />
      ))}
    </Row>
  );
};

export default OnGoingOrderItems;
