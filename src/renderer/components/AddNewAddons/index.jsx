import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddNewAddons.style.scss';

const { Option } = Select;
const { Title } = Typography;

const AddNewAddons = ({ state }) => {
  const [form] = Form.useForm();
  let navigate = useNavigate();

  const [newAddons, setNewAddons] = useState([]);

  useEffect(() => {
    setNewAddons([
      {
        name: ['add_on_name'],
        value: state?.add_on_name,
      },
      {
        name: ['price'],
        value: state?.price,
      },
      {
        name: ['is_active'],
        value: state?.is_active,
      },
    ]);
  }, []);

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
    const newAddOns = {};

    for (const data of newAddons) {
      newAddOns[data.name[0]] =
        typeof data.value === 'string' ? data?.value?.trim() : data?.value;
    }

    parseInt(newAddOns.is_active);

    newAddOns.is_active === 'Active'
      ? (newAddOns.is_active = 1)
      : parseInt(newAddOns.is_active) === 1
      ? (newAddOns.is_active = 1)
      : (newAddOns.is_active = 0);

    newAddOns.add_on_id = state?.add_on_id;

    // Insert & update through the same event & channel
    window.add_addons.send('add_addons', newAddOns);

    // Get addons insert & update response
    window.add_addons.once('add_addons_response', ({ status }) => {
      if (status === 'updated') {
        message.success({
          content: 'Add-ons has been updated successfully',
          className: 'custom-class',
          duration: 1,
          style: {
            marginTop: '5vh',
            float: 'right',
          },
        });
        navigate('/addons_list');
      } else {
        message.success({
          content: 'Add-ons added successfully',
          className: 'custom-class',
          duration: 1,
          style: {
            marginTop: '5vh',
            float: 'right',
          },
        });
        form.resetFields();
      }
    });
  };

  return (
    <div className="add_new_addons">
      <Form
        form={form}
        layout="vertical"
        fields={newAddons}
        onFinish={handleSubmit}
        onFieldsChange={(_, allFields) => {
          setNewAddons(allFields);
        }}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row gutter={40}>
          <Col lg={14}>
            <Form.Item
              label="Add-ons Name"
              name="add_on_name"
              rules={[
                {
                  required: true,
                  message: 'Add-ons Name is required',
                },
              ]}
            >
              <Input placeholder="Add-ons Name" size="large" />
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
              <Input placeholder="Price" size="large" />
            </Form.Item>
          </Col>

          <Col lg={10}>
            <Form.Item name="is_active" label="Status">
              <Select placeholder="Select an Option" size="large" allowClear>
                <Option value="1">Active</Option>
                <Option value="0">Inactive</Option>
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
