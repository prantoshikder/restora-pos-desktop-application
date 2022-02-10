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
  // Variant list
  window.variant_lists_channel.send('variant_lists_channel', { status: true });

  const [form] = Form.useForm();
  const [foodName, setFoodName] = useState(null);
  const [visible, setVisible] = useState(false);
  const [checkStrictly, setCheckStrictly] = useState(false);

  const [foodVariant, setFoodVariant] = useState([]);
  const [updateFoodVariant, setUpdateFoodVariant] = useState({});
  const [foodVariantList, setFoodVariantList] = useState(null);
  const [ReRender, setReRender] = useState(false);

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

    // Get food variant data
    window.variant_lists_channel.once('variant_lists_response', (args) => {
      setFoodVariantList(args);
    });

    setFoodVariant([
      {
        name: ['food_id'],
        value: updateFoodVariant?.ProductName,
      },
      {
        name: ['food_variant'],
        value: updateFoodVariant?.variant_name,
      },
      {
        name: ['food_price'],
        value: updateFoodVariant?.price,
      },
    ]);
  }, [ReRender]);

  const columns = [
    {
      title: 'Variant Name',
      dataIndex: 'variant_name',
      key: 'variant_name',
      width: '30%',
    },
    {
      title: 'Food Name',
      dataIndex: 'ProductName',
      key: 'ProductName',
      width: '45%',
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

  const handleEditCategory = (variantItem) => {
    setVisible(true);
    setUpdateFoodVariant(variantItem);
    setReRender((prevState) => !prevState);
  };

  const handleDeleteCategory = (variantItem) => {
    confirm({
      title: 'Are you sure to delete this item?',
      icon: <ExclamationCircleOutlined />,
      content:
        'If you click on the ok button the item will be deleted permanently from the database. Undo is not possible.',
      onOk() {
        window.delete_foods_variant.send('delete_foods_variant', {
          id: variantItem.variant_id,
        });

        setFoodVariantList(
          foodVariantList.filter(
            (variantName) => variantName.variant_id !== variantItem.variant_id
          )
        );

        window.delete_foods_variant.once(
          'delete_foods_variant_response',
          ({ status }) => {
            if (status) {
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

    newFoodVariant.variant_id = updateFoodVariant.variant_id;

    // Insert & update
    window.add_new_foods_variant.send('add_new_foods_variant', newFoodVariant);

    // Insert or update response
    window.add_new_foods_variant.once(
      'add_new_foods_variant_response',
      (args) => {
        if (args === 'update') {
          message.success({
            content: 'Food variant deleted successfully',
            className: 'custom-class',
            duration: 1,
            style: {
              marginTop: '5vh',
              float: 'right',
            },
          });

          setVisible(false);
        } else {
          setReRender((prevState) => !prevState);

          message.success({
            content: 'Food variant deleted successfully',
            className: 'custom-class',
            duration: 1,
            style: {
              marginTop: '5vh',
              float: 'right',
            },
          });

          setVisible(false);
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
        <div className="flex content_end mb-3">
          <Button type="primary" onClick={() => setVisible(true)}>
            <PlusCircleOutlined />
            Add Variant
          </Button>
        </div>

        <Table
          columns={columns}
          rowSelection={{ ...rowSelection, checkStrictly }}
          dataSource={foodVariantList}
          pagination={false}
          rowKey={(record) => record?.variant_id}
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
