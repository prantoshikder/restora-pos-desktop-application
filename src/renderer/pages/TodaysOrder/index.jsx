import { Table } from 'antd';
import { getDataFromDatabase } from 'helpers';
import { useEffect, useState } from 'react';
import Header from 'renderer/components/partials/Header';
import './TodaysOrder.style.scss';

const TodaysOrder = ({ settings }) => {
  window.get_todays_completed_orders.send('get_todays_completed_orders', {
    status: true,
  });

  window.get_customer_names.send('get_customer_names', { status: true });

  const [todaysOrders, setTodaysOrders] = useState(null);
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
      const dataOrder = [];
      const ordersData = orders.map((orderData, index) => {
        var ordersInfo = {};

        const cusData = customerList?.find(
          (cusName) => cusName?.id === orderData?.customer_id
        );

        ordersInfo = {
          ...orderData,
          sl: index + 1,
          customerName: cusData?.customer_name
            ? cusData?.customer_name
            : 'Walk In',
          grand_total: `${settings.currency} ${orderData?.grand_total}`,
        };
        dataOrder.push(ordersInfo);
      });

      if (dataOrder?.length > 0) {
        setTodaysOrders(dataOrder);
      }
    });
  }, [customerList]);

  const columns = [
    {
      title: 'SL',
      dataIndex: 'sl',
      width: '5%',
      key: 'sl',
      align: 'left',
    },
    {
      title: 'Invoice',
      dataIndex: 'invoice_id',
      width: '10%',
      key: 'invoice_id',
      align: 'center',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      width: '25%',
      key: 'customerName',
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
      dataIndex: 'grand_total',
      width: '20%',
      key: 'grand_total',
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
            columns={columns}
            dataSource={todaysOrders}
            pagination={true}
            rowKey={(record) => record?.order_id}
          />
        </div>
      </div>
    </div>
  );
};

export default TodaysOrder;
