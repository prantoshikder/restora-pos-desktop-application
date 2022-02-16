import {
  DownOutlined,
  PlusCircleOutlined,
  ShoppingCartOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { faCalculator, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Space,
  Table,
  TimePicker,
} from 'antd';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { ContextData } from './../../contextApi';
import './cart.styles.scss';
import ConfirmOrderModal from './ConfirmOrderModal';
import WarmingModal from './WarmingModal';

const { Option } = Select;
const { TextArea } = Input;

const Cart = () => {
  const [form] = Form.useForm();
  const [foodNote] = Form.useForm();
  const [addCustomer] = Form.useForm();

  const [show, setShow] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [confirmBtn, setConfirmBtn] = useState('');
  const [quantityValue, setQuantityValue] = useState(1);
  const [warmingModal, setWarmingModal] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);

  const { cartItems, setCartItems } = useContext(ContextData);

  const [state, dispatch] = useReducer([]);

  useEffect(() => {
    setCartData({ ...cartData, cartItems });
  }, [cartItems]);

  const [cartData, setCartData] = useState({
    customerName: '',
    customerType: '',
    waiter: '',
    tableNo: '',
    cookingTime: '',
    cartItems,
    vat: '',
    serviceCharge: '',
    total: '',
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const increaseQuantity = (cartData) => {
    console.log('cartData', cartData);

    const index = cartItems.indexOf(cartData);
    console.log('index', index);

    const newQuantity = (cartData.quantity += 1);

    console.log('cartData.price * newQuantity', cartData.price * newQuantity);
    setQuantityValue(newQuantity);

    // const newData = [
    //   ...cartItems.slice(0, index),
    //   { ...cartData, quantity: newQuantity },
    //   ...cartItems.slice(index + 1),
    // ];

    // dispatch(newData);
  };

  const decreaseQuantity = (cartData) => {
    const index = cartItems.indexOf(cartData);

    if (cartData.quantity === 1) return;

    const newQuantity = (cartData.quantity -= 1);
    setQuantityValue(newQuantity);

    // const newData = [
    //   ...cartItems.slice(0, index),
    //   { ...cartData, quantity: newQuantity },
    //   ...cartItems.slice(index + 1),
    // ];

    // console.log('newData', newData);
    // setQuantityValue(newQuantity);
  };

  const columns = [
    {
      title: 'Item',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Variant Name',
      dataIndex: 'foodVariant',
      key: 'foodVariant',
      align: 'center',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
      width: '10%',
      render: (text, record) => (
        <div>
          <InputNumber
            value={record.quantity}
            onChange={(value) => {}}
            className="quantity_value"
            controls={false}
          />

          <div className="quantity_increase_decrease">
            <span onClick={() => increaseQuantity(record)}>
              <UpOutlined />
            </span>
            <span onClick={() => decreaseQuantity(record)}>
              <DownOutlined />
            </span>
          </div>
        </div>
      ),
    },
    {
      title: 'Total',
      dataIndex: 'price',
      key: 'total',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (text, record) => (
        <Space size="middle" className="delete_icon">
          <FontAwesomeIcon
            icon={faTrashAlt}
            onClick={() => handleDeleteItem(record)}
          />
        </Space>
      ),
    },
  ];

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
    setCartData({ ...cartData, tableNo: value });
  };

  const selectTime = (value) => {
    setCartData({ ...cartData, cookingTime: value });
  };

  const handleDeleteItem = (item) => {
    message.success({
      content: 'Successfully Delete Item',
      className: 'custom-class',
      duration: 1,
      style: { marginTop: '5vh', float: 'right' },
    });

    item.isSelected = false;
    setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    return;
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

  const handleQuickOrder = (data) => {
    if (cartItems?.length === 0) {
      setWarmingModal(true);
    } else {
      if (data === 'quickOrder') {
        setConfirmBtn(data);
        setConfirmOrder(true);
      } else if (data === 'placeOrder') {
        setConfirmBtn(data);
        setConfirmOrder(true);
      }
    }
  };

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

  const handleAddCustomer = () => {
    setOpenModal(true);
  };

  const submitCustomer = () => {};

  return (
    <div className="cart_wrapper">
      <Form form={form} layout="vertical" autoComplete="off">
        <div className="form_content">
          <div className="banner_card">
            <Row gutter={30}>
              <Col lg={11}>
                <Form.Item
                  label="Customer Name"
                  className="custom_level"
                  name="customerName"
                >
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

              <Col lg={2}>
                <Button
                  className="add_customer"
                  onClick={() => handleAddCustomer()}
                >
                  <PlusCircleOutlined />
                </Button>
              </Col>

              <Col lg={11}>
                <Form.Item
                  label="Customer Type"
                  className="custom_level"
                  name="customerType"
                >
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

            <Row gutter={30}>
              <Col lg={7}>
                <Form.Item
                  label="Waiter"
                  className="custom_level"
                  name="waiter"
                >
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

              <Col lg={3}>
                <Button size="large" type="primary" className="add_customer">
                  Person
                </Button>
              </Col>

              <Col lg={7}>
                <Form.Item
                  label="Table"
                  className="custom_level"
                  name="tableNo"
                >
                  <Select
                    placeholder="Select Table No"
                    value={cartData.tableNo}
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

              <Col lg={7}>
                <Form.Item
                  label="Cooking Time"
                  className="custom_level"
                  name="cookingTime"
                >
                  <TimePicker
                    size="large"
                    value={cartData.cookingTime}
                    onChange={selectTime}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
        </div>

        <div id="printId" className="select_product_item">
          <div className="product_item_table">
            {cartItems?.length === 0 ? (
              <div className="empty_cart">
                <div className="empty_cart_item">
                  <ShoppingCartOutlined />
                </div>
              </div>
            ) : (
              <div className="product_list_table">
                <Table
                  columns={columns}
                  pagination={false}
                  dataSource={cartItems}
                  rowKey={(record) => record.id}
                  className="custom_table"
                />
              </div>
            )}
          </div>
        </div>
        <div className="cart_footer">
          <div className="service_charge">
            <table bordered="true">
              <tbody size="small">
                <tr>
                  <td>Vat/Tax:</td>
                  <td>Service Charge(%):</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grand_total">
            <div>
              <span>Grand Total</span>
            </div>

            <div>
              {cartItems?.length !== 0 ? (
                <span>
                  $
                  {cartItems?.reduce(
                    (prevPrice, currentPrice) => prevPrice + currentPrice.price,
                    0
                  )}
                </span>
              ) : (
                <span>$0.00</span>
              )}
            </div>
          </div>

          <div className="cartBtn_wrapper">
            <Button
              onClick={handleCalculation}
              className="calculator cartGroup_btn"
              size="large"
            >
              <FontAwesomeIcon icon={faCalculator} />
            </Button>

            <Button
              size="large"
              className="delete_selected_item cartGroup_btn"
              onClick={handleResetAll}
            >
              Cancel
            </Button>

            <Button
              size="large"
              className="quick_order_btn cartGroup_btn"
              onClick={() => handleQuickOrder('quickOrder')}
            >
              Quick Order
            </Button>

            <Button
              size="large"
              className="place_order_btn cartGroup_btn"
              onClick={() => handleQuickOrder('placeOrder')}
            >
              Place Order
            </Button>
          </div>
        </div>
      </Form>

      <Modal
        title="Add Variant"
        visible={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        footer={null}
        width={650}
      >
        <Row>
          <Col lg={24}>
            <Form
              form={addCustomer}
              onFinish={submitCustomer}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Customer Name"
                name="customerName"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Customer Name!',
                  },
                ]}
              >
                <Input placeholder="Customer Name" size="large" />
              </Form.Item>

              <Form.Item
                label="Email Address"
                name="customerName"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Email Address!',
                  },
                ]}
              >
                <Input placeholder="Customer Email" size="large" />
              </Form.Item>

              <Form.Item
                label="Mobile "
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Mobile!',
                  },
                ]}
              >
                <Input placeholder="Customer Mobile" size="large" />
              </Form.Item>

              <Form.Item label="Address" name="address">
                <TextArea placeholder="Customer Address" size="large" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="danger"
                  style={{
                    marginRight: '1rem',
                  }}
                  onClick={() => setOpenModal(false)}
                >
                  Close
                </Button>

                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>

      <WarmingModal
        setWarmingModal={setWarmingModal}
        warmingModal={warmingModal}
      />

      <ConfirmOrderModal
        confirmOrder={confirmOrder}
        setConfirmOrder={setConfirmOrder}
        confirmBtn={confirmBtn}
        printId={'printId'}
      />
    </div>
  );
};

export default Cart;
