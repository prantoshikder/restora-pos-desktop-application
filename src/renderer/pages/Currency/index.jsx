import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select } from 'antd';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Heading from 'renderer/components/Heading';
import Sidebar from './../../components/partials/Sidebar';
import './Currency.styles.scss';
import CurrencyList from './CurrencyList';

const { Option } = Select;

const Currency = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const changePosition = (value) => {
    console.log('position', value);
  };

  const handleReset = () => {
    form.resetFields();
  };

  const handleSubmit = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Container fluid className="main-wrapper">
        <div className="flex pos_system">
          <Col lg={2}>
            <Sidebar />
          </Col>
          <Col md={10}>
            <div className="flex item-center content-between">
              <Heading title="Currency" />
              <Button
                type="primary"
                className="bulk_upload_btn"
                onClick={() => setVisible(true)}
              >
                <PlusCircleOutlined />
                Add Currency
              </Button>
            </div>
            <CurrencyList />
          </Col>
        </div>
      </Container>

      <Modal
        title="Add Currency"
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
              onFinish={handleSubmit}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Currency Name"
                name="currencyName"
                rules={[
                  {
                    required: true,
                    message: 'Currency Name is required',
                  },
                ]}
                required
              >
                <Input placeholder="Currency Name" size="large" />
              </Form.Item>

              <Form.Item
                label="Currency Icon"
                name="currencyIcon"
                rules={[
                  {
                    required: true,
                    message: 'Currency Icon is required',
                  },
                ]}
                required
              >
                <Input placeholder="Currency Icon" size="large" />
              </Form.Item>

              <Form.Item
                label="Conversion Rate"
                name="conversionRate"
                rules={[
                  {
                    required: true,
                    message: 'Conversion Rate is required',
                  },
                ]}
                required
              >
                <Input placeholder="Conversion Rate" size="large" />
              </Form.Item>
              <Form.Item
                label="Position"
                name="position"
                rules={[
                  { required: true, message: 'Please input your Position!' },
                ]}
              >
                <Select
                  placeholder="Select Option"
                  size="large"
                  onChange={changePosition}
                  // value={position}
                  allowClear
                >
                  <Option value="left">Left</Option>
                  <Option value="right">Right</Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button
                  type="danger"
                  style={{
                    marginRight: '1rem',
                  }}
                  onClick={handleReset}
                >
                  Reset
                </Button>
                <Button type="primary" htmlType="submit">
                  Add
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default Currency;
