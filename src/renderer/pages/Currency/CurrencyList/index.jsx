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
      title: 'Category Name',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: '30%',
    },
    {
      title: 'Parent Menu',
      dataIndex: 'parentMenu',
      key: 'parentMenu',
      width: '20%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '15%',
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
      categoryName: 'Soup N Salads',
      parentMenu: 'Soup (Thai)',
      status: 'Active',
    },
    {
      key: 2,
      categoryName: 'Salad (Thai)',
      parentMenu: 'Chicken item',
      status: 'Active',
    },
    {
      key: 3,
      categoryName: 'Prawn & Fish Dishes',
      parentMenu: 'indian',
      status: 'Active',
    },
    {
      key: 4,
      categoryName: 'Oven Roasted Eggplant',
      parentMenu: 'thai',
      status: 'Active',
    },
    {
      key: 5,
      categoryName: 'Maxican spicy',
      parentMenu: 'Chicken item',
      status: 'Active',
    },
  ];

  function handleEditCategory(record) {
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
        backgroundColor: '#f7f7f7',
        marginRight: '1.5rem',
        padding: '2rem',
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
