import {
  DeleteOutlined,
  EditOutlined,
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
import React, { useState } from 'react';

const { Option } = Select;
const { Dragger } = Upload;

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

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const MenuTypeList = () => {
  const [form] = Form.useForm();
  const [status, setStatus] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [checkStrictly, setCheckStrictly] = useState(false);

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

  function handleEditCategory(record) {
    setOpenModal(true);
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

  const handleChangeStatus = (value) => {
    console.log('status', value);
    setStatus(value);
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
            onClick={() => setOpenModal(true)}
          >
            <PlusCircleOutlined />
            Add Menu Type
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
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Menu Type"
                name="menuType"
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
                name="icon"
                tooltip={{
                  title: 'Use only .jpg,.jpeg,.gif and .png Images & Image',
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <PictureOutlined />
                  </p>
                  <p className="ant-upload-hint">
                    Click or drag file to this area to upload
                  </p>
                </Dragger>
              </Form.Item>

              <Form.Item name="status" label="Status">
                <Select
                  placeholder="Select an Option"
                  value={status}
                  onChange={handleChangeStatus}
                  size="large"
                  allowClear
                >
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
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
