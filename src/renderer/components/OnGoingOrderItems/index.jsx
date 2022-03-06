import { Row } from 'antd';
import OnGoingOrderCart from './../OnGoingOrderCart';

const OnGoingOrderItems = ({ orderData, setOrderData, setOrderComplete }) => {
  function selectedItem(foodData) {
    const deselectAllCards = orderData.map((item) => ({
      ...item,
      isSelected: false,
    }));

    const index = orderData.findIndex(
      (item) => item.order_id === foodData.order_id
    );

    const newCards = [
      ...deselectAllCards.slice(0, index),
      { ...foodData, isSelected: true },
      ...deselectAllCards.slice(index + 1),
    ];

    setOrderData(newCards);
  }

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
