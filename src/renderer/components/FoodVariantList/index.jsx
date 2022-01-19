import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  Space,
  Table,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

const { Title } = Typography;
const { Option } = Select;

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    );
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

const FoodVariantList = () => {
  const [form] = Form.useForm();
  const [foodName, setFoodName] = useState('');
  const [visible, setVisible] = useState(false);
  const [checkStrictly, setCheckStrictly] = useState(false);

  const columns = [
    {
      title: 'Variant Name',
      dataIndex: 'variantName',
      key: 'variantName',
      width: '30%',
    },
    {
      title: 'Food Name',
      dataIndex: 'foodName',
      width: '45%',
      key: 'foodName',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '20%',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEditCategory(record)}>
            <EditOutlined />
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDeleteCategory(record)}>
            <DeleteOutlined />
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: 1,
      variantName: 'Regular',
      foodName: 'Oven Roasted Eggplant',
    },
    {
      key: 2,
      variantName: 'Italian',
      foodName: 'Veggie Omelette',
    },
    {
      key: 3,
      variantName: 'Burger',
      foodName: 'BOMA BURGER',
    },
    {
      key: 4,
      variantName: 'Italian',
      foodName: 'Arancini',
    },
    {
      key: 5,
      variantName: 'Regular',
      foodName: 'Fool Plate',
    },
  ];

  function handleEditCategory(record) {
    setVisible(true);
    console.log('Edit', record);
    // message.success({
    //   content: 'Foods category added successfully ',
    //   className: 'custom-class',
    //   duration: 1,
    //   style: {
    //     marginTop: '5vh',
    //     float: 'right',
    //   },
    // });
  }

  function handleDeleteCategory(record) {
    console.log('Delete', record);
    message.success({
      content: 'Foods category added successfully ',
      className: 'custom-class',
      duration: 1,
      style: {
        marginTop: '5vh',
        float: 'right',
      },
    });
  }

  const handleChangeFoodVariant = (foodName) => {
    console.log('status', foodName);
    setFoodName(foodName);
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
      <div
        style={{
          margin: '0rem 1.5rem',
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        }}
      >
        <div className="d-flex justify-content-end mb-3">
          <Button
            type="primary"
            className="bulk_upload_btn"
            onClick={() => setVisible(true)}
          >
            <PlusCircleOutlined />
            Add Variant
          </Button>
        </div>

        <Table
          columns={columns}
          rowSelection={{ ...rowSelection, checkStrictly }}
          dataSource={data}
          pagination={false}
        />
      </div>

      <Modal
        title="Add Variant"
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
                name="foodName"
                label="Food Name"
                rules={[
                  { required: true, message: 'Please input your food name!' },
                ]}
              >
                <Select
                  placeholder="Select Option"
                  onChange={handleChangeFoodVariant}
                  value={foodName}
                  size="large"
                  allowClear
                >
                  <Option value="pizza">Pizza</Option>
                  <Option value="dosa">Dhosa</Option>
                  <Option value="frenchFries">French Fries</Option>
                  <Option value="chickenKebab">Chicken Kebab</Option>
                  <Option value="burger">Burger</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Variant Name"
                name="variantName"
                rules={[
                  {
                    required: true,
                    message: 'Please input your variant name!',
                  },
                ]}
              >
                <Input placeholder="Add Variant" size="large" />
              </Form.Item>

              <Form.Item
                label="Price"
                name="price"
                rules={[
                  { required: true, message: 'Please input your price!' },
                ]}
              >
                <Input placeholder="Price" size="large" />
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

export default FoodVariantList;
