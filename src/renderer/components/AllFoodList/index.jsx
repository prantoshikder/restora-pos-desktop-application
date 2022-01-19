import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Image, message, Space, Table } from 'antd';
import React, { useState } from 'react';
import './AllFoodList.style.scss';

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

const AllFoodList = () => {
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [visible, setVisible] = useState(false);

  const columns = [
    {
      title: 'Image',
      dataIndex: 'categoryImage',
      key: 'categoryImage',
      render: (text, record) => (
        <Image
          src={record.categoryImage}
          width="50px"
          height="50px"
          className="category-image"
        />
      ),
    },
    {
      title: 'Category Name',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: '25%',
    },
    {
      title: 'Food Name',
      dataIndex: 'foodName',
      key: 'foodName',
      width: '20%',
    },
    {
      title: 'Components',
      dataIndex: 'components',
      key: 'components',
      width: '15%',
    },
    {
      title: 'Vat',
      dataIndex: 'vat',
      key: 'vat',
      width: '10%',
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
      categoryImage:
        'https://spokeherd.com/wp-content/uploads/2021/06/ingredients-healthy-foods-selection-set-up_35641-3104.jpg',
      categoryName: 'Soup N Salads',
      foodName: 'Soup (Thai)',
      components: '',
      vat: '0.00%',
      status: 'Active',
    },
    {
      key: 2,
      categoryImage:
        'https://spokeherd.com/wp-content/uploads/2021/06/ingredients-healthy-foods-selection-set-up_35641-3104.jpg',
      categoryName: 'Salad (Thai)',
      foodName: 'Chicken item',
      components: '',
      vat: '0.00%',
      status: 'Active',
    },
    {
      key: 3,
      categoryImage:
        'https://spokeherd.com/wp-content/uploads/2021/06/ingredients-healthy-foods-selection-set-up_35641-3104.jpg',
      categoryName: 'Prawn & Fish Dishes',
      foodName: 'indian',
      components: 'chili, nuts',
      vat: '0.00%',
      status: 'Active',
    },
    {
      key: 4,
      categoryImage:
        'https://spokeherd.com/wp-content/uploads/2021/06/ingredients-healthy-foods-selection-set-up_35641-3104.jpg',
      categoryName: 'Oven Roasted Eggplant',
      foodName: 'thai',
      components: '',
      vat: '0.00%',
      status: 'Active',
    },
    {
      key: 5,
      categoryImage:
        'https://spokeherd.com/wp-content/uploads/2021/06/ingredients-healthy-foods-selection-set-up_35641-3104.jpg',
      categoryName: 'Maxican spicy',
      foodName: 'Chicken item',
      components: 'chili, nuts',
      vat: '0.00%',
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

export default AllFoodList;
