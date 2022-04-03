import { Row } from 'antd';
import OnGoingOrderCart from './../OnGoingOrderCart';

const OnGoingOrderItems = ({
  ongoingOrders,
  setOngoingOrders,
  setOrderComplete,
  setActiveInactiveBtn,
}) => {
  function selectedItem(foodData) {
    const deselectAllCards = ongoingOrders.map((item) => ({
      ...item,
      isSelected: false,
    }));

    const index = ongoingOrders.findIndex(
      (item) => item.order_id === foodData.order_id
    );

    const newCards = [
      ...deselectAllCards.slice(0, index),
      { ...foodData, isSelected: true },
      ...deselectAllCards.slice(index + 1),
    ];

    setOngoingOrders(newCards);
  }

  return (
    <Row gutter={[20, 20]} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {ongoingOrders.length > 0
        ? ongoingOrders?.map((orderCard) => (
            <OnGoingOrderCart
              setActiveInactiveBtn={setActiveInactiveBtn}
              key={orderCard?.order_id}
              selectedItem={selectedItem}
              orderCard={orderCard}
              setOrderComplete={setOrderComplete}
            />
          ))
        : 'Sorry'}
    </Row>
  );
};

export default OnGoingOrderItems;
