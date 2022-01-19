import { Button, Form, Input, message, Select, Typography } from 'antd';
import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import './AddNewAddons.style.scss';

const { Option } = Select;
const { Title } = Typography;

const AddNewAddons = () => {
  const [form] = Form.useForm();

  const [newAddons, setNewAddons] = useState({
    addonsName: '',
    price: '',
    addonsStatus: '',
  });

  const handleChangeStatus = (value) => {
    setNewAddons({ ...newAddons, addonsStatus: value });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleReset = () => {
    form.resetFields();

    message.success({
      content: 'Reset done',
      className: 'custom-class',
      duration: 1,
      style: {
        marginTop: '5vh',
        float: 'right',
      },
    });
  };

  const handleSubmit = () => {
    console.log('newAddons', newAddons);

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

  return (
    <div className="add_new_addons">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row>
          <Col lg={7}>
            <Form.Item
              label="Add-ons Name"
              name="addonsName"
              rules={[
                {
                  required: true,
                  message: 'Add-ons Name is required',
                },
              ]}
            >
              <Input
                placeholder="Add-ons Name"
                size="large"
                value={newAddons.addonsName}
                onChange={(e) =>
                  setNewAddons({ ...newAddons, addonsName: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Price is required',
                },
              ]}
            >
              <Input
                placeholder="Price"
                size="large"
                value={newAddons.price}
                onChange={(e) =>
                  setNewAddons({ ...newAddons, price: e.target.value })
                }
              />
            </Form.Item>
          </Col>

          <Col lg={5}>
            <Form.Item name="status" label="Status">
              <Select
                placeholder="Select an Option"
                value={newAddons.addonsStatus}
                onChange={handleChangeStatus}
                size="large"
                allowClear
              >
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Form.Item>

            <div className="button_group">
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
                Submit
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddNewAddons;
