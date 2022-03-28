import {
  Button,
  DatePicker,
  Form,
  Select,
  Space,
  Table,
  Typography,
} from 'antd';
import { getDataFromDatabase } from 'helpers';
import moment from 'moment';
import { useEffect, useState } from 'react';
import './AllSalesReport.style.scss';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title, Text } = Typography;

const AllSalesReport = ({ settings }) => {
  const [allSalesReports, setAllSalesReports] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isFormSubmitted, setFormSubmitted] = useState(false);

  window.get_all_order_for_sales_report.send('get_all_order_for_sales_report', {
    status: true,
  });

  useEffect(() => {
    getDataFromDatabase(
      'get_all_order_for_sales_report_response',
      window.get_all_order_for_sales_report
    ).then((res) => {
      if (startDate && endDate) {
        let filteredData = res.filter((t) => {
          let d = new Date(t.saleDate);
          let milliseconds = d.getTime();

          let d2 = new Date(startDate);
          let startDateToMiliSec = d2.getTime();

          let d3 = new Date(endDate);
          let endDateToMiliSec = d3.getTime();

          let filteringData;
          if (
            startDateToMiliSec <= milliseconds &&
            endDateToMiliSec >= milliseconds
          ) {
            filteringData = t;
          }

          return filteringData;
        });

        setAllSalesReports(filteredData);
      } else {
        setAllSalesReports(res);
      }
    });
  }, [isFormSubmitted]);

  const disabledDate = (current) => {
    return current && current < moment().endOf('day');
  };

  const handleChangeStatus = (value) => {
    console.log('value', value);
  };

  const handleFromDate = (value, dateString) => {
    setStartDate(dateString);
  };

  const handleEndDate = (value, dateString) => {
    setEndDate(dateString);
  };

  const columns = [
    {
      title: 'Sale Date',
      dataIndex: 'saleDate',
      key: 'saleDate',
      width: '12%',
    },
    {
      title: 'Invoice No.',
      dataIndex: 'invoiceNo',
      key: 'invoiceNo',
      width: '10%',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
      width: '12%',
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      width: '12%',
    },
    {
      title: 'Total Order',
      dataIndex: 'totalOrder',
      key: 'totalOrder',
      width: '10%',
      align: 'right',
    },
    {
      title: 'Vat/Tax',
      dataIndex: 'vatOrTax',
      key: 'vatOrTax',
      width: '10%',
      align: 'right',
    },
    {
      title: 'Service Charge',
      dataIndex: 'serviceCharge',
      key: 'serviceCharge',
      width: '10%',
      align: 'right',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      width: '10%',
      align: 'right',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: '10%',
      align: 'right',
    },
  ];

  const handleSearchData = () => {
    setFormSubmitted((isFormSubmitted) => !isFormSubmitted);
  };

  return (
    <>
      <div
        style={{
          padding: '1rem',
          marginTop: '1rem',
          borderRadius: '0.2rem',
          border: '1px solid #e5e5e5',
          margin: '0rem 1.5rem',
          display: 'flex',
        }}
      >
        <div>
          <Space size={12}>
            <Form.Item label="From">
              <DatePicker
                format="YYYY-MM-DD"
                placeholder="From"
                onChange={handleFromDate}
              />
            </Form.Item>

            <Form.Item label="To" style={{ marginLeft: '1rem' }}>
              <DatePicker
                format="YYYY-MM-DD"
                placeholder="To"
                onChange={handleEndDate}
              />
            </Form.Item>
          </Space>
        </div>

        <div style={{ marginLeft: '1rem' }}>
          <Select
            placeholder="Select an Option"
            onChange={handleChangeStatus}
            defaultValue={'cardPayment'}
            allowClear
          >
            <Option value="cardPayment">Card Payment</Option>
            {/* <Option value="twoCheckout">Two Checkout</Option>
            <Option value="foodPanda">Food Panda</Option>
            <Option value="cashPayment">Cash Payment</Option> */}
          </Select>
        </div>

        {/* <div style={{ marginLeft: '1rem' }}>
          <Input placeholder="Invoice No" />
        </div> */}

        <div className="group_btn">
          <Button
            type="primary"
            className="search_btn"
            onClick={handleSearchData}
          >
            Search
          </Button>
          {/* <Button type="primary" className="print_btn">
            Print
          </Button> */}
        </div>
      </div>

      <div
        style={{
          padding: '2rem 1rem',
          marginTop: '1rem',
          borderRadius: '0.2rem',
          border: '1px solid #e5e5e5',
          margin: '0rem 1.5rem',
          display: 'block',
        }}
      >
        <div className="search_content">
          <Title level={3}>
            {settings?.storename ? settings?.storename : 'Respora POS'}
          </Title>
          <Text>
            {settings?.address
              ? settings?.address
              : 'B-25, Mannan Plaza, 4th Floor Khilkhet, Dhaka-1229, Bangladesh'}
          </Text>
          <br />
          {/* <Text>Print Date: 09/01/2022 10:46:30</Text> */}
        </div>

        <div
          style={{
            padding: '2rem',
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          }}
        >
          <Table
            columns={columns}
            bordered
            dataSource={allSalesReports}
            pagination={false}
            rowKey={(record) => record.id}
          />
        </div>
      </div>
    </>
  );
};

export default AllSalesReport;
