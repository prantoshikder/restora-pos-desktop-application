import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Button, Image, message, Modal, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
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
  const [openModal, setOpenModal] = useState(false);
  const [foodData, setFoodData] = useState(null);

  window.get_food_list.send('get_food_list', { status: true });

  useEffect(() => {
    window.get_food_list.once('get_food_list_response', (data = []) => {
      const foodLists =
        Array.isArray(data) &&
        data?.map((element) => {
          if (element.is_active === 1) {
            return { ...element, is_active: 'Active' };
          } else {
            return { ...element, is_active: 'Inactive' };
          }
        });

      setFoodData(foodLists);
    });
  }, []);

  const columns = [
    {
      title: 'Image',
      dataIndex: 'product_image',
      key: 'product_image',
      render: (text, record) => (
        <Image
          src={record?.product_image}
          width="50px"
          height="50px"
          className="category_image"
          preview={false}
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
      dataIndex: 'product_name',
      key: 'product_name',
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
      dataIndex: 'product_vat',
      key: 'product_vat',
      width: '10%',
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      key: 'is_active',
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
    navigate('/add_food', { state: foodItem });
  };

  const handleDeleteFoodItem = (foodItem) => {
    confirm({
      title: 'Are you sure to delete this item?',
      icon: <ExclamationCircleOutlined />,
      content:
        'If you click on the ok button the item will be deleted permanently from the database. Undo is not possible.',
      onOk() {
        window.delete_foods.send('delete_foods', { id: foodItem.id });

        setFoodData(foodData.filter((item) => item.id !== foodItem.id));

        // Delete Food item
        window.delete_foods.once('delete_foods_response', ({ status }) => {
          if (status) {
            message.success({
              content: 'Food Name deleted successfully',
              className: 'custom-class',
              duration: 1,
              style: {
                marginTop: '5vh',
                float: 'right',
              },
            });
          }
        });
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
        pagination={true}
        rowKey={(record) => record.id}
        locale={{ emptyText: 'No food data found.' }}
      />
    </div>
  );
};

export default AllFoodList;
