import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, message, Modal, Select, Space, Table } from 'antd';
import { getDataFromDatabase } from 'helpers';
import { useEffect, useState } from 'react';
import CurrencyModal from 'renderer/components/CurrencyModal';

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
  // Get all currency list as an array
  window.get_currency_lists.send('get_currency_lists', {
    status: true,
  });

  // Delete currency item
  window.delete_currency_list_item.send('delete_currency_list_item', {
    status: true,
  });

  const [checkStrictly, setCheckStrictly] = useState(false);
  const [currencyModal, setCurrencyModal] = useState(false);
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
    setCurrencyModal(true);
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

  return (
    <>
      <div
        style={{
          margin: '0rem 1.5rem',
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        }}
      >
        <div className="d-flex justify-content_end mb-3">
          <Button type="primary" onClick={() => setCurrencyModal(true)}>
            <PlusCircleOutlined />
            Add Currency
          </Button>
        </div>

        <Table
          columns={columns}
          rowSelection={{ ...rowSelection, checkStrictly }}
          dataSource={currencyLists}
          pagination={true}
          rowKey={(record) => record?.id}
          locale={{ emptyText: 'No currency data found.' }}
        />
      </div>

      <CurrencyModal
        currencyModal={currencyModal}
        setCurrencyModal={setCurrencyModal}
        setReRender={setReRender}
        addCurrency={addCurrency}
        setAddCurrency={setAddCurrency}
        updateCurrency={updateCurrency}
      />
    </>
  );
};

export default CurrencyList;
