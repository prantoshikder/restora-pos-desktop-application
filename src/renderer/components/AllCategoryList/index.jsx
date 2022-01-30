import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Image, message, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
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

  console.log('categories', categories);

  function getApplicationSettingsData() {
    return new Promise((resolve, reject) => {
      window.get_category.once('sendCategoryData', (categoryLists) => {
        const data = categoryLists.map((element) => {
          if (element.category_is_active === 1) {
            return { ...element, category_is_active: 'Active' };
          } else {
            return { ...element, category_is_active: 'Inactive' };
          }
        });

        if (categoryLists) {
          resolve(categoryLists);
        } else {
          reject(Error('No settings found'));
        }
      });
    });
  }

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

  const data = [
    {
      key: 1,
      categoryImage:
        'https://spokeherd.com/wp-content/uploads/2021/06/ingredients-healthy-foods-selection-set-up_35641-3104.jpg',
      categoryName: 'Soup N Salads',
      parentMenu: 'Soup (Thai)',
      status: 'Active',
    },
    {
      key: 2,
      categoryImage:
        'https://spokeherd.com/wp-content/uploads/2021/06/ingredients-healthy-foods-selection-set-up_35641-3104.jpg',
      categoryName: 'Salad (Thai)',
      parentMenu: 'Chicken item',
      status: '0',
    },
    {
      key: 3,
      categoryImage:
        'https://spokeherd.com/wp-content/uploads/2021/06/ingredients-healthy-foods-selection-set-up_35641-3104.jpg',
      categoryName: 'Prawn & Fish Dishes',
      parentMenu: 'indian',
      status: '1',
    },
    {
      key: 4,
      categoryImage:
        'https://spokeherd.com/wp-content/uploads/2021/06/ingredients-healthy-foods-selection-set-up_35641-3104.jpg',
      categoryName: 'Oven Roasted Eggplant',
      parentMenu: 'thai',
      status: 'Active',
    },
    {
      key: 5,
      categoryImage:
        'https://spokeherd.com/wp-content/uploads/2021/06/ingredients-healthy-foods-selection-set-up_35641-3104.jpg',
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
