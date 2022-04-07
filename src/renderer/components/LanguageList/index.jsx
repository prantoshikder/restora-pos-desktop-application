import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, message, Space, Table } from 'antd';
import { useState } from 'react';

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

const LanguageList = () => {
  const [checkStrictly, setCheckStrictly] = useState(false);

  const columns = [
    {
      title: 'Language',
      dataIndex: 'language',
      key: 'language',
      width: '60%',
    },
    {
      title: <FontAwesomeIcon icon={faCogs} />,
      dataIndex: 'action',
      width: '30%',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEditLanguage(record)}>
            <EditOutlined />
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDeleteLanguage(record)}>
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
      language: 'USD',
    },
    {
      key: 2,
      language: 'BDT',
    },
    {
      key: 3,
      language: 'INR',
    },
    {
      key: 4,
      language: 'BDT',
    },
  ];

  function handleEditLanguage(record) {
    console.log('Edit', record);
  }
  function handleDeleteLanguage(record) {
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
        pagination={true}
        rowKey={(record) => record.key}
        locale={{ emptyText: 'No language data found.' }}
      />
    </div>
  );
};

export default LanguageList;
