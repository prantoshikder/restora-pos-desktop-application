import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Button, Image, Modal, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../../../../assets/default.jpg';
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

  useEffect(() => {
    // window.parent_category.once('parent_category', (args) => {
    //   console.log('******************************', args);
    //   setParentCategory(args);
    // });

    Promise.all([
      getDataFromDatabase('parent_category', window.parent_category),
      getDataFromDatabase('sendCategoryData', window.get_category),
    ])
      .then(([child_categories, categories]) => {
        function getParentCat(cat) {}

        const allCats = categories.map((cat, i) => {
          console.log('cehck', cat.category_id, child_categories[i].parent_id);

          if (cat.category_id === child_categories[i].parent_id) {
            console.log('matched');
            return { ...cat };
          } else {
            return { ...cat };
          }
        });

        const childCats = child_categories.filter((cat) => {
          if (cat.parent_id !== null) {
            return { ...cat };
          }
        });

        // console.log('childCats', childCats);
        console.log('allCats', allCats);

        const categoryLists = categories.map((element, i) => {
          const child_categories_arr = child_categories.map((child_cat) => {
            if (child_cat.parent_id === null) {
              return { ...child_cat, parent_id: '' };
            } else {
              return { ...child_cat };
            }
          });

          const parent = categories.find(
            (childEle) => childEle.parent_id !== child_categories[i].parent_id
          );

          // console.log('child_categories_arr', child_categories_arr);

          // console.log('paren', paren);
          // console.log(
          //   'parentcat ',
          //   child_categories.filter(
          //     (parent_cat) => parent_cat.parent_id === element.category_id
          //   )
          // );

          // console.log(element.parent_id === child_categories[i].parent_id);

          if (element.parent_id === child_categories[i].parent_id) {
            return {
              ...element,
              parent_category_name: parent.category_name,
            };
          }

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
          // src={record.categoryImage}
          src={defaultImage}
          width="50px"
          height="50px"
          className="category_image"
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
      dataIndex: 'parent_category_name',
      key: 'parent_category_name',
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
