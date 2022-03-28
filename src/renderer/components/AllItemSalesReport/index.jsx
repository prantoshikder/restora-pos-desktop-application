import { DatePicker, Select, Table, Typography } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { getDataFromDatabase } from './../../../helpers';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title, Text } = Typography;

const AllItemSalesReport = ({ settings }) => {
  window.get_order_info_for_item_sales_report.send(
    'get_order_info_for_item_sales_report',
    {
      status: true,
    }
  );

  const [itemSalesReports, setItemSalesReports] = useState(null);

  useEffect(() => {
    getDataFromDatabase(
      'get_order_info_for_item_sales_report_response',
      window.get_order_info_for_item_sales_report
    ).then((args = []) => {
      setItemSalesReports(args);
      console.log('%%%%%%%%%%%%%%%%', args);
    });
  }, []);

  const disabledDate = (current) => {
    return current && current < moment().endOf('day');
  };

  const handleChangeStatus = (value) => {
    console.log('value', value);
  };

  const handleOfferStart = (value, dateString) => {
    console.log('dateString', dateString);
  };

  const handleOfferEnd = (value, dateString) => {
    console.log('dateString', dateString);
  };

  const columns = [
    {
      title: 'Items Name',
      dataIndex: 'product_name',
      key: 'product_name',
      width: '30%',
    },
    {
      title: 'Variant Name',
      dataIndex: 'foodVariant',
      key: 'foodVariant',
      width: '15%',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: '12%',
    },
    {
      title: 'Unit Price',
      dataIndex: 'price',
      key: 'price',
      width: '12%',
      align: 'right',
    },
  ];

  return (
    <>
      {/* <div
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
                onChange={handleOfferStart}
              />
            </Form.Item>

            <Form.Item label="To" style={{ marginLeft: '1rem' }}>
              <DatePicker
                format="YYYY-MM-DD"
                placeholder="To"
                onChange={handleOfferEnd}
              />
            </Form.Item>
          </Space>
        </div>

        <div style={{ marginLeft: '1rem' }}>
          <Select
            placeholder="Select an Option"
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
        </div>
      </div> */}

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
            {settings?.storename ? settings?.storename : 'Restora POS'}
          </Title>
          <Text>
            {settings?.address
              ? settings?.address
              : 'B-25, Mannan Plaza, 4th Floor Khilkhet, Dhaka-1229, Bangladesh'}
          </Text>
          <br />
          {/* <Text>Print Date: 10/01/2022 10:46:30</Text> */}
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
            dataSource={itemSalesReports}
            pagination={false}
            rowKey={(record) => record.id}
          />
        </div>
      </div>
    </>
  );
};

export default AllItemSalesReport;
