import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Button, Image, message, Modal, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDataFromDatabase } from '../../../helpers';
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
  // Send request to the main
  window.get_category.send('sendResponseForCategory', { status: true });
  window.parent_category.send('parent_category', { status: true });

  const [checkStrictly, setCheckStrictly] = useState(false);
  const [categories, setCategories] = useState(null);
  const [parentCategory, setParentCategory] = useState(null);

  window.delete_category.once('delete_category_response', ({ status }) => {
    if (status) {
      message.success({
        content: 'Food category deleted successfully',
        className: 'custom-class',
        duration: 1,
        style: {
          marginTop: '5vh',
          float: 'right',
        },
      });
    }
  });

  useEffect(() => {
    // window.parent_category.once('parent_category', (args) => {
    //   console.log('******************************', args);
    //   setParentCategory(args);
    // });

    Promise.all([
      getDataFromDatabase('parent_category', window.parent_category),
      getDataFromDatabase('sendCategoryData', window.get_category),
    ])
      .then(([parent_category, categories]) => {
        console.log('parent_category', parent_category);
        const categoryLists = categories.map((element, i) => {
          // const paren = parent_category.filter(
          //   (parent_cat) => parent_cat.parent_id !== element.category_id
          // );

          // console.log('paren', paren);
          // console.log(
          //   'parentcat ',
          //   parent_category.filter(
          //     (parent_cat) => parent_cat.parent_id === element.category_id
          //   )
          // );

          if (element.category_is_active === 1) {
            return { ...element, category_is_active: 'Active' };
          } else {
            return { ...element, category_is_active: 'Inactive' };
          }
        });

        console.log('categoryLists', categoryLists);

        setCategories(categoryLists);
      })
      .catch((err) => console.log('error', err));

    // console.log('am I promise?', allData);

    // getDataFromDatabase('parent_category', window.parent_category)
    //   .then((data) => {
    //     console.log('parnet cat', data);
    //   })
    //   .catch((err) => console.log('cat error', err));

    // getDataFromDatabase('sendCategoryData', window.get_category)
    //   .then((data) => {
    //     const categoryLists = data.map((element) => {
    //       if (element.category_is_active === 1) {
    //         return { ...element, category_is_active: 'Active' };
    //       } else {
    //         return { ...element, category_is_active: 'Inactive' };
    //       }
    //     });

    //     setCategories(categoryLists);
    //   })
    //   .catch((err) => console.log('error', err));
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

  let navigate = useNavigate();
  const handleEditCategory = (categoryItem) => {
    navigate('/add_category', { state: categoryItem });
  };

  const handleDeleteCategory = (categoryItem) => {
    confirm({
      title: 'Are you sure to delete this item?',
      icon: <ExclamationCircleOutlined />,
      content:
        'If you click on the ok button the item will be deleted permanently from the database. Undo is not possible.',
      onOk() {
        window.delete_category.send('delete_category', {
          id: categoryItem.category_id,
        });

        setCategories(
          categories.filter(
            (item) => item.category_id !== categoryItem.category_id
          )
        );
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

          <Button type="danger" onClick={() => handleDeleteCategory(record)}>
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
        rowKey={(record) => record?.category_id}
      />
    </div>
  );
};

export default AllCategoryList;
