import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Menu,
  Modal,
  Row,
  Select,
} from 'antd';
import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import cashRegisterIcon from '../../../../../assets/icons/cash-register.png';
import './Header.style.scss';

const { SubMenu } = Menu;

const Header = ({ direction }) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState('');

  const handleChangeStatus = (value) => {
    console.log('status', value);
    setValue(value);
  };

  const handleCashRegister = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <ConfigProvider direction={direction}>
        <Row>
          <div className="pos_header">
            <div>
              <Button type="primary" size="large" className="pos_btn new_order">
                New Order
              </Button>
              <Button
                type="primary"
                size="large"
                className="pos_btn on_going_order"
              >
                On Going Order
              </Button>
              <Button
                type="primary"
                size="large"
                className="pos_btn kitchen_status"
              >
                Kitchen Status
              </Button>
              <Button type="primary" size="large" className="pos_btn qr_order">
                QR Order
              </Button>
              <Button
                type="primary"
                size="large"
                className="pos_btn online_order"
              >
                Online Order
              </Button>
              <Button
                type="primary"
                size="large"
                className="pos_btn today_order"
              >
                Today Order
              </Button>
            </div>

            <div className="right_panel_wrapper">
              <div
                onClick={() => setVisible(true)}
                title="Cash Register"
                className="image_icon"
              >
                <img src={cashRegisterIcon} alt="Cash Register" />
              </div>
            </div>
          </div>
        </Row>

        <Modal
          title="Cash Register"
          centered
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          footer={null}
          width={650}
        >
          <Row>
            <Col lg={{ span: 10, offset: 1 }}>
              <Form
                form={form}
                onFinish={handleCashRegister}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
              >
                <Form.Item name="counterNumber" label="Counter Number">
                  <Select
                    placeholder="Select Counter No"
                    onChange={handleChangeStatus}
                    value={value}
                    size="large"
                    allowClear
                  >
                    <Option value="0">0</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Total Amount" name="totalAmount">
                  <Input placeholder="Amount" size="large" />
                </Form.Item>

                <Form.Item label="Notes" name="notes">
                  <Input.TextArea placeholder="Opening Note" size="large" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    style={{ marginRight: '1rem' }}
                    onClick={() => setVisible(false)}
                  >
                    <Link className="dashboard" to="/">
                      Dashboard
                    </Link>
                  </Button>
                  <Button className="add-opening-balance-btn" htmlType="submit">
                    Add Opening Balance
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default Header;
