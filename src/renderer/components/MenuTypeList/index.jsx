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
  Image,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Upload,
} from 'antd';
import { getDataFromDatabase } from 'helpers';
import { useEffect, useState } from 'react';
import defaultImage from '../../../../assets/default.jpg';

const { Option } = Select;
const { Dragger } = Upload;
const { confirm } = Modal;

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {},
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

const MenuTypeList = () => {
  // Get Menu type list
  window.get_menu_type_lists.send('get_menu_type_lists', {
    status: true,
  });

  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [updateMenuType, setUpdateMenuType] = useState(null);
  const [menuTypes, setMenuTypes] = useState();
  const [menuTypesList, setMenuTypesList] = useState(null);
  const [reRender, setReRender] = useState(false);
  const [menuTypeIcon, setMenuTypeIcon] = useState(null);

  useEffect(() => {
    setMenuTypes([
      {
        name: 'menu_type',
        value: updateMenuType?.menu_type,
      },
      {
        name: 'is_active',
        value: updateMenuType?.is_active || 'Active',
      },
    ]);

    getDataFromDatabase(
      'get_menu_type_lists_response',
      window.get_menu_type_lists
    ).then((res) => {
      const foodAvailableList =
        Array.isArray(res) &&
        res?.map((element) => {
          if (element.is_active === 1) {
            element.is_active = 'Active';
          } else {
            element.is_active = 'Inactive';
          }
        });

      setMenuTypesList(res);
    });
  }, [reRender]);

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const fileList = [];

  const columns = [
    {
      title: 'Icon',
      dataIndex: 'menu_icon',
      key: 'menu_icon',
      width: '55%',
      render: (text, record) => (
        <Image
          src={`file://${record.menu_icon}`}
          width={50}
          height={50}
          className="category_image"
          fallback={defaultImage}
          preview={false}
        />
      ),
    },
    {
      title: 'Menu Type',
      dataIndex: 'menu_type',
      key: 'menu_type',
      width: '30%',
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      key: 'is_active',
      width: '55%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '20%',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEditMenuType(record)}>
            <EditOutlined />
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDeleteMenuType(record)}>
            <DeleteOutlined />
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleEditMenuType = (menuTypeItem) => {
    setOpenModal(true);
    setReRender((prevState) => !prevState);
    setUpdateMenuType(menuTypeItem);
    form.resetFields();
  };

  const handleDeleteMenuType = (menuTypeItem) => {
    confirm({
      title: 'Are you sure to delete this item?',
      icon: <ExclamationCircleOutlined />,
      content:
        'If you click on the ok button the item will be deleted permanently from the database. Undo is not possible.',
      onOk() {
        window.delete_menu_type_item.send('delete_menu_type_item', {
          id: menuTypeItem.id,
        });

        setMenuTypesList(
          menuTypesList.filter((item) => item.id !== menuTypeItem.id)
        );

        // get delete response
        window.delete_menu_type_item.once(
          'delete_menu_type_item_response',
          ({ is_active }) => {
            if (is_active) {
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
    const newMenuType = {};

    for (const data of menuTypes) {
      newMenuType[data.name[0]] =
        typeof data?.value === 'string' ? data?.value?.trim() : data?.value;
    }

    newMenuType.is_active === 'Active'
      ? (newMenuType.is_active = 1)
      : parseInt(newMenuType.is_active) === 1
      ? (newMenuType.is_active = 1)
      : (newMenuType.is_active = 0);

    if (updateMenuType?.id) {
      newMenuType.id = updateMenuType?.id;
    }

    if (menuTypeIcon) {
      newMenuType.menu_icon = JSON.stringify({
        name: menuTypeIcon.name,
        path: menuTypeIcon.path,
      });
    } else {
      newMenuType.menu_icon = updateMenuType?.menu_icon;
    }

    // Insert Data
    window.context_bridge_menu_type.send(
      'context_bridge_menu_type',
      newMenuType
    );

    // Insert or update response
    window.context_bridge_menu_type.once(
      'context_bridge_menu_type_response',
      ({ is_active }) => {
        if (is_active === 'updated') {
          setReRender((prevState) => !prevState);
          closeModal();

          message.success({
            content: 'Food menu type update successfully',
            className: 'custom-class',
            duration: 1,
            style: {
              marginTop: '5vh',
              float: 'right',
            },
          });
        } else {
          setReRender((prevState) => !prevState);
          closeModal();

          message.success({
            content: 'Food menu type added successfully',
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
  };

  function closeModal() {
    setOpenModal(false);
    setUpdateMenuType(null);
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
            onClick={() => {
              setOpenModal(true);
              setUpdateMenuType({});
              form.resetFields();
            }}
          >
            <PlusCircleOutlined />
            Add Menu Type
          </Button>
        </div>

        <Table
          columns={columns}
          rowSelection={{ ...rowSelection, checkStrictly }}
          dataSource={menuTypesList}
          pagination={true}
          rowKey={(record) => record.id}
        />
      </div>

      <Modal
        title="Add Menu Type"
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
                valuePropName="menu_icon"
                getValueFromEvent={normFile}
                tooltip={{
                  title: 'Use only .jpg, .jpeg, .gif and .png image',
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Row gutter={20}>
                  <Col lg={17}>
                    <Upload.Dragger
                      name="files"
                      customRequest={(imageObj) => {
                        setMenuTypeIcon(imageObj.file);
                      }}
                      accept=".jpg, .png, .jpeg, .gif"
                      showUploadList={false}
                    >
                      <p className="ant-upload-drag-icon">
                        <PictureOutlined />
                      </p>
                      <p className="ant-upload-hint">
                        Click or drag file to this area to upload
                      </p>
                    </Upload.Dragger>
                  </Col>

                  <Col lg={7}>
                    <h3>Preview</h3>
                    {menuTypeIcon ? (
                      <Image
                        width={125}
                        src={URL.createObjectURL(menuTypeIcon)}
                        preview={false}
                      />
                    ) : (
                      updateMenuType?.menu_icon && (
                        <Image
                          width={125}
                          src={`file://${updateMenuType?.menu_icon}`}
                          preview={false}
                        />
                      )
                    )}
                  </Col>
                </Row>
              </Form.Item>

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
                  {updateMenuType?.id ? 'Update' : 'Add'}
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
