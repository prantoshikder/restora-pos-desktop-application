import { Col } from 'antd';
import './OnGoingOrderCart.style.scss';

const OnGoingOrderCart = ({ orderCard, setOrderComplete }) => {
  const handleCartItem = (e, foodData) => {
    // console.log('foodData', foodData);

    if (!foodData.isSelected) {
      foodData.isSelected = true;
      e.currentTarget.style.borderColor = '#0088f2';
      setOrderComplete(foodData);
    } else {
      foodData.isSelected = false;
      e.currentTarget.style.borderColor = '';
    }
  };

  return (
    <Col lg={4}>
      <div className="on_going_menu_item">
        <div
          className="menu_info_content"
          onClick={(e) => handleCartItem(e, orderCard)}
        >
          <li>Order Number: {orderCard.order_id}</li>
          {orderCard.is_active === 1 ? (
            <li>Status: Pending</li>
          ) : (
            <li>Status: Completed</li>
          )}
        </div>
      </div>
    </Col>

    // <Col lg={6}>
    //   <div className="on_going_menu_item">
    //     <Row>
    //       <Col lg={10}>
    //         <div className="table_img">
    //           <img src={TableImage} alt="" />
    //           <div className="table_info">
    //             <h1>foodItem</h1>
    //           </div>
    //         </div>
    //       </Col>
    //       <Col lg={14}>
    //         <div className="info_menu_content">
    //           <li>Waiter:</li>
    //           <li>Order Number:</li>
    //           <li>Running Time:</li>
    //           <li>Type:</li>
    //         </div>
    //       </Col>
    //     </Row>
    //   </div>
    // </Col>
  );
};

export default OnGoingOrderCart;
