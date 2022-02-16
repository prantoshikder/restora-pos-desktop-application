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
  Modal,
  Row,
  Select,
  Space,
  Table,
} from 'antd';
import React, { useEffect, useState } from 'react';

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

const { Option } = Select;
const { confirm } = Modal;

const CurrencyList = () => {
  const [form] = Form.useForm();
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [addCurrency, setAddCurrency] = useState(null);
  const [reRender, setReRender] = useState(false);
  const [updateCurrencyAdd, setUpdateCurrencyAdd] = useState({});
  const [currencyLists, setCurrencyLists] = useState([]);

  useEffect(() => {
    setAddCurrency([
      {
        name: ['currency_name'],
        value: updateCurrencyAdd?.currency_name,
      },
      {
        name: ['currency_icon'],
        value: updateCurrencyAdd?.currency_icon,
      },
      {
        name: ['currency_rate'],
        value: updateCurrencyAdd?.currency_rate,
      },
      {
        name: ['position'],
        value: updateCurrencyAdd?.position,
      },
    ]);
  }, []);

  const columns = [
    {
      title: 'Currency Name',
      dataIndex: 'currencyName',
      key: 'currencyName',
      width: '20%',
    },
    {
      title: 'Currency Icon',
      dataIndex: 'currencyIcon',
      key: 'currencyIcon',
      width: '20%',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      width: '15%',
    },
    {
      title: 'Conversion Rate',
      dataIndex: 'conversionRate',
      key: 'conversionRate',
      width: '20%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '20%',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEditCurrency(record)}>
            <EditOutlined />
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDeleteCurrency(record)}>
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
      currencyName: 'USD',
      currencyIcon: '	©',
      position: 'Left',
      conversionRate: '5.00',
    },
    {
      key: 2,
      currencyName: 'BDT',
      currencyIcon: '$',
      position: 'Right',
      conversionRate: '0.50',
    },
    {
      key: 3,
      currencyName: 'INR',
      currencyIcon: 'R',
      position: 'Left',
      conversionRate: '35.00',
    },
    {
      key: 4,
      currencyName: 'BDT',
      currencyIcon: '৳',
      position: 'Right',
      conversionRate: '1.00',
    },
  ];

  const handleEditCurrency = (currencyItem) => {
    setOpenModal(true);
    setReRender((prevState) => !prevState);
    setUpdateCurrencyAdd(currencyItem);
    console.log('currencyItem edit', currencyItem);
  };

  const handleDeleteCurrency = (currencyItem) => {
    confirm({
      title: 'Are you sure to delete this item?',
      icon: <ExclamationCircleOutlined />,
      content:
        'If you click on the ok button the item will be deleted permanently from the database. Undo is not possible.',
      onOk() {
        console.log('currencyItem delete', currencyItem);
        // window.delete_menu_addons_item.send('delete_menu_addons_item', {
        //   id: addonsItem.row_id,
        // });

        // setCurrencyLists(
        //   currencyLists.filter((item) => item.row_id !== currencyItem.row_id)
        // );

        // // get delete response
        // window.delete_menu_addons_item.once(
        //   'delete_menu_addons_item_response',
        //   ({ status }) => {
        //     if (status) {
        //       message.success({
        //         content: 'Menu type deleted successfully',
        //         className: 'custom-class',
        //         duration: 1,
        //         style: {
        //           marginTop: '5vh',
        //           float: 'right',
        //         },
        //       });
        //     }
        //   }
        // );
      },
      onCancel() {},
    });
  };

  const handleReset = () => {
    form.resetFields();
  };

  const handleSubmit = () => {
    const addNewCurrencyList = {};

    for (const data of addCurrency) {
      addNewCurrencyList[data.name[0]] =
        typeof data?.value === 'string' ? data?.value?.trim() : data?.value;
    }

    // if (addCurrency?.currency_id) {
    //   addNewCurrencyList.currency_id = addCurrency.currency_id;
    // }

    console.log('addNewCurrencyList', addNewCurrencyList);

    // // Insert or update Data
    // window.context_bridge_menu_addons.send(
    //   'context_bridge_menu_addons',
    //   newAddonsAssignList
    // );

    // Insert or update response
    // window.context_bridge_menu_addons.once(
    //   'context_bridge_menu_addons_response',
    //   ({ status }) => {
    //     if (status === 'updated') {
    //       setReRender((prevState) => !prevState);
    //       closeModal();

    //       message.success({
    //         content: 'Assign addons update successfully',
    //         className: 'custom-class',
    //         duration: 1,
    //         style: {
    //           marginTop: '5vh',
    //           float: 'right',
    //         },
    //       });
    //     } else {
    //       setReRender((prevState) => !prevState);
    //       closeModal();

    //       message.success({
    //         content: 'Assign new addons successfully',
    //         className: 'custom-class',
    //         duration: 1,
    //         style: {
    //           marginTop: '5vh',
    //           float: 'right',
    //         },
    //       });
    //     }
    //   }
    // );
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
          <Button type="primary" onClick={() => setOpenModal(true)}>
            <PlusCircleOutlined />
            Add Currency
          </Button>
        </div>

        <Table
          columns={columns}
          rowSelection={{ ...rowSelection, checkStrictly }}
          dataSource={data}
          pagination={false}
        />
      </div>

      <Modal
        title="Add Currency"
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
              fields={addCurrency}
              onFinish={handleSubmit}
              onFieldsChange={(_, allFields) => {
                setAddCurrency(allFields);
              }}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                name="currency_name"
                label="Currency Name"
                rules={[
                  {
                    required: true,
                    message: 'Currency Name is required',
                  },
                ]}
                required
              >
                <Input placeholder="Currency Name" size="large" />
              </Form.Item>

              <Form.Item
                name="currency_icon"
                label="Currency Icon"
                rules={[
                  {
                    required: true,
                    message: 'Currency Icon is required',
                  },
                ]}
                required
              >
                <Input placeholder="Currency Icon" size="large" />
              </Form.Item>

              <Form.Item
                name="currency_rate"
                label="Conversion Rate"
                rules={[
                  {
                    required: true,
                    message: 'Conversion Rate is required',
                  },
                ]}
                required
              >
                <Input placeholder="Conversion Rate" size="large" />
              </Form.Item>
              <Form.Item
                name="position"
                label="Position"
                rules={[
                  { required: true, message: 'Please input your Position!' },
                ]}
              >
                <Select placeholder="Select Option" size="large" allowClear>
                  <Option value="left">Left</Option>
                  <Option value="right">Right</Option>
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

export default CurrencyList;
