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
import { useContext, useEffect, useState } from 'react';
import { getDataFromDatabase } from './../../../helpers';
import { ContextData } from './../../contextApi';
import './cart.styles.scss';
import ConfirmOrderModal from './ConfirmOrderModal';
import PremiumVersion from './PremiumVersion/index';
import WarmingModal from './WarmingModal';

const { Option } = Select;
const { TextArea } = Input;

const Cart = ({ settings }) => {
  const format = 'HH:mm';
  const [form] = Form.useForm();
  const [addCustomerName] = Form.useForm();

  const [openModal, setOpenModal] = useState(false);
  const [confirmBtn, setConfirmBtn] = useState('');
  const [quantityValue, setQuantityValue] = useState(1);
  const [warmingModal, setWarmingModal] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [addCustomer, setAddCustomer] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [premiumVersion, setPremiumVersion] = useState(false);
  const { cartItems, setCartItems } = useContext(ContextData);

  window.get_customer_names.send('get_customer_names', { status: true });

  useEffect(() => {
    getDataFromDatabase(
      'get_customer_names_response',
      window.get_customer_names
    ).then((data = []) => {
      setCustomerList(data);
    });

    setAddCustomer([
      {
        name: ['customer_name'],
        // value: ,
      },
      {
        name: ['customer_email'],
        // value: ,
      },
      {
        name: ['customer_phone'],
        // value: ,
      },
      {
        name: ['customer_address'],
        // value: ,
      },
    ]);
  }, [reRender]);

  useEffect(() => {
    setCartData({ ...cartData, cartItems });
  }, [cartItems]);

  const [cartData, setCartData] = useState({
    cartItems,
  });

  const increaseQuantity = (cartData) => {
    const index = cartItems.indexOf(cartData);
    const newQuantity = (cartData.quantity += 1);

    setQuantityValue(newQuantity);
  };

  const decreaseQuantity = (cartData) => {
    const index = cartItems.indexOf(cartData);

    if (cartData.quantity === 1) return;

    const newQuantity = (cartData.quantity -= 1);
    setQuantityValue(newQuantity);
  };

  const columns = [
    {
      title: 'Item',
      dataIndex: 'product_name',
      key: 'product_name',
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
      key: 'price',
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

  const selectTime = (time, timeString) => {
    console.log('Cooking time', timeString);
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

  const handleAddCustomer = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    addCustomerName.resetFields();
  };

  const submitNewCustomer = () => {
    const addCustomerInfo = {};

    for (const data of addCustomer) {
      addCustomerInfo[data.name[0]] =
        typeof data?.value === 'string' ? data?.value?.trim() : data?.value;
    }

    // Insert through the event & channel
    window.insert_customer_info.send('insert_customer_info', addCustomerInfo);

    // Customer name insert response
    window.insert_customer_info.once(
      'insert_customer_info_response',
      ({ status }) => {
        if (status === 'inserted') {
          setReRender((prevState) => !prevState);
          setOpenModal(false);
          addCustomerName.resetFields();

          message.success({
            content: 'Customer info added successfully',
            className: 'custom-class',
            duration: 1,
            style: {
              marginTop: '5vh',
              float: 'right',
            },
          });
        }
      }
    );
  };

  const handleSubmit = () => {
    console.log('submitted');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="cart_wrapper">
      <Form
        form={form}
        // fields={categories}
        onFinish={handleSubmit}
        // onFieldsChange={(_, allFields) => {
        //   setCategories(allFields);
        // }}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        autoComplete="off"
      >
        <div className="form_content">
          <div className="banner_card">
            <Row gutter={30}>
              <Col lg={11}>
                <Form.Item
                  label="Customer Name"
                  className="custom_level"
                  name="customer_name"
                >
                  <Select
                    placeholder="Select a Customer Name"
                    size="large"
                    allowClear
                  >
                    {customerList?.map((customer) => (
                      <Option
                        key={customer?.id}
                        value={customer?.customer_name}
                      >
                        {customer?.customer_name}
                      </Option>
                    ))}
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
                  name="customer_type"
                  onClick={() => setPremiumVersion(true)}
                >
                  <Select
                    placeholder="Select a Customer Type"
                    size="large"
                    allowClear
                    disabled
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
                  onClick={() => setPremiumVersion(true)}
                >
                  <Select
                    placeholder="Select Waiter"
                    size="large"
                    allowClear
                    disabled
                  >
                    <Option value="kabir">Kabir</Option>
                    <Option value="junayed">Junayed</Option>
                    <Option value="devid">Devid</Option>
                    <Option value="smith">Smith</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col lg={3}>
                <Button
                  size="large"
                  type="primary"
                  className="add_customer"
                  disabled
                  onClick={() => setPremiumVersion(true)}
                >
                  Person
                </Button>
              </Col>

              <Col lg={7}>
                <Form.Item
                  label="Table"
                  className="custom_level"
                  name="table_no"
                  onClick={() => setPremiumVersion(true)}
                >
                  <Select
                    placeholder="Select Table No"
                    size="large"
                    allowClear
                    disabled
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
                  onClick={() => setPremiumVersion(true)}
                >
                  <TimePicker
                    size="large"
                    onChange={selectTime}
                    format={format}
                    disabled
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
            <Row>
              <Col span={12}>
                <b>Vat/Tax: </b>
                {settings?.vat}%
              </Col>
              <Col span={12}>
                <b>
                  Service Charge(
                  {settings?.service_chargeType === 'amount'
                    ? 'Fixed'
                    : '%'}):{' '}
                </b>
                {settings?.servicecharge}
              </Col>
            </Row>
            {/* <table bordered="true">
              <tbody size="small">
                <tr>
                  <td>Vat/Tax:</td>
                  <td>Service Charge(%):</td>
                </tr>
              </tbody>
            </table> */}
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
        title="Add Customer"
        visible={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        footer={null}
        width={650}
      >
        <Row>
          <Col lg={24}>
            <Form
              form={addCustomerName}
              fields={addCustomer}
              onFinish={submitNewCustomer}
              onFieldsChange={(_, allFields) => {
                setAddCustomer(allFields);
              }}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Customer Name"
                name="customer_name"
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
                name="customer_email"
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
                name="customer_phone"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Mobile!',
                  },
                ]}
              >
                <Input placeholder="Customer Mobile" size="large" />
              </Form.Item>

              <Form.Item label="Address" name="customer_address">
                <TextArea placeholder="Customer Address" size="large" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="danger"
                  style={{
                    marginRight: '1rem',
                  }}
                  onClick={handleClose}
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

      <PremiumVersion
        premiumVersion={premiumVersion}
        setPremiumVersion={setPremiumVersion}
      />
    </div>
  );
};

export default Cart;
