import { Button } from 'antd';
import React from 'react';
import './cart.styles.scss';

const CartBottom = () => {
  const handleCancelCartItems = () => {};

  const handleQuickOrder = () => {};

  const handlePlaceOrder = () => {};

  return (
    <div className="cart-footer">
      <div className="grand-total mb-2">
        <div>
          <span>Grand Total</span>
        </div>
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
          className="delete-selected-item group-btn"
          size="large"
        >
          Cancel
        </Button>

        <Button
          type="primary"
          className="quick-order-btn group-btn"
          onClick={handleQuickOrder}
          size="large"
        >
          Quick Ordedr
        </Button>

        <Button
          size="large"
          type="primary"
          className="place-order-btn group-btn"
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default CartBottom;
