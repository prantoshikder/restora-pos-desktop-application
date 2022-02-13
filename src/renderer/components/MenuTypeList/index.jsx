import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  PictureOutlined,
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
  Upload,
} from 'antd';
import React, { useEffect, useState } from 'react';

const { Option } = Select;
const { Dragger } = Upload;
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

const MenuTypeList = () => {
  window.get_menu_type_lists_channel.send('get_menu_type_lists_channel', {
    status: true,
  });

  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [updateMenuType, setUpdateMenuType] = useState({});
  const [menuTypes, setMenuTypes] = useState([]);
  const [menuTypesList, setMenuTypesList] = useState(null);
  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    window.get_menu_type_lists_channel.once(
      'get_menu_type_lists_channel_response',
      (args = []) => {
        setMenuTypesList(args);
      }
    );

    setMenuTypes([
      {
        name: 'menu_type',
        // value: ,
      },
      {
        name: 'menu_icon',
        // value: ,
      },
      {
        name: 'status',
        value: 'Active',
      },
    ]);
  }, []);

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e;
  };

  const columns = [
    {
      title: 'Menu Type',
      dataIndex: 'menuType',
      key: 'menuType',
      width: '30%',
    },
    {
      title: 'Icon',
      dataIndex: 'icon',
      width: '55%',
      key: 'icon',
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
      menuType: 'Party',
      icon: './application/modules/itemmanage/assets/images/2020-11-21/p.png',
    },
    {
      key: 2,
      menuType: 'Coffee',
      icon: './application/modules/itemmanage/assets/images/2020-11-21/p.png',
    },
  ];

  const handleEditCategory = (menuItem) => {
    setOpenModal(true);
    // setReRender((prevState) => !prevState);
    setUpdateMenuType(menuItem);
    form.resetFields();
    console.log('Edit', menuItem);
  };

  const handleDeleteCategory = (menuItem) => {
    confirm({
      title: 'Are you sure to delete this item?',
      icon: <ExclamationCircleOutlined />,
      content:
        'If you click on the ok button the item will be deleted permanently from the database. Undo is not possible.',
      onOk() {
        console.log('Delete', menuItem);

        // setMenuTypesList(
        //   menuTypesList.filter(
        //     (item) => item.menuType_id !== menuItem.menuType_id
        //   )
        // );

        // get delete response

        message.success({
          content: 'Foods category added successfully ',
          className: 'custom-class',
          duration: 1,
          style: {
            marginTop: '5vh',
            float: 'right',
          },
        });
      },
      onCancel() {},
    });
  };

  const handleReset = () => {
    form.resetFields();
  };

  const handleSubmit = () => {
    const newMenuType = {};

    for (const data of menuTypes) {
      newMenuType[data.name[0]] =
        typeof data?.value === 'string' ? data?.value?.trim() : data?.value;
    }

    newMenuType.status === 'Active'
      ? (newMenuType.status = 1)
      : parseInt(newMenuType.status) === 1
      ? (newMenuType.status = 1)
      : (newMenuType.status = 0);

    if (updateMenuType.menuType_id) {
      newMenuType.menuType_id = updateMenuType.menuType_id;
    }

    console.log('newMenuType', newMenuType);

    // Insert Data
    window.context_bridge_menu_type.send(
      'context_bridge_menu_type',
      newMenuType
    );

    form.resetFields();
    setOpenModal(false);
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
            Add Menu Type
          </Button>
        </div>

        <Table
          columns={columns}
          rowSelection={{ ...rowSelection, checkStrictly }}
          dataSource={menuTypesList}
          pagination={false}
          rowKey={(record) => record.key}
        />
      </div>

      <Modal
        title="Add Menu Type"
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
              onFinish={handleSubmit}
              fields={menuTypes}
              onFieldsChange={(_, allFields) => {
                setMenuTypes(allFields);
              }}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Menu Type"
                name="menu_type"
                rules={[
                  {
                    required: true,
                    message: 'Menu Type is required',
                  },
                ]}
              >
                <Input placeholder="Menu Type" size="large" />
              </Form.Item>

              <Form.Item
                label="Icon"
                name="menu_icon"
                getValueFromEvent={normFile}
                tooltip={{
                  title: 'Use only .jpg,.jpeg,.gif and .png Images & Image',
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Upload.Dragger name="files" action="/upload.do">
                  <p className="ant-upload-drag-icon">
                    <PictureOutlined />
                  </p>
                  <p className="ant-upload-hint">
                    Click or drag file to this area to upload
                  </p>
                </Upload.Dragger>
              </Form.Item>

              <Form.Item name="status" label="Status">
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

export default MenuTypeList;
