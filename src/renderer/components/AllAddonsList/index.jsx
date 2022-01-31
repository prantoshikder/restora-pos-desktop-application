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

const AllAddonsList = () => {
  const [checkStrictly, setCheckStrictly] = useState(false);

  const columns = [
    {
      title: 'Add-ons Name',
      dataIndex: 'addonsName',
      key: 'addonsName',
      width: '40%',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: '25%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '20%',
      key: 'status',
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
      addonsName: 'Coffee',
      price: '$ 70.00',
      status: 'Active',
    },
    {
      key: 2,
      addonsName: 'chocolate milk shake',
      price: '$ 100.00',
      status: 'Active',
    },
    {
      key: 3,
      addonsName: 'Drinks',
      price: '$ 200.00',
      status: 'Active',
    },
    {
      key: 4,
      addonsName: 'Souse',
      price: '$ 150.00',
      status: 'Active',
    },
    {
      key: 5,
      addonsName: 'Butter',
      price: '$ 90.00',
      status: 'Active',
    },
  ];

  function handleEditCategory(record) {
    console.log('Edit', record);
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
        rowKey={(record) => record.key}
      />
    </div>
  );
};

export default AllAddonsList;
