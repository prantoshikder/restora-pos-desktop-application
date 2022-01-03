import React from 'react';
import './cart.styles.scss';
import CartBottom from './CartBottom';
import CartItems from './CartItems';
import CartTop from './CartTop';

const Cart = () => {
  return (
    <div>
      <CartTop />
      <CartItems />
      <CartBottom />
    </div>
  );
};

export default Cart;
