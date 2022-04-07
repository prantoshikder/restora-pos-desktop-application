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
import { useEffect, useState } from 'react';
import { getDataFromDatabase } from '../../../helpers';

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
  window.get_food_name_lists_channel.send('get_food_name_lists_channel', {
    status: true,
  });

  window.get_addons_name_list.send('get_addons_name_list', { status: true });

  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [reRender, setReRender] = useState(false);
  const [updateAssignAddons, setUpdateAssignAddons] = useState(null);
  const [addonsAssign, setAddonsAssign] = useState(null);
  const [addonsAssignList, setAddonsAssignList] = useState(null);
  const [foodNames, setFoodNames] = useState(null);
  const [addonNames, setAddonNames] = useState(null);
  const [addonsList, setAddonsList] = useState(null);

  useEffect(() => {
    getDataFromDatabase(
      'get_menu_add_on_lists_channel_response',
      window.get_menu_add_on_lists_channel
    ).then((res) => {
      setAddonsList(res);
    });

    setAddonsAssign([
      {
        name: ['add_on_id'],
        value: updateAssignAddons?.addonsName,
      },
      {
        name: ['menu_id'],
        value: updateAssignAddons?.foodName,
      },
    ]);
  }, [reRender]);

  useEffect(() => {
    Promise.all([
      getDataFromDatabase(
        'get_addons_name_list_response',
        window.get_addons_name_list
      ),
      getDataFromDatabase(
        'get_food_name_lists_channel_response',
        window.get_food_name_lists_channel
      ),
    ])
      .then(([addonNames, foodNames]) => {
        setAddonNames(addonNames);
        setFoodNames(foodNames);
        let newAddonNames = [];

        addonsList?.map((addon, index) => {
          const newAddons = addonNames.find(
            (addonName) => addonName.add_on_id === addon.add_on_id
          );

          const newFoodItems = foodNames.find(
            (foodItem) => foodItem.id === addon.menu_id
          );

          newAddonNames.push({
            id: addon.id,
            addonsName: newAddons.add_on_name,
            foodName: newFoodItems?.product_name,
          });
        });

        setAddonsAssignList(newAddonNames);
      })
      .catch((err) => console.log(err));
  }, [addonsList]);

  const columns = [
    {
      title: 'Add-ons Name',
      dataIndex: 'addonsName',
      key: 'addonsName',
      width: '30%',
    },
    {
      title: 'Food Name',
      dataIndex: 'foodName',
      key: 'foodName',
      width: '40%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '20%',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => updateAddonsAssignItem(record)}>
            <EditOutlined />
            Edit
          </Button>
          <Button type="danger" onClick={() => deleteAddonsAssignItem(record)}>
            <DeleteOutlined />
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const updateAddonsAssignItem = (addonsItem) => {
    setOpenModal(true);
    setReRender((prevState) => !prevState);
    setUpdateAssignAddons(addonsItem);
    form.resetFields();
  };

  const deleteAddonsAssignItem = (addonsItem) => {
    confirm({
      title: 'Are you sure to delete this item?',
      icon: <ExclamationCircleOutlined />,
      content:
        'If you click on the ok button the item will be deleted permanently from the database. Undo is not possible.',
      onOk() {
        window.delete_menu_addons_item.send('delete_menu_addons_item', {
          id: addonsItem.id,
        });

        setAddonsAssignList(
          addonsAssignList.filter((item) => item.id !== addonsItem.id)
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

    if (updateAssignAddons?.id) {
      newAddonsAssignList.id = updateAssignAddons.id;
    }

    // // Insert or update Data
    window.context_bridge_menu_addons.send(
      'context_bridge_menu_addons',
      newAddonsAssignList
    );

    // Insert or update response
    window.context_bridge_menu_addons.once(
      'context_bridge_menu_addons_response',
      ({ status }) => {
        if (status === 'updated') {
          setReRender((prevState) => !prevState);
          closeModal();

          message.success({
            content: 'Assign addons update successfully',
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
            content: 'Assign new addons successfully',
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
    setUpdateAssignAddons({
      add_on_id: '',
      menu_id: '',
    });
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
              form.resetFields();
            }}
          >
            <PlusCircleOutlined />
            Add-ons Assign
          </Button>
        </div>

        <Table
          columns={columns}
          rowSelection={{ ...rowSelection, checkStrictly }}
          dataSource={addonsAssignList}
          pagination={true}
          rowKey={(record) => record?.id}
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
                  {addonNames?.map((addonItem) => (
                    <Option
                      key={addonItem?.add_on_id}
                      value={addonItem?.add_on_id}
                    >
                      {addonItem?.add_on_name}
                    </Option>
                  ))}
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
                  {foodNames?.map((foodItem) => (
                    <Option key={foodItem?.id} value={foodItem?.id}>
                      {foodItem?.product_name}
                    </Option>
                  ))}
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
                  {updateAssignAddons?.id ? 'Update' : 'Add'}
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
