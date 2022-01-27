import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  message,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from 'antd';
import React, { useState } from 'react';

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

const AllAddonsAssignList = () => {
  const [form] = Form.useForm();
  const [addonsName, setAddonsName] = useState('');
  const [foodName, setFoodName] = useState('');
  const [visible, setVisible] = useState(false);
  const [checkStrictly, setCheckStrictly] = useState(false);

  const columns = [
    {
      title: 'Add-ons Name',
      dataIndex: 'addonsName',
      key: 'addonsName',
      width: '30%',
    },
    {
      title: 'Food Name',
      dataIndex: 'foodName',
      key: 'foodName',
      width: '40%',
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
      addonsName: 'Coffee',
      foodName: 'takos',
    },
    {
      key: 2,
      addonsName: 'Burger',
      foodName: 'Chicken fry',
    },
    {
      key: 3,
      addonsName: 'Drinks',
      foodName: 'Chicken Kebab',
    },
    {
      key: 4,
      addonsName: 'Butter',
      foodName: 'Chicken Kebab',
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

  const changeAddonsName = (addonsName) => {
    console.log('addonsName', addonsName);
    setAddonsName(addonsName);
  };

  const changeFoodName = (foodName) => {
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
        <div className="d-flex justify-content_end mb-3">
          <Button
            type="primary"
            className="bulk_upload_btn"
            onClick={() => setVisible(true)}
          >
            <PlusCircleOutlined />
            Add-ons Assign
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
        title="Add-ons Assign"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={null}
        width={650}
      >
        <Row>
          <Col lg={24}>
            <Form
              form={form}
              onFinish={handleSubmit}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                name="addonsName"
                label="Add-ons Name"
                rules={[
                  { required: true, message: 'Please input your addons name!' },
                ]}
              >
                <Select
                  placeholder="Select Option"
                  size="large"
                  onChange={changeAddonsName}
                  value={addonsName}
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
                name="foodName"
                label="Food Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your food name!',
                  },
                ]}
              >
                <Select
                  placeholder="Select Option"
                  size="large"
                  onChange={changeFoodName}
                  value={foodName}
                  allowClear
                >
                  <Option value="pizza">Pizza</Option>
                  <Option value="dosa">Dhosa</Option>
                  <Option value="frenchFries">French Fries</Option>
                  <Option value="chickenKebab">Chicken Kebab</Option>
                  <Option value="burger">Burger</Option>
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

export default AllAddonsAssignList;
