import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Image, message, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { getDataFromDatabase } from '../../../helpers';
import './AllCategoryList.style.scss';

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

const AllCategoryList = () => {
  window.get_category.send('sendResponseForCategory', { status: true });

  const [checkStrictly, setCheckStrictly] = useState(false);
  const [visible, setVisible] = useState({});

  window.delete_category.once("delete_category_response", (event, args) => {
    console.log("%%%%%%%%%%%%%%%%%%", { args });
  })

  useEffect(() => {
    getDataFromDatabase('sendCategoryData', window.get_category)
      .then((data) => {
        const categoryLists = data.map((element) => {
          if (element.category_is_active === 1) {
            return { ...element, category_is_active: 'Active' };
          } else {
            return { ...element, category_is_active: 'Inactive' };
          }
        });

        setCategories(categoryLists);
      })
      .catch((err) => console.log('error', err));
  }, []);

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
      dataIndex: 'category_name',
      key: 'category_name',
      width: '30%',
    },
    {
      title: 'Parent Menu',
      dataIndex: 'parent_id',
      key: 'parent_id',
      width: '20%',
    },
    {
      title: 'Status',
      dataIndex: 'category_is_active',
      key: 'category_is_active',
      width: '15%',
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

  function handleEditCategory(record) {
    setVisible(true);
    console.log('Edit', record);
    window.edit_category.send("edit_category", { 'id': 1 })

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

    window.delete_category.send("delete_category", { 'id': 3 })

    message.success({
      content: 'Foods category added successfully',
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
        dataSource={categories}
        pagination={false}
      />
    </div>
  );
};

export default AllCategoryList;
