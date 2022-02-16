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
} from 'antd';
import { getDataFromDatabase } from 'helpers';
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
  window.get_currency_lists.send('get_currency_lists', {
    status: true,
  });
  window.delete_currency_list_item.send('delete_currency_list_item', {
    status: true,
  });

  const [form] = Form.useForm();
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [addCurrency, setAddCurrency] = useState(null);
  const [reRender, setReRender] = useState(false);
  const [updateCurrency, setUpdateCurrency] = useState({});
  const [currencyLists, setCurrencyLists] = useState([]);

  useEffect(() => {
    setAddCurrency([
      {
        name: ['currency_name'],
        value: updateCurrency?.currency_name,
      },
      {
        name: ['currency_icon'],
        value: updateCurrency?.currency_icon,
      },
      {
        name: ['currency_rate'],
        value: updateCurrency?.currency_rate,
      },
      {
        name: ['position'],
        value: updateCurrency?.position,
      },
    ]);
  }, [reRender]);

  useEffect(() => {
    getDataFromDatabase(
      'get_currency_lists_response',
      window.get_currency_lists
    )
      .then((res) => {
        // console.log(res);
        Array.isArray(res) && res?.length && setCurrencyLists(res);
      })
      .catch((err) => console.log('Getting menu types error', err));
  }, [reRender]);

  const columns = [
    {
      title: 'Currency Name',
      dataIndex: 'currency_name',
      key: 'currency_name',
      width: '20%',
    },
    {
      title: 'Currency Icon',
      dataIndex: 'currency_icon',
      key: 'currency_icon',
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
      dataIndex: 'currency_rate',
      key: 'currency_rate',
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

  const handleEditCurrency = (currencyItem) => {
    setOpenModal(true);
    setReRender((prevState) => !prevState);
    setUpdateCurrency(currencyItem);
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
        window.delete_currency_list_item.send('delete_currency_list_item', {
          id: currencyItem.id,
        });

        setCurrencyLists(
          currencyLists.filter((item) => item.id !== currencyItem.id)
        );

        // get delete response
        window.delete_currency_list_item.once(
          'delete_currency_list_item_response',
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
    const addNewCurrencyList = {};

    for (const data of addCurrency) {
      addNewCurrencyList[data.name[0]] =
        typeof data?.value === 'string' ? data?.value?.trim() : data?.value;
    }

    if (updateCurrency?.id) {
      addNewCurrencyList.id = updateCurrency.id;
    }

    // Insert or update Data
    window.insert_currency.send('insert_currency', addNewCurrencyList);

    setOpenModal(false);

    // Insert or update response
    window.insert_currency.once('insert_currency_response', ({ status }) => {
      if (status === 'updated') {
        setReRender((prevState) => !prevState);
        closeModal();

        message.success({
          content: 'Currency updated successfully',
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
          content: 'Currency added successfully',
          className: 'custom-class',
          duration: 1,
          style: {
            marginTop: '5vh',
            float: 'right',
          },
        });
      }
    });
  };

  function closeModal() {
    form.resetFields();
    setOpenModal(false);
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
          <Button type="primary" onClick={() => setOpenModal(true)}>
            <PlusCircleOutlined />
            Add Currency
          </Button>
        </div>

        <Table
          columns={columns}
          rowSelection={{ ...rowSelection, checkStrictly }}
          dataSource={currencyLists}
          pagination={false}
          rowKey={(record) => record?.id}
        />
      </div>

      <Modal
        title="Add Currency"
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
