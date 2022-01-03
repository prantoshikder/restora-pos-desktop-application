import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import './cart.styles.scss';

const CartBottom = () => {
  const handleCancelCartItems = () => {};

  const handleQuickOrder = () => {};

  const handlePlaceOrder = () => {};

  return (
    <>
      <div className="grand-total mb-2">
        <span>Grand Total</span>
        <div>
          <span>$</span>
          <span>1876451.00</span>
        </div>
      </div>
      <div className="btn-wrapper">
        <Button
          type="primary"
          danger
          onClick={handleCancelCartItems}
          className="d-flex align-item-center justify-content-center"
        >
          <DeleteOutlined />
        </Button>
        <Button type="primary" onClick={handleQuickOrder}>
          Quick Ordedr
        </Button>
        <Button
          type="primary"
          className="light-blue"
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
      </div>
    </>
  );
};

export default CartBottom;
