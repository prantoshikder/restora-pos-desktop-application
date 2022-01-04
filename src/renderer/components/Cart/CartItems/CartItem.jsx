import { FileAddOutlined } from '@ant-design/icons';
import React from 'react';
{
  /* <i class="fas fa-notes-medical"></i> */
}
const CartItem = ({ item }) => {
  return (
    <tr>
      <td>
        <FileAddOutlined />
      </td>
      <td>Pizza</td>
      <td>Large</td>
      <td>$19.99</td>
      <td>2</td>
      <td>Delete</td>
    </tr>
  );
};

export default CartItem;
