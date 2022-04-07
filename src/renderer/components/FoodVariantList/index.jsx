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

const FoodVariantList = () => {
  // Food name list
  window.food_lists_channel.send('food_lists_channel', { status: true });

  // Variant list
  window.variant_lists_channel.send('variant_lists_channel', { status: true });

  const [form] = Form.useForm();
  const [foodName, setFoodName] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [checkStrictly, setCheckStrictly] = useState(false);

  const [foodVariant, setFoodVariant] = useState([]);
  const [updateFoodVariant, setUpdateFoodVariant] = useState({});
  const [foodVariantList, setFoodVariantList] = useState(null);
  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    // Get active food name
    window.food_lists_channel.once('food_lists_response', (args = []) => {
      const foodNameList =
        Array.isArray(args) &&
        args?.filter(
          (foodItem) => foodItem.is_active !== 0 && foodItem.is_active !== null
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
        value: updateFoodVariant?.product_name,
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
  }, [reRender]);

  const columns = [
    {
      title: 'Variant Name',
      dataIndex: 'variant_name',
      key: 'variant_name',
      width: '30%',
    },
    {
      title: 'Food Name',
      dataIndex: 'product_name',
      key: 'product_name',
      width: '45%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '20%',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEditFoodVariant(record)}>
            <EditOutlined />
            Edit
          </Button>

          <Button type="danger" onClick={() => handleDeleteFoodVariant(record)}>
            <DeleteOutlined />
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleEditFoodVariant = (variantItem) => {
    setOpenModal(true);
    setUpdateFoodVariant(variantItem);
    setReRender((prevState) => !prevState);
  };

  const handleDeleteFoodVariant = (variantItem) => {
    confirm({
      title: 'Are you sure to delete this item?',
      icon: <ExclamationCircleOutlined />,
      content:
        'If you click on the ok button the item will be deleted permanently from the database. Undo is not possible.',
      onOk() {
        window.delete_foods_variant.send('delete_foods_variant', {
          id: variantItem.id,
        });

        setFoodVariantList(
          foodVariantList.filter(
            (variantName) => variantName.id !== variantItem.id
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

    if (updateFoodVariant.id) {
      newFoodVariant.id = updateFoodVariant.id;
    }

    if (updateFoodVariant.food_id) {
      newFoodVariant.food_id = updateFoodVariant.food_id;
    }

    // Insert & update
    window.add_new_foods_variant.send('add_new_foods_variant', newFoodVariant);

    // Insert or update response
    window.add_new_foods_variant.once(
      'add_new_foods_variant_response',
      (args) => {
        if (args === 'updated') {
          message.success({
            content: 'Food variant updated successfully',
            className: 'custom-class',
            duration: 1,
            style: {
              marginTop: '5vh',
              float: 'right',
            },
          });

          setOpenModal(false);
          form.resetFields();
        } else {
          setReRender((prevState) => !prevState);

          message.success({
            content: 'Food variant added successfully',
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
        <div className="flex  mb-3">
          <Button
            type="primary"
            onClick={() => {
              setOpenModal(true);
              form.resetFields();
              setUpdateFoodVariant({});
            }}
          >
            <PlusCircleOutlined />
            Add Variant
          </Button>
        </div>

        <Table
          columns={columns}
          rowSelection={{ ...rowSelection, checkStrictly }}
          dataSource={foodVariantList}
          pagination={true}
          rowKey={(record) => record?.id}
        />
      </div>

      <Modal
        title="Add Variant"
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
                    <Option key={foodName?.id} value={foodName?.id}>
                      {foodName?.product_name}
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
                  {updateFoodVariant?.food_id ? 'Update' : 'Add'}
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
