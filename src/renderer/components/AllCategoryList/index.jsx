import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Button, Image, message, Modal, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Navigate, Route } from 'react-router-dom';
import './AllCategoryList.style.scss';

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

const AllCategoryList = () => {
  window.get_category.send('sendResponseForCategory', { status: true });

  const [checkStrictly, setCheckStrictly] = useState(false);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    getApplicationSettingsData()
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

    // window.get_category.once('sendCategoryData', (eve, categoryData) => {
    //   console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>', categoryData);
    // });
  }, []);

  function getApplicationSettingsData() {
    return new Promise((resolve, reject) => {
      window.get_category.once('sendCategoryData', (categoryLists) => {
        if (categoryLists) {
          resolve(categoryLists);
        } else {
          reject(Error('No settings found'));
        }
      });
    });
  }

  const handleEditCategory = (record) => {
    console.log('Edit', record);
    // <Redirect from="/category_list" to="/add_category" />;

    return <Route path="/" element={<Navigate replace to="/add_category" />} />;
  };

  const showConfirm = (record) => {
    confirm({
      title: 'Are you sure to delete this items?',
      icon: <ExclamationCircleOutlined />,
      content:
        'If you click on the ok button the item will be deleted permanently from the database. Undo is not possible.',
      onOk() {
        setCategories(
          categories.filter((item) => item.category_id !== record.category_id)
        );
        message.success({
          content: 'Foods category added successfully ',
          className: 'custom-class',
          duration: 1,
          style: {
            marginTop: '5vh',
            float: 'right',
          },
        });
      },
      onCancel() {},
    });
  };

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

          <Button type="danger" onClick={() => showConfirm(record)}>
            <DeleteOutlined />
            Delete
          </Button>
        </Space>
      ),
    },
  ];

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
        rowKey={(record) => record.category_id}
      />
    </div>
  );
};

export default AllCategoryList;
