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
  // Food list
  window.food_lists_channel.send('food_lists_channel', { status: true });
  // Varint list
  window.variant_lists_channel.send('variant_lists_channel', { status: true });

  window.variant_lists_channel.once('variant_lists_response', (args)=>{
    console.log("variant_lists_response",args);
  })

  const [form] = Form.useForm();
  const [foodName, setFoodName] = useState(null);
  const [visible, setVisible] = useState(false);
  const [checkStrictly, setCheckStrictly] = useState(false);

  const [foodVariant, setFoodVariant] = useState([]);
  const [updateFoodVariant, setUpdateFoodVariant] = useState({});

  useEffect(() => {
    // Get active & inactive food name
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

    setFoodVariant([
      {
        name: ['food_id'],
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

    newFoodVariant.food_variant_id = updateFoodVariant.food_variant_id;
    console.log('newFoodVariant', newFoodVariant);

    // Insert & update
    window.add_new_foods_variant.send('add_new_foods_variant', newFoodVariant);

    // Delete response
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
        <div className="flex content_end mb-3">
          <Button type="primary" onClick={() => setVisible(true)}>
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
