import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';

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

const FoodVariantList = () => {
  const [form] = Form.useForm();
  const [foodName, setFoodName] = useState('');
  const [visible, setVisible] = useState(false);
  const [checkStrictly, setCheckStrictly] = useState(false);

  const [foodVariant, setFoodVariant] = useState([]);
  const [updateFoodVariant, setUpdateFoodVariant] = useState({});

  useEffect(() => {
    setFoodVariant([
      {
        name: ['food_name'],
        value: updateFoodVariant.foodName,
      },
      {
        name: ['food_variant'],
        value: updateFoodVariant.variantName,
      },
      {
        name: ['food_price'],
        value: updateFoodVariant.food_price,
      },
    ]);
  }, []);

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

  const handleEditCategory = (variantItem) => {
    setVisible(true);
    setUpdateFoodVariant(variantItem);
    console.log('Edit', variantItem);
  };

  const handleDeleteCategory = (variantItem) => {
    confirm({
      title: 'Are you sure to delete this item?',
      icon: <ExclamationCircleOutlined />,
      content:
        'If you click on the ok button the item will be deleted permanently from the database. Undo is not possible.',
      onOk() {
        console.log('Delete', variantItem.key);
        window.delete_foods_variant.send('delete_foods_variant', {
          id: variantItem.key,
        });

        window.delete_foods_variant.once(
          'delete_foods_variant_response',
          ({ status }) => {
            if (status) {
              console.log(status);

              message.success({
                content: 'Food variant deleted successfully',
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
    const newFoodVariant = {};

    for (const data of foodVariant) {
      newFoodVariant[data.name[0]] =
        typeof data.value === 'string' ? data?.value?.trim() : data?.value;
    }

    window.add_new_foods_variant.send('add_new_foods_variant', newFoodVariant);

    console.log('newFoodVariant', newFoodVariant);

    newFoodVariant.food_variant_id = state.food_variant_id;

    window.add_new_foods_variant.once(
      'add_new_foods_variant_response',
      (args) => {
        console.log('add food variant', args);
        setVisible(false);
        form.resetFields();
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
        <div className="flex content_end content_center mb-3">
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
          rowKey={(record) => record.key}
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
          <Col lg={24}>
            <Form
              form={form}
              fields={foodVariant}
              onFinish={handleSubmit}
              onFieldsChange={(_, allFields) => {
                setFoodVariant(allFields);
              }}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                name="food_name"
                label="Food Name"
                rules={[
                  { required: true, message: 'Please input your food name!' },
                ]}
              >
                <Select placeholder="Select Option" size="large" allowClear>
                  <Option value="1">Pizza</Option>
                  <Option value="2">Dhosa</Option>
                  <Option value="3">French Fries</Option>
                  <Option value="4">Chicken Kebab</Option>
                  <Option value="5">Burger</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Variant Name"
                name="food_variant"
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
                name="food_price"
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
