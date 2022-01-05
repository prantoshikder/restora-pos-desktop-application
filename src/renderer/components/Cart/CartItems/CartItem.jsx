import { DeleteOutlined, FileAddOutlined } from '@ant-design/icons';
import React from 'react';
{
  /* <i class="fas fa-notes-medical"></i> */
}
const CartItem = ({ item }) => {
  return (
    <tr>
      <td className="note-icon">
        <FileAddOutlined />
        Prawn on Toast or Prawn Ball
      </td>
      <td>Pizza</td>
      <td>Large</td>
      <td>
        <input className="quantity" type="number" value={1} />
      </td>
      <td>2</td>
      <td className="delete-icon">
        <DeleteOutlined />
      </td>
    </tr>
  );
};

export default CartItem;
