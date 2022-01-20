import {
  Button,
  DatePicker,
  Form,
  Select,
  Space,
  Table,
  Typography,
} from 'antd';
import moment from 'moment';
import React, { useState } from 'react';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title, Text } = Typography;

const AllItemSalesReport = () => {
  const disabledDate = (current) => {
    return current && current < moment().endOf('day');
  };

  const handleChangeStatus = (value) => {
    console.log('value', value);
  };

  const handleOfferStart = (value, dateString) => {
    console.log('value', value);
    console.log('dateString', dateString);
  };

  const handleOfferEnd = (value, dateString) => {
    console.log('value', value);
    console.log('dateString', dateString);
  };

  const [checkStrictly, setCheckStrictly] = useState(false);

  const columns = [
    {
      title: 'Items Name',
      dataIndex: 'itemsName',
      key: 'itemsName',
      width: '30%',
    },
    {
      title: 'Variant Name',
      dataIndex: 'variantName',
      key: 'variantName',
      width: '15%',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: '12%',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: '12%',
      align: 'right',
    },
  ];

  const data = [
    {
      key: 1,
      itemsName: 'Pizza',
      variantName: 'chicken',
      quantity: '3',
      totalAmount: '$800',
    },
    {
      key: 2,
      itemsName: 'Dosa',
      variantName: 'regular',
      quantity: '2',
      totalAmount: '$500',
    },
    {
      key: 3,
      itemsName: 'Chicken Lolly Pop(8 pc)',
      variantName: 'regular',
      quantity: '1',
      totalAmount: '$400',
    },
    {
      key: 4,
      itemsName: 'BOMA Burger',
      variantName: 'burger',
      quantity: '3',
      totalAmount: '$700',
    },
    {
      key: 5,
      itemsName: 'Chicken Fry',
      variantName: 'chicken',
      quantity: '2',
      totalAmount: '$800',
    },
  ];

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
          <Space direction="vertical" size={12}>
            <div className="offer_date_select">
              <Form.Item label="From">
                <DatePicker
                  format="DD-MM-YYYY"
                  placeholder="From"
                  disabledDate={disabledDate}
                  // value={}
                  onChange={handleOfferStart}
                />
              </Form.Item>

              <Form.Item label="To" style={{ marginLeft: '1rem' }}>
                <DatePicker
                  format="DD-MM-YYYY"
                  placeholder="To"
                  disabledDate={disabledDate}
                  // value={}
                  onChange={handleOfferEnd}
                />
              </Form.Item>
            </div>
          </Space>
        </div>

        <div style={{ marginLeft: '1rem' }}>
          <Select
            placeholder="Select an Option"
            // value={}
            onChange={handleChangeStatus}
            allowClear
          >
            <Option value="chicken">Chicken</Option>
            <Option value="kebab">Kebab</Option>
            <Option value="burger">Burger</Option>
            <Option value="pizza">Pizza</Option>
          </Select>
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
          margin: '0rem 1.5rem',
          display: 'block',
        }}
      >
        <div className="search_content">
          <Title level={3}>Dhaka Restaurant</Title>
          <Text>98 Green Road, Farmgate, Dhaka-1215.</Text>
          <br />
          <Text>Print Date: 10/01/2022 10:46:30</Text>
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
            dataSource={data}
            pagination={false}
          />
        </div>
      </div>
    </>
  );
};

export default AllItemSalesReport;
