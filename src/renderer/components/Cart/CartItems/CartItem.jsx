import { DeleteOutlined, FileAddOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
{
  /* <i class="fas fa-notes-medical"></i> */
}
const CartItem = ({ item }) => {
  const [form] = Form.useForm();
  const [show, setShow] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(1);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteItem = () => {
    message.success({
      content: 'Successfully Delete Item',
      className: 'custom-class',
      duration: 1,
      style: {
        marginTop: '5vh',
        float: 'right',
      },
    });
  };

  const handleUpdateNote = () => {
    form.resetFields();
    setShow(false);
    message.success({
      content: 'Added Food Note successfully ',
      className: 'custom-class',
      duration: 1,
      style: {
        marginTop: '5vh',
        float: 'right',
      },
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleItemQuantity = (e) => {
    const value = e.target.value;
    if (Number(value) === 0) return;

    setItemQuantity(value);
  };

  return (
    <>
      <tr>
        <td className="note-icon">
          <FileAddOutlined onClick={handleShow} />
          Prawn on Toast or Prawn Ball
        </td>
        <td>Pizza</td>
        <td>$99.99</td>
        <td>
          <Input
            className="quantity"
            type="number"
            value={itemQuantity}
            onChange={handleItemQuantity}
          />
        </td>
        <td>2</td>
        <td className="delete-icon">
          <DeleteOutlined onClick={handleDeleteItem} />
        </td>
      </tr>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Food Note</Modal.Title>
        </Modal.Header>

        <Row>
          <Col lg={{ span: 10, offset: 1 }}>
            <Form
              form={form}
              onFinish={handleUpdateNote}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item label="Food Note" name="foodNote">
                <Input.TextArea placeholder="Opening Note" size="large" />
              </Form.Item>

              <Form.Item>
                <Button className="note-btn" htmlType="submit">
                  Update Note
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default CartItem;
