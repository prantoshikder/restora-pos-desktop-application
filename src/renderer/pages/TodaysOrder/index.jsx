import { Table } from 'antd';
import { getDataFromDatabase } from 'helpers';
import { useEffect, useState } from 'react';
import Header from 'renderer/components/partials/Header';
import './TodaysOrder.style.scss';

const rowSelection = {
  onChange: (selectedRowKeys) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ');
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

const TodaysOrder = ({ settings }) => {
  window.get_todays_completed_orders.send('get_todays_completed_orders', {
    status: true,
  });

  window.get_customer_names.send('get_customer_names', { status: true });

  const [todaysOrders, setTodaysOrders] = useState([]);
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    getDataFromDatabase(
      'get_customer_names_response',
      window.get_customer_names
    ).then((data = []) => {
      setCustomerList(data);
    });
  }, []);

  useEffect(() => {
    getDataFromDatabase(
      'get_todays_completed_orders_response',
      window.get_todays_completed_orders
    ).then((orders) => {
      const customerName = orders.map((orderData) => {
        const ordersInfo = {};

        console.log('orderData', orderData);
        const cusData = customerList?.find(
          (cusName) => cusName?.id === orderData?.customer_id
        );

        console.log('cusData', cusData);
      });

      setTodaysOrders(orders);

      console.log('order', orders);
    });
  }, [customerList]);

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
      dataIndex: 'customer_id',
      width: '25%',
      key: 'customer_id',
      align: 'center',
    },
    {
      title: 'Customer Type',
      dataIndex: 'customer_id',
      width: '25%',
      key: 'customer_id',
      align: 'center',
    },
    {
      title: 'Order Date',
      dataIndex: 'creation_date',
      width: '20%',
      key: 'creation_date',
      align: 'center',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      width: '20%',
      key: 'amount',
      align: 'center',
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
            dataSource={todaysOrders}
            pagination={false}
            rowKey={(record) => record?.order_id}
          />
        </div>
      </div>
    </div>
  );
};

export default TodaysOrder;
