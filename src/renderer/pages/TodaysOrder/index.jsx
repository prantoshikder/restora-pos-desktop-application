import { Table } from 'antd';
import Header from 'renderer/components/partials/Header';
import './TodaysOrder.style.scss';

const rowSelection = {
  onChange: (selectedRowKeys) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

const TodaysOrder = ({ settings }) => {
  const columns = [
    {
      title: 'Invoice',
      dataIndex: 'invoice',
      width: '10%',
      key: 'invoice',
      align: 'center',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      width: '20%',
      key: 'customerName',
      align: 'center',
    },
    {
      title: 'Customer Type',
      dataIndex: 'customerType',
      width: '20%',
      key: 'customerType',
      align: 'center',
    },
    {
      title: 'Waiter',
      dataIndex: 'waiter',
      width: '10%',
      key: 'waiter',
      align: 'center',
    },
    {
      title: 'Table No',
      dataIndex: 'tableNo',
      width: '15%',
      key: 'tableNo',
      align: 'center',
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      width: '15%',
      key: 'orderDate',
      align: 'center',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      width: '15%',
      key: 'amount',
      align: 'center',
    },
  ];

  const data = [
    {
      key: '1',
      customerName: 'John Brown',
      customerType: 'walkIn',
      waiter: 'Walk In',
      tableNo: 2,
      orderDate: '14-03-2022',
      amount: 250,
      invoice: 112,
    },
    {
      key: '2',
      customerName: 'John Smith',
      customerType: 'walkIn',
      waiter: 'Walk In',
      tableNo: 1,
      orderDate: '14-03-2022',
      amount: 499,
      invoice: 122,
    },
  ];

  return (
    <div className="main_wrapper">
      <Header settings={settings} />

      <div className="todays_order">
        <div
          style={{
            margin: '0rem 1.5rem',
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          }}
        >
          <Table
            rowSelection={{
              ...rowSelection,
            }}
            columns={columns}
            dataSource={data}
            pagination={false}
            // rowKey={(record) => record?.category_id}
          />
        </div>
      </div>
    </div>
  );
};

export default TodaysOrder;
