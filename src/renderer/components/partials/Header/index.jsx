import { Button, Form, Input, Modal, Select } from 'antd';
import React, { useState } from 'react';
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import cashRegisterIcon from '../../../../../assets/icons/cash-register.png';
import './Header.style.scss';

const Header = () => {
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
      <Navbar collapseOnSelect expand="lg" className="navbar">
        <Container fluid>
          {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto left_navbar">
              <Nav.Link href="#newOrder">New Order</Nav.Link>
              <Nav.Link href="#onGoingOrder">On Going Order</Nav.Link>
              <Nav.Link href="#kitchenStatus">Kitchen Status</Nav.Link>
              <Nav.Link href="#qrOrder">QR Order</Nav.Link>
              <Nav.Link href="#onlineOrder">Online Order</Nav.Link>
              <Nav.Link href="#todayOrder">Today Order</Nav.Link>
            </Nav>

            <Nav className="right_navbar">
              <Nav.Link
                href="#!"
                onClick={() => setVisible(true)}
                title="Cash Register"
              >
                <img src={cashRegisterIcon} alt="Cash Register" />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal
        title="Start Register"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={null}
        width={700}
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

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: '1rem' }}
                >
                  Dashboard
                </Button>
                <Button type="primary" htmlType="submit">
                  Add Opening Balance
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default Header;
