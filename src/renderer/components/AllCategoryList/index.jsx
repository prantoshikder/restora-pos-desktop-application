import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Button, Image, message, Modal, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../../../../assets/default.jpg';
import { getDataFromDatabase } from './../../../helpers';
import './AllCategoryList.style.scss';

const { confirm } = Modal;

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {},
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
    getDataFromDatabase('sendCategoryData', window.get_category)
      .then((categories) => {
        // Declared a global state
        let allCats = [];

        categories.map((category) => {
          // Push all the parent category into the 'allCats' state
          allCats.push(category);

          // Push those categories who have child categories into the 'allCats' state
          if (category?.subCategories?.length) {
            allCats.push(...category?.subCategories);
          }
        });

        const updatedCategories = allCats.map((category) => {
          // 1 represents Active & 0 represents Inactive
          // We only show the active items but it is category lists that's why we show all
          if (category.category_is_active === 1) {
            category.category_is_active = 'Active';
          } else {
            category.category_is_active = 'Inactive';
          }
        });

        setCategories(allCats);
      })
      .catch((err) => console.log('error', err));
  }, []);

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

        window.delete_category.once(
          'delete_category_response',
          ({ status }) => {
            if (status) {
              message.success({
                content: 'Category deleted successfully',
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

  const columns = [
    {
      title: 'Image',
      dataIndex: 'categoryImage',
      key: 'categoryImage',
      render: (text, record) => (
        <Image
          src={record.category_image ? record.category_image : ''}
          width={50}
          height={50}
          className="category_image"
          fallback={defaultImage}
          preview={false}
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
      dataIndex: 'parent_cat',
      key: 'parent_cat',
      width: '25%',
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
      width: '15%',
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
        pagination={true}
        rowKey={(record) => record?.category_id}
      />
    </div>
  );
};

export default AllCategoryList;
