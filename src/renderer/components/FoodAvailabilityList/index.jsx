import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
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
import { useEffect, useState } from 'react';

const { Title } = Typography;
const { Option } = Select;
const { confirm } = Modal;

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
  // Get food name list channel
  window.food_lists_channel.send('food_lists_channel', { status: true });

  // Get food availability day & time lists
  window.get_food_availability_lists_channel.send(
    'get_food_availability_lists_channel',
    { status: true }
  );

  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [foodName, setFoodName] = useState(null);
  const [availableStartTime, setAvailableStartTime] = useState('');
  const [availableEndTime, setAvailableEndTime] = useState('');
  const [reRender, setReRender] = useState(false);
  const [foodAvailability, setFoodAvailability] = useState([]);
  const [updateAvailableItem, setUpdateAvailableItem] = useState({});
  const [foodAvailabilityList, setFoodAvailabilityList] = useState(null);

  useEffect(() => {
    // Get food availability day & time lists
    window.get_food_availability_lists_channel.once(
      'get_food_availability_lists_channel_response',
      (args = []) => {
        const foodAvailableList =
          Array.isArray(args) &&
          args?.map((element) => {
            if (element.is_active === 1) {
              element.is_active = 'Active';
            } else {
              element.is_active = 'Inactive';
            }
          });

        setFoodAvailabilityList(args);
      }
    );

    // Get active food name
    window.food_lists_channel.once('food_lists_response', (args = []) => {
      const foodNameList =
        Array.isArray(args) &&
        args?.filter(
          (foodItem) => foodItem.is_active !== 0 && foodItem.is_active !== null
        );
      setFoodName(foodNameList);
    });

    setFoodAvailability([
      {
        name: ['food_id'],
        value: updateAvailableItem?.food_id,
      },
      {
        name: ['avail_day'],
        value: updateAvailableItem?.avail_day,
      },
      {
        name: ['avail_time'],
        // value: ,
      },
      {
        name: ['is_active'],
        value: updateAvailableItem?.is_active || 'Active',
      },
    ]);
  }, [reRender]);

  const columns = [
    {
      title: 'Food Name',
      dataIndex: 'product_name',
      key: 'product_name',
      width: '30%',
    },
    {
      title: 'Available Day',
      dataIndex: 'avail_day',
      key: 'avail_day',
      width: '35%',
    },
    {
      title: 'Available Time',
      dataIndex: 'avail_time',
      key: 'avail_time',
      width: '25%',
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      key: 'is_active',
      width: '25%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '20%',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => updateFoodAvailabilityItem(record)}
          >
            <EditOutlined />
            Edit
          </Button>
          <Button
            type="danger"
            onClick={() => deleteFoodAvailabilityItem(record)}
          >
            <DeleteOutlined />
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const updateFoodAvailabilityItem = (availableFoodItem) => {
    setOpenModal(true);
    setReRender((prevState) => !prevState);
    setUpdateAvailableItem(availableFoodItem);
  };

  const deleteFoodAvailabilityItem = (availableFoodItem) => {
    confirm({
      title: 'Are you sure to delete this item?',
      icon: <ExclamationCircleOutlined />,
      content:
        'If you click on the ok button the item will be deleted permanently from the database. Undo is not possible.',
      onOk() {
        window.channel_delete_food_available_day_time.send(
          'channel_delete_food_available_day_time',
          { id: availableFoodItem.id }
        );

        setFoodAvailabilityList(
          foodAvailabilityList.filter(
            (item) => item.id !== availableFoodItem.id
          )
        );

        // get delete response
        window.channel_delete_food_available_day_time.once(
          'delete_food_available_day_time_response',
          ({ status }) => {
            if (status) {
              message.success({
                content: 'Available food deleted successfully',
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
      },
      onCancel() {},
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

    if (updateAvailableItem.id) {
      newFoodAvailable.id = updateAvailableItem.id;
    }

    // Insert or updated add_food_available_day_time
    window.context_bridge_food_available_time.send(
      'context_bridge_food_available_time',
      newFoodAvailable
    );

    // Insert or update response
    window.context_bridge_food_available_time.once(
      'context_bridge_food_available_time_response',
      ({ status }) => {
        if (status === 'updated') {
          message.success({
            content: 'Food availability update successfully',
            className: 'custom-class',
            duration: 1,
            style: {
              marginTop: '5vh',
              float: 'right',
            },
          });

          setReRender((prevState) => !prevState);
          setOpenModal(false);
          form.resetFields();
        } else {
          setReRender((prevState) => !prevState);

          message.success({
            content: 'Food availability added successfully',
            className: 'custom-class',
            duration: 1,
            style: {
              marginTop: '5vh',
              float: 'right',
            },
          });

          setOpenModal(false);
          form.resetFields();
        }
      }
    );
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
            onClick={() => {
              setOpenModal(true);
              setUpdateAvailableItem({});
              form.resetFields();
            }}
          >
            <PlusCircleOutlined />
            Add Available Day & Time
          </Button>
        </div>

        <Table
          columns={columns}
          rowSelection={{ ...rowSelection, checkStrictly }}
          dataSource={foodAvailabilityList}
          pagination={true}
          rowKey={(record) => record?.id}
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
                    <Option key={foodName?.id} value={foodName?.id}>
                      {foodName?.product_name}
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
                    name="avail_time"
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
                    name="avail_time"
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
                  {updateAvailableItem?.food_id ? 'Update' : 'Add'}
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
