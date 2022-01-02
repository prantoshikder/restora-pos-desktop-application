import { Button } from 'antd';
import React from 'react';
import './cart.styles.scss';

const CartBottom = () => {
  const handleCancelCartItems = () => {};

  const handleQuickOrder = () => {};

  const handlePlaceOrder = () => {};

  return (
    <div className="btn-wrapper">
      <Button type="primary" danger onClick={handleCancelCartItems}>
        Cancel
      </Button>
      <Button type="primary" onClick={handleQuickOrder}>
        Quick Ordedr
      </Button>
      <Button type="" className="light-blue" onClick={handlePlaceOrder}>
        Place Order
      </Button>
    </div>
  );
};

export default CartBottom;
