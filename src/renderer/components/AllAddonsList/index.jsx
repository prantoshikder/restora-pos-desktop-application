import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Button, message, Modal, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDataFromDatabase } from './../../../helpers';

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

const AllAddonsList = () => {
  window.addons_list.send('addons_list', { status: true });

  let navigate = useNavigate();

  const [checkStrictly, setCheckStrictly] = useState(false);
  const [addonsLists, setAddonsLists] = useState([]);

  useEffect(() => {
    // Add-ons Lists
    getDataFromDatabase('addons_list_response', window.addons_list)
      .then((data) => {
        const addonsList = data.map((element) => {
          if (element.is_active === 1) {
            return { ...element, is_active: 'Active' };
          } else {
            return { ...element, is_active: 'Inactive' };
          }
        });

        setAddonsLists(addonsList);
      })
      .catch((err) => console.log('error', err));
  }, []);

  const columns = [
    {
      title: 'Add-ons Name',
      dataIndex: 'add_on_name',
      key: 'add_on_name',
      width: '30%',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: '25%',
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      key: 'is_active',
      width: '20%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '20%',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEditAddonsItem(record)}>
            <EditOutlined />
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDeleteAddonsItem(record)}>
            <DeleteOutlined />
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleEditAddonsItem = (addonsItem) => {
    navigate('/add_addons', { state: addonsItem });
  };

  const handleDeleteAddonsItem = (addonsItem) => {
    confirm({
      title: 'Are you sure to delete this item?',
      icon: <ExclamationCircleOutlined />,
      content:
        'If you click on the ok button the item will be deleted permanently from the database. Undo is not possible.',
      onOk() {
        window.delete_addons.send('delete_addons', {
          id: addonsItem.add_on_id,
        });

        setAddonsLists(
          addonsLists.filter((item) => item.add_on_id !== addonsItem.add_on_id)
        );

        // Delete Add-ons item
        window.delete_addons.once('delete_addons_response', ({ status }) => {
          if (status) {
            message.success({
              content: 'Add-ons deleted successfully',
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
        dataSource={addonsLists}
        pagination={true}
        rowKey={(record) => record?.add_on_id}
      />
    </div>
  );
};

export default AllAddonsList;
