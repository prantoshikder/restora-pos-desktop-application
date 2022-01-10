import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  Table,
  Typography,
} from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import './AllSalesReport.style.scss';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title, Text } = Typography;

const AllSalesReport = () => {
  // Date Picker
  const disabledDate = (current) => {
    return current && current < moment().endOf('day');
  };

  const handleChangeStatus = (value) => {
    console.log('value', value);
    // setCategories({ ...categories, categoryStatus: value });
  };

  const handleOfferStart = (value, dateString) => {
    console.log('value', value);
    console.log('dateString', dateString);
    // setCategories({ ...categories, categoryOfferStart: value });
  };

  const handleOfferEnd = (value, dateString) => {
    console.log('value', value);
    console.log('dateString', dateString);
    // setCategories({ ...categories, categoryOfferEnd: value });
  };

  const [checkStrictly, setCheckStrictly] = useState(false);

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

  const data = [
    {
      key: 1,
      saleDate: '01-Jan, 2022',
      invoiceNo: '0111',
      customerName: 'David',
      paymentMethod: 'Card Payment',
      totalOrder: '15',
      vatOrTax: '30',
      serviceCharge: '30',
      discount: '20',
      totalAmount: '$70',
    },
    {
      key: 2,
      saleDate: '02-Jan, 2022',
      invoiceNo: '0112',
      customerName: 'Smith',
      paymentMethod: 'Food Panda',
      totalOrder: '35',
      vatOrTax: '20',
      serviceCharge: '20',
      discount: '5',
      totalAmount: '$35',
    },
    {
      key: 3,
      saleDate: '03-Jan, 2022',
      invoiceNo: '0113',
      customerName: 'Walker',
      paymentMethod: 'Cash Payment',
      totalOrder: '25',
      vatOrTax: '10',
      serviceCharge: '25',
      discount: '15',
      totalAmount: '$55',
    },
    {
      key: 4,
      saleDate: '04-Jan, 2022',
      invoiceNo: '0114',
      customerName: 'Rush',
      paymentMethod: 'Food Panda',
      totalOrder: '50',
      vatOrTax: '15',
      serviceCharge: '15',
      discount: '15',
      totalAmount: '$60',
    },
    {
      key: 5,
      saleDate: '05-Jan, 2022',
      invoiceNo: '0115',
      customerName: 'Welkin',
      paymentMethod: 'Card Payment',
      totalOrder: '75',
      vatOrTax: '10',
      serviceCharge: '25',
      discount: '10',
      totalAmount: '$50',
    },
  ];

  return (
    <>
      <div style={{ borderBottom: '1px solid #e5e5e5', marginRight: '1.5rem' }}>
        <Title level={3}>Sales Report</Title>
      </div>

      <div
        style={{
          padding: '1rem',
          marginTop: '1rem',
          borderRadius: '0.2rem',
          border: '1px solid #e5e5e5',
          marginRight: '1.5rem',
          display: 'flex',
        }}
      >
        <div>
          <Space direction="vertical" size={12}>
            <div className="offer_date_select">
              <Form.Item label="From">
                <DatePicker
                  format="DD-MM-YYYY"
                  placeholder="From"
                  disabledDate={disabledDate}
                  // value={categories.categoryOfferStart}
                  onChange={handleOfferStart}
                />
              </Form.Item>

              <Form.Item label="To" style={{ marginLeft: '1rem' }}>
                <DatePicker
                  format="DD-MM-YYYY"
                  placeholder="To"
                  disabledDate={disabledDate}
                  // value={categories.categoryOfferEnd}
                  onChange={handleOfferEnd}
                />
              </Form.Item>
            </div>
          </Space>
        </div>

        <div style={{ marginLeft: '1rem' }}>
          <Select
            placeholder="Select an Option"
            // value={categories.categoryStatus}
            onChange={handleChangeStatus}
            // defaultValue={{ key: 'active' }}
            allowClear
          >
            <Option value="cardPayment">Card Payment</Option>
            <Option value="twoCheckout">Two Checkout</Option>
            <Option value="foodPanda">Food Panda</Option>
            <Option value="cashPayment">Cash Payment</Option>
          </Select>
        </div>

        <div style={{ marginLeft: '1rem' }}>
          <Input placeholder="Invoice No" />
        </div>

        <div className="group_btn">
          <Button className="search_btn">Search</Button>
          <Button className="print_btn">Print</Button>
        </div>
      </div>

      <div
        style={{
          padding: '2rem 1rem',
          marginTop: '1rem',
          borderRadius: '0.2rem',
          border: '1px solid #e5e5e5',
          marginRight: '1.5rem',
          display: 'block',
        }}
      >
        <div className="search_content">
          <Title level={3}>Dhaka Restaurant</Title>
          <Text>98 Green Road, Farmgate, Dhaka-1215.</Text>
          <br />
          <Text>Print Date: 09/01/2022 10:46:30</Text>
        </div>

        <div
          style={{
            // backgroundColor: '#f7f7f7',
            padding: '2rem',
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          }}
        >
          <Table
            columns={columns}
            bordered
            dataSource={data}
            pagination={false}
          />
        </div>
      </div>
    </>
  );
};

export default AllSalesReport;
