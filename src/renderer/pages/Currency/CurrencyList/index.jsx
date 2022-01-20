import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message, Space, Table } from 'antd';
import React, { useState } from 'react';

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

const CurrencyList = () => {
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [visible, setVisible] = useState(false);

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

  function handleEditCurrency(record) {
    setVisible(true);
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
  function handleDeleteCurrency(record) {
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

  return (
    <div
      style={{
        margin: '0rem 1.5rem',
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      }}
    >
      <Table
        columns={columns}
        rowSelection={{ ...rowSelection, checkStrictly }}
        dataSource={data}
        pagination={false}
      />
    </div>
  );
};

export default CurrencyList;
