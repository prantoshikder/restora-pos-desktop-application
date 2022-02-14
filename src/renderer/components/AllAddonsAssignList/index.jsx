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

const AllAddonsAssignList = () => {
  window.get_menu_add_on_lists_channel.send('get_menu_add_on_lists_channel', {
    status: true,
  });

  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [reRender, setReRender] = useState(false);
  const [updateAssignAddons, setUpdateAssignAddons] = useState(null);
  const [addonsAssign, setAddonsAssign] = useState();
  const [addonsAssignList, setAddonsAssignList] = useState(null);

  useEffect(() => {
    window.get_menu_add_on_lists_channel.once(
      'get_menu_add_on_lists_channel_response',
      (args = []) => {
        setAddonsAssignList(args);
      }
    );

    setAddonsAssign([
      {
        name: ['add_on_id'],
        value: updateAssignAddons?.add_on_id,
      },
      {
        name: ['menu_id'],
        value: updateAssignAddons?.menu_id,
      },
    ]);
  }, [reRender]);

  const columns = [
    {
      title: 'Add-ons Name',
      dataIndex: 'add_on_id',
      key: 'add_on_id',
      width: '30%',
    },
    {
      title: 'Food Name',
      dataIndex: 'menu_id',
      key: 'menu_id',
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

  const handleEditCategory = (addonsItem) => {
    setOpenModal(true);
    setReRender((prevState) => !prevState);
    setUpdateAssignAddons(addonsItem);
    form.resetFields();
  };

  const handleDeleteCategory = (addonsItem) => {
    confirm({
      title: 'Are you sure to delete this item?',
      icon: <ExclamationCircleOutlined />,
      content:
        'If you click on the ok button the item will be deleted permanently from the database. Undo is not possible.',
      onOk() {
        window.delete_menu_addons_item.send('delete_menu_addons_item', {
          id: addonsItem.row_id,
        });

        setAddonsAssignList(
          addonsAssignList.filter((item) => item.row_id !== addonsItem.row_id)
        );

        // get delete response
        window.delete_menu_addons_item.once(
          'delete_menu_addons_item_response',
          ({ status }) => {
            if (status) {
              message.success({
                content: 'Menu type deleted successfully',
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
    const newAddonsAssignList = {};

    for (const data of addonsAssign) {
      newAddonsAssignList[data.name[0]] =
        typeof data?.value === 'string' ? data?.value?.trim() : data?.value;
    }

    if (updateAssignAddons.row_id) {
      newAddonsAssignList.row_id = updateAssignAddons.row_id;
    }

    // // Insert Data
    window.context_bridge_menu_addons.send(
      'context_bridge_menu_addons',
      newAddonsAssignList
    );

    // Insert or update response
    window.context_bridge_menu_addons.once(
      'context_bridge_menu_addons_response',
      ({ status }) => {
        if (status === 'updated') {
          message.success({
            content: 'Assign addons update successfully',
            className: 'custom-class',
            duration: 1,
            style: {
              marginTop: '5vh',
              float: 'right',
            },
          });

          setReRender((prevState) => !prevState);
          closeModal();
        } else {
          setReRender((prevState) => !prevState);

          message.success({
            content: 'Assign new addons successfully',
            className: 'custom-class',
            duration: 1,
            style: {
              marginTop: '5vh',
              float: 'right',
            },
          });

          closeModal();
        }
      }
    );
  };

  function closeModal() {
    setOpenModal(false);
    setUpdateAssignAddons(null);
    form.resetFields();
  }

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
            Add-ons Assign
          </Button>
        </div>

        <Table
          columns={columns}
          rowSelection={{ ...rowSelection, checkStrictly }}
          dataSource={addonsAssignList}
          pagination={false}
          rowKey={(record) => record?.row_id}
        />
      </div>

      <Modal
        title="Add-ons Assign"
        visible={openModal}
        onOk={() => closeModal()}
        onCancel={() => closeModal()}
        footer={null}
        width={650}
      >
        <Row>
          <Col lg={24}>
            <Form
              form={form}
              fields={addonsAssign}
              onFinish={handleSubmit}
              onFieldsChange={(_, allFields) => {
                setAddonsAssign(allFields);
              }}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                name="add_on_id"
                label="Add-ons Name"
                rules={[
                  { required: true, message: 'Please input your addons name!' },
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
                name="menu_id"
                label="Food Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your food name!',
                  },
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
