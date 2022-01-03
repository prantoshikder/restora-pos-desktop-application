import React from 'react';
import { Table } from 'react-bootstrap';
import CartItem from './CartItem';

const CartItems = () => {
  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>Item</th>
          <th>Variant Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <CartItem />
      </tbody>
    </Table>
  );
};

export default CartItems;
