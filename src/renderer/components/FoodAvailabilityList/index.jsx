import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
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
  TimePicker,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';

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

const FoodAvailabilityList = () => {
  // Food name list
  window.food_lists_channel.send('food_lists_channel', { status: true });

  const [form] = Form.useForm();
  const [availableStartTime, setAvailableStartTime] = useState('');
  const [availableEndTime, setAvailableEndTime] = useState('');
  const [foodAvailability, setFoodAvailability] = useState([]);

  const [checkStrictly, setCheckStrictly] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [reRender, setReRender] = useState(false);
  const [foodName, setFoodName] = useState(null);

  useEffect(() => {
    // Get active food name
    window.food_lists_channel.once('food_lists_response', (args = []) => {
      const foodNameList =
        Array.isArray(args) &&
        args?.filter(
          (foodItem) =>
            foodItem.ProductsIsActive !== 0 &&
            foodItem.ProductsIsActive !== null
        );
      setFoodName(foodNameList);
    });

    setFoodAvailability([
      {
        name: ['food_id'],
        // value: ,
      },
      {
        name: ['avail_day'],
        // value: ,
      },
      {
        name: ['avail_time'],
        // value: ,
      },
      {
        name: ['is_active'],
        value: 'Active',
      },
    ]);
  }, []);

  const columns = [
    {
      title: 'Food Name',
      dataIndex: 'foodName',
      key: 'foodName',
      width: '30%',
    },
    {
      title: 'Available Day',
      dataIndex: 'availableDay',
      width: '35%',
      key: 'availableDay',
    },
    {
      title: 'Available Time',
      dataIndex: 'availableTime',
      width: '25%',
      key: 'availableTime',
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
      foodName: 'Chicken Fry',
      availableDay: 'Saturday',
      availableTime: '00:00:00 - 00:00:00',
    },
    {
      key: 2,
      foodName: 'Burger',
      availableDay: 'Monday',
      availableTime: '00:00:00 - 00:00:00',
    },
  ];

  const handleEditCategory = (record) => {
    setOpenModal(true);
    console.log('Edit', record);
  };

  const handleDeleteCategory = (record) => {
    console.log('Delete', record);
    message.success({
      content: 'Available food deleted successfully ',
      className: 'custom-class',
      duration: 1,
      style: {
        marginTop: '5vh',
        float: 'right',
      },
    });
  };

  const handleReset = () => {
    form.resetFields();
  };

  const handleSubmit = () => {
    const newFoodAvailable = {};

    const avail_time = `${availableStartTime}, ${availableEndTime}`;

    for (const data of foodAvailability) {
      newFoodAvailable[data.name[0]] =
        typeof data?.value === 'string' ? data?.value?.trim() : data?.value;
    }

    newFoodAvailable.is_active === 'Active'
      ? (newFoodAvailable.is_active = 1)
      : parseInt(newFoodAvailable.is_active) === 1
      ? (newFoodAvailable.is_active = 1)
      : (newFoodAvailable.is_active = 0);

    newFoodAvailable.avail_time = avail_time;

    // if(foodAvailability.availableFood_id) {
    //   newFoodAvailable.availableFood_id = foodAvailability.availableFood_id;
    // }

    console.log('newFoodAvailable', newFoodAvailable);

    // setReRender((prevState) => !prevState);
    message.success({
      content: 'Available food added successfully',
      className: 'custom-class',
      duration: 1,
      style: {
        marginTop: '5vh',
        float: 'right',
      },
    });
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
            onClick={() => setOpenModal(true)}
          >
            <PlusCircleOutlined />
            Add Available Day & Time
          </Button>
        </div>

        <Table
          columns={columns}
          rowSelection={{ ...rowSelection, checkStrictly }}
          dataSource={data}
          pagination={false}
          rowKey={(record) => record.key}
        />
      </div>

      <Modal
        title="Add Available Day & Time"
        visible={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        footer={null}
        width={650}
      >
        <Row>
          <Col lg={24}>
            <Form
              form={form}
              fields={foodAvailability}
              onFinish={handleSubmit}
              onFieldsChange={(_, allFields) => {
                setFoodAvailability(allFields);
              }}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                name="food_id"
                label="Food Name"
                rules={[
                  { required: true, message: 'Please input your food name!' },
                ]}
              >
                <Select placeholder="Select Option" size="large" allowClear>
                  {foodName?.map((foodName) => (
                    <Option
                      key={foodName?.ProductsID}
                      value={foodName?.ProductsID}
                    >
                      {foodName?.ProductName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="avail_day"
                label="Available Day"
                rules={[
                  {
                    required: true,
                    message: 'Please input your available day!',
                  },
                ]}
                tooltip={{
                  title: 'Use day name Like: Saturday, Sunday, ......',
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Select placeholder="Select Option" size="large" allowClear>
                  <Option value="saturday">Saturday</Option>
                  <Option value="sunday">Sunday</Option>
                  <Option value="monday">Monday</Option>
                  <Option value="tuesday">Tuesday</Option>
                  <Option value="wednesday">Wednesday</Option>
                  <Option value="thursday">Thursday</Option>
                  <Option value="friday">Friday</Option>
                </Select>
              </Form.Item>

              <Row gutter={20}>
                <Col lg={12}>
                  <Form.Item
                    label="From Time"
                    name="from_time"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your from time!',
                      },
                    ]}
                  >
                    <TimePicker
                      placeholder="From Time"
                      size="large"
                      onChange={(value, timeString) =>
                        setAvailableStartTime(timeString)
                      }
                    />
                  </Form.Item>
                </Col>

                <Col lg={12}>
                  <Form.Item
                    label="To Time"
                    name="to_time"
                    style={{ marginLeft: 'auto' }}
                    rules={[
                      { required: true, message: 'Please input your to time!' },
                    ]}
                  >
                    <TimePicker
                      placeholder="To Time"
                      size="large"
                      onChange={(value, timeString) =>
                        setAvailableEndTime(timeString)
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="is_active" label="Status">
                <Select placeholder="Select an Option" size="large" allowClear>
                  <Option value="1">Active</Option>
                  <Option value="0">Inactive</Option>
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

export default FoodAvailabilityList;
