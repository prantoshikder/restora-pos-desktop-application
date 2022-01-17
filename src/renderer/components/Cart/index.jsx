import {
  DeleteOutlined,
  FileAddOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, message, Select } from 'antd';
import { default as React, default as React, useState } from 'react';
import { Col, Modal, Row, Table } from 'react-bootstrap';
import './cart.styles.scss';

const { Option } = Select;

const Cart = () => {
  const [form] = Form.useForm();
  const [foodNote] = Form.useForm();
  const [show, setShow] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(1);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const selectCustomerName = () => {};
  const selectCustomerType = () => {};

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

  const handleSubmit = () => {
    console.log('categories', categories);

    message.success({
      content: 'Foods category added successfully',
      className: 'custom-class',
      duration: 1,
      style: {
        marginTop: '5vh',
        float: 'right',
      },
    });
  };

  const handleCancelCartItems = () => {};

  const handleQuickOrder = () => {};

  const handlePlaceOrder = () => {};

  const handleUpdateNote = () => {
    foodNote.resetFields();
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
    <div className="cart-wrapper">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {/* Cart Top */}
        <div className="form-content">
          <div className="banner-card">
            <Row className="justify-content-md-center">
              <Col lg={5}>
                <Form.Item
                  label="Customer Name"
                  name="customerName"
                  rules={[
                    {
                      required: true,
                      message: 'Customer Name is required',
                    },
                  ]}
                >
                  <Select
                    placeholder="Select a Customer Name"
                    onChange={selectCustomerName}
                    size="large"
                    defaultValue={{ key: 'Walkin' }}
                    allowClear
                  >
                    <Option value="walkin">Walkin</Option>
                    <Option value="jamil">Jamil</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col lg={1}>
                <Button className="add-customer">
                  <PlusCircleOutlined />
                </Button>
              </Col>
              <Col lg={6}>
                <Form.Item
                  label="Customer Type"
                  name="customerType"
                  rules={[
                    {
                      required: true,
                      message: 'Customer Type is required',
                    },
                  ]}
                >
                  <Select
                    placeholder="Select a Customer Name"
                    onChange={selectCustomerType}
                    defaultValue={{ key: 'Walk In' }}
                    size="large"
                    allowClear
                  >
                    <Option value="walkIn">Walk In</Option>
                    <Option value="onlineCustomer">Online Customer</Option>
                    <Option value="thirdParty">Third Party</Option>
                    <Option value="takeWay">Take Way</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row className="justify-content-md-center mt-2">
              <Col lg={4}>
                <Form.Item
                  label="Waiter"
                  name="waiter"
                  rules={[
                    {
                      required: true,
                      message: 'Waiter is required',
                    },
                  ]}
                >
                  <Input placeholder="Waiter" size="large" />
                </Form.Item>
              </Col>
              <Col lg={4}>
                <Form.Item
                  label="Table"
                  name="table"
                  rules={[
                    {
                      required: true,
                      message: 'Table is required',
                    },
                  ]}
                >
                  <Input placeholder="Table" size="large" />
                </Form.Item>
              </Col>
              <Col lg={4}>
                <Form.Item
                  label="Cooking Time"
                  name="cookingTime"
                  rules={[
                    {
                      required: true,
                      message: 'Cooking Time is required',
                    },
                  ]}
                >
                  <Input placeholder="Cooking Time" size="large" />
                </Form.Item>
              </Col>
            </Row>
          </div>
        </div>

        {/* <CartItems /> */}
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
          </tbody>
        </Table>

        {/* CartBottom */}

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
      </Form>

      {/* <CartBottom /> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Food Note</Modal.Title>
        </Modal.Header>

        <Row>
          <Col lg={{ span: 10, offset: 1 }}>
            <Form
              form={foodNote}
              onFinish={handleUpdateNote}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <div>
                <Form.Item label="Food Note" name="foodNote">
                  <Input.TextArea placeholder="Opening Note" size="large" />
                </Form.Item>

                <Form.Item>
                  <Button className="note-btn" htmlType="submit">
                    Update Note
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default Cart;
