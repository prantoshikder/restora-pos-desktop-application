import {
  FileAddOutlined,
  PlusCircleOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { faCalculator, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Input, message, Select, TimePicker } from 'antd';
import moment from 'moment';
import { default as React, default as React, useEffect, useState } from 'react';
import { Col, Modal, Row, Table } from 'react-bootstrap';
import './cart.styles.scss';

const { Option } = Select;

const Cart = ({ cartItems, setCartItems }) => {
  const [form] = Form.useForm();
  const [foodNote] = Form.useForm();
  const [show, setShow] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(1);

  useEffect(() => {
    setCartData({ ...cartData, cartItems });
  }, [cartItems]);

  const [cartData, setCartData] = useState({
    customerName: '',
    customerType: '',
    waiter: '',
    table: '',
    cookingTime: '',
    cartItems,
    vat: '',
    serviceCharge: '',
    total: '',
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const selectCustomerName = (value) => {
    setCartData({ ...cartData, customerName: value });
  };

  const selectCustomerType = (value) => {
    setCartData({ ...cartData, customerType: value });
  };

  const selectWaiter = (value) => {
    setCartData({ ...cartData, waiter: value });
  };

  const selectTableNum = (value) => {
    setCartData({ ...cartData, table: value });
  };

  const selectTime = (value) => {
    setCartData({ ...cartData, cookingTime: value });
  };

  const handleDeleteItem = (id) => {
    message.success({
      content: 'Successfully Delete Item',
      className: 'custom-class',
      duration: 1,
      style: { marginTop: '5vh', float: 'right' },
    });

    setCartItems(cartItems.filter((item) => item.id !== id));
    return;
  };

  const handleSubmit = () => {
    console.log('cartData', cartData);
    if (!cartData.customerName) {
      message.error({
        content: 'Customer Name is required',
        duration: 1,
        style: { marginTop: '5vh', float: 'right' },
      });
      return;
    } else if (!cartData.customerType) {
      message.error({
        content: 'Customer Type is required is required',
        duration: 1,
        style: { marginTop: '5vh', float: 'right' },
      });
      return;
    } else if (!cartData.waiter) {
      message.error({
        content: 'Waiter name is required is required',
        duration: 1,
        style: { marginTop: '5vh', float: 'right' },
      });
      return;
    } else if (!cartData.table) {
      message.error({
        content: 'Table no is required is required',
        duration: 1,
        style: { marginTop: '5vh', float: 'right' },
      });
      return;
    } else if (!cartData.cookingTime) {
      message.error({
        content: 'Cooking Time is required is required',
        duration: 1,
        style: { marginTop: '5vh', float: 'right' },
      });
      return;
    }

    // message.success({
    //   content: 'Order Done',
    //   className: 'custom-class',
    //   duration: 1,
    //   style: { marginTop: '5vh', float: 'right' },
    // });

    form.resetFields();
    setCartItems('');
  };

  const handleResetAll = () => {
    form.resetFields();
    setCartItems('');

    message.success({
      content: 'Reset successfully',
      className: 'custom-class',
      duration: 1,
      style: { marginTop: '5vh', float: 'right' },
    });
  };

  const handleCalculation = () => {};

  const handleQuickOrder = () => {};

  const handlePlaceOrder = () => {};

  const handleUpdateNote = () => {
    foodNote.resetFields();
    setShow(false);

    message.success({
      content: 'Added Food Note',
      className: 'custom-class',
      duration: 1,
      style: { marginTop: '5vh', float: 'right' },
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
            <Row>
              <Col lg={5}>
                <Form.Item label="Customer Name *" name="customerName">
                  <Select
                    placeholder="Select a Customer Name"
                    value={cartData.customerName}
                    onChange={selectCustomerName}
                    size="large"
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
                <Form.Item label="Customer Type *" name="customerType">
                  <Select
                    placeholder="Select a Customer Name"
                    value={cartData.customerType}
                    onChange={selectCustomerType}
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
                <Form.Item label="Waiter *" name="waiter">
                  <Select
                    placeholder="Select Waiter"
                    value={cartData.waiter}
                    onChange={selectWaiter}
                    size="large"
                    allowClear
                  >
                    <Option value="kabir">Kabir</Option>
                    <Option value="junayed">Junayed</Option>
                    <Option value="devid">Devid</Option>
                    <Option value="smith">Smith</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col lg={2}>
                <Button
                  size="large"
                  type="primary"
                  className="add-customer"
                  // onClick={handlePlaceOrder}
                >
                  Person
                </Button>
              </Col>

              <Col lg={3}>
                <Form.Item label="Table *" name="table">
                  <Select
                    placeholder="Select Table"
                    value={cartData.table}
                    onChange={selectTableNum}
                    size="large"
                    allowClear
                  >
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col lg={3}>
                <Form.Item label="Cooking Time *" name="cookingTime">
                  <TimePicker
                    defaultValue={moment('00:00:00', 'HH:mm:ss')}
                    size="large"
                    value={cartData.cookingTime}
                    onChange={selectTime}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
        </div>

        {/* <CartItems /> */}
        <div className="select-product-item">
          <div className="product-item-table">
            {cartItems?.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart-item">
                  <ShoppingCartOutlined />
                </div>
              </div>
            ) : (
              <div className="product-list-table">
                <Table className="custom-table" striped>
                  <thead align="center">
                    <tr>
                      <th>Item</th>
                      <th>Variant Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="single-product-item">
                    {cartItems?.map((item) => (
                      <tr key={item?.id} align="center">
                        <td align="left" className="note-icon">
                          <FileAddOutlined onClick={handleShow} />
                          {item?.name}
                        </td>
                        <td>{item?.variant}</td>
                        <td>${item?.price}</td>
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
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            onClick={() => handleDeleteItem(item?.id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </div>
        </div>

        {/* CartBottom */}
        <div className="cart-footer">
          <div className="service-charge">
            <Table bordered>
              <tbody size="small">
                <tr>
                  <td>Vat/Tax:</td>
                  <td>Service Charge(%):</td>
                </tr>
              </tbody>
            </Table>
          </div>
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
              onClick={handleCalculation}
              className="calculator group-btn"
              size="large"
            >
              <FontAwesomeIcon icon={faCalculator} />
            </Button>

            <Button
              type="primary"
              onClick={handleResetAll}
              className="delete-selected-item group-btn"
              size="large"
            >
              Cancel
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              className="quick-order-btn group-btn"
              onClick={handleQuickOrder}
              size="large"
            >
              Quick Order
            </Button>

            <Button
              size="large"
              type="primary"
              htmlType="submit"
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
