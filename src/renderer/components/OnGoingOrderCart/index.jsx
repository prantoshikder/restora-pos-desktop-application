import { Col, Row } from 'antd';
import './OnGoingOrderCart.style.scss';

const OnGoingOrderCart = ({ foodItem }) => {
  const handleCartItem = (e, foodData) => {
    if (!foodData.isSelected) {
      foodData.isSelected = true;
      e.currentTarget.style.border = '2px solid #0088f2';
      e.currentTarget.style.borderRadius = '4px';
    } else {
      foodData.isSelected = false;
      e.currentTarget.style.border = '';
      e.currentTarget.style.borderRadius = '0px';
    }
  };

  return (
    <Col lg={4}>
      <div
        className="on_going_menu_item"
        onClick={(e) => handleCartItem(e, foodItem)}
      >
        <Row>
          <Col lg={24}>
            <div className="menu_info_content">
              <li>Waiter:</li>
              <li>Order Number:</li>
              <li>Running Time:</li>
              <li>Type:</li>
            </div>
          </Col>
        </Row>
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
