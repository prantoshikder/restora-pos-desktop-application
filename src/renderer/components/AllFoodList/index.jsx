import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Button, Image, Modal, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AllFoodList.style.scss';

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

const AllFoodList = () => {
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [visible, setVisible] = useState(false);
  const [foodData, setFoodData] = useState(null);

  window.get_food_list.send('get_food_list', { status: true });

  useEffect(() => {
    window.get_food_list.once('get_food_list_response', (data) => {
      const foodLists = data.map((element) => {
        if (element.ProductsIsActive === 1) {
          return { ...element, ProductsIsActive: 'Active' };
        } else {
          return { ...element, ProductsIsActive: 'Inactive' };
        }

        // if (element.productvat === '') {
        //   return { ...element, productvat: '0.00%' };
        // } else {
        //   return { ...element, productvat: `${element.productvat} "%"` };
        // }
      });

      setFoodData(foodLists);
    });
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
          className="category_image"
        />
      ),
    },
    {
      title: 'Category Name',
      dataIndex: 'category_name',
      key: 'category_name',
      width: '25%',
    },
    {
      title: 'Food Name',
      dataIndex: 'ProductName',
      key: 'ProductName',
      width: '20%',
    },
    {
      title: 'Components',
      dataIndex: 'component',
      key: 'component',
      width: '15%',
    },
    {
      title: 'Vat',
      dataIndex: 'productvat',
      key: 'productvat',
      width: '10%',
    },
    {
      title: 'Status',
      dataIndex: 'ProductsIsActive',
      key: 'ProductsIsActive',
      width: '15%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '20%',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEditFoodItem(record)}>
            <EditOutlined />
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDeleteFoodItem(record)}>
            <DeleteOutlined />
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  let navigate = useNavigate();
  const handleEditFoodItem = (foodItem) => {
    console.log('foodItem', foodItem);
    navigate('/add_food', { state: foodItem });
  };

  const handleDeleteFoodItem = (foodItem) => {
    confirm({
      title: 'Are you sure to delete this item?',
      icon: <ExclamationCircleOutlined />,
      content:
        'If you click on the ok button the item will be deleted permanently from the database. Undo is not possible.',
      onOk() {
        console.log('foodItem', foodItem);
      },
      onCancel() {},
    });
  };

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
        dataSource={foodData}
        pagination={false}
        rowKey={(record) => record.ProductsID}
      />
    </div>
  );
};

export default AllFoodList;
