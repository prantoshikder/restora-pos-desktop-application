import { InfoCircleOutlined, PictureOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  message,
  Select,
  Space,
  TimePicker,
  Upload,
} from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import './AddNewFood.style.scss';

const { RangePicker } = DatePicker;
const { Option } = Select;

const plainOptions = ['Party', 'Coffee', 'Dinner', 'Lunch', 'Breakfast'];

const AddNewFood = () => {
  const [form] = Form.useForm();
  const format = 'HH:mm';
  const [value, setValue] = useState('active');
  const [menuType, setMenuType] = useState('');
  const [packageOffer, setPackageOffer] = useState('');

  const handleSelectCategory = () => {};
  const handleKitchenSelect = () => {};

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const fileList = [];

  // Date Picker
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  };

  const handleChangeStatus = (value) => {
    console.log('status', value);
    setValue(value);
  };

  function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
  }
  const changesMenuType = (checkedValues) => {
    console.log('menuType', checkedValues);
    setMenuType(checkedValues);
  };

  const handleOfferInfo = () => {
    setPackageOffer(!packageOffer);
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

  const customQuantity = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const handleSpecial = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const handleReset = () => {
    form.resetFields();

    message.success({
      content: 'Reset done',
      className: 'custom-class',
      duration: 1,
      style: {
        marginTop: '5vh',
        float: 'right',
      },
    });
  };

  const handleSubmit = () => {
    message.success({
      content: 'Foods category added successfully ',
      className: 'custom-class',
      duration: 1,
      style: {
        marginTop: '5vh',
        float: 'right',
      },
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="add_new_food">
      <Form
        form={form}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Row>
          <Col lg={7}>
            <Form.Item name="category" label="Category">
              <Select
                placeholder="Select a category"
                onChange={handleSelectCategory}
                size="large"
                allowClear
              >
                <Option value="lunch_package">Lunch Package</Option>
                <Option value="japanese">Japanese</Option>
                <Option value="salad">Salad</Option>
                <Option value="indian_food">Indian Food</Option>
                <Option value="dinner_package">Dinner Package</Option>
              </Select>
            </Form.Item>

            <Form.Item name="select kitchen" label="Select Kitchen">
              <Select
                placeholder="Select a kitchen"
                onChange={handleKitchenSelect}
                size="large"
                allowClear
              >
                <Option value="kitchen:1">Common</Option>
                <Option value="kitchen:2">MAIN</Option>
                <Option value="kitchen:3">Mexican</Option>
                <Option value="kitchen:4">Italian</Option>
                <Option value="kitchen:5">Chinese</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Food Name"
              name="foodName"
              rules={[
                {
                  required: true,
                  message: 'Food name is required',
                },
              ]}
              required
            >
              <Input placeholder="Food Name" size="large" />
            </Form.Item>

            <Form.Item label="Component" name="component">
              <Input placeholder="Add Component" size="large" />
            </Form.Item>

            <Form.Item label="Notes" name="notes">
              <Input placeholder="Add Notes" size="large" />
            </Form.Item>

            <Form.Item label="Description">
              <Input.TextArea placeholder="Description" size="large" />
            </Form.Item>

            <Form.Item
              label="Image"
              tooltip={{
                title:
                  'Use only .jpg,.jpeg,.gif and .png Images & Image size: 60 X 60',
                icon: <InfoCircleOutlined />,
              }}
            >
              <Row>
                <Col lg={8}>
                  <Form.Item
                    name="dragger"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    noStyle
                  >
                    <Upload.Dragger name="files" action="/upload.do">
                      <p className="ant-upload-drag-icon">
                        <PictureOutlined />
                      </p>
                      <p className="ant-upload-hint">
                        Support for a single or bulk upload.
                      </p>
                    </Upload.Dragger>
                  </Form.Item>
                </Col>
                <Col lg={4}>
                  <h4>Preview Image</h4>
                </Col>
              </Row>
            </Form.Item>
          </Col>

          <Col lg={5}>
            <div style={{ paddingLeft: '2rem' }}>
              <Form.Item
                label="Vat"
                tooltip={{
                  title: 'Vat are always calculate percent like:5 means:5%',
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input placeholder="Vat" size="large" />
              </Form.Item>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Form.Item name="offer" valuePropName="checked">
                  <Checkbox onClick={handleOfferInfo}>Offer</Checkbox>
                </Form.Item>

                <Form.Item name="special" valuePropName="checked">
                  <Checkbox onChange={handleSpecial}>Special</Checkbox>
                </Form.Item>
              </div>

              <Form.Item name="customQuantity" valuePropName="checked">
                <Checkbox onChange={customQuantity}>Custom Quantity</Checkbox>
              </Form.Item>

              {packageOffer && (
                <>
                  <Form.Item
                    label="Offer Rate"
                    tooltip={{
                      title:
                        'Offer Rate Must ba a number. It a Percentage Like: if 5% then put 5',
                      icon: <InfoCircleOutlined />,
                    }}
                  >
                    <Input placeholder="Vat" size="large" />
                  </Form.Item>

                  <Space direction="vertical" size={12}>
                    <div className="offer_date_select">
                      <Form.Item label="Offer Start Date">
                        <DatePicker
                          format="DD-MM-YYYY"
                          placeholder="Offer Start Date"
                          disabledDate={disabledDate}
                          // value={categories.categoryOfferStart}
                          onChange={handleOfferStart}
                        />
                      </Form.Item>

                      <Form.Item label="Offer End Date">
                        <DatePicker
                          format="DD-MM-YYYY"
                          placeholder="Offer End Date"
                          disabledDate={disabledDate}
                          // value={categories.categoryOfferEnd}
                          onChange={handleOfferEnd}
                        />
                      </Form.Item>
                    </div>
                  </Space>
                </>
              )}

              <Form.Item label="Cooking Time" name="cookingTime">
                <TimePicker
                  defaultValue={moment('12:08', format)}
                  format={format}
                />
                {/* <Input placeholder="0:00" size="large" /> */}
              </Form.Item>

              <Form.Item label="Menu Type" valuePropName="checked">
                <Checkbox.Group
                  options={plainOptions}
                  onChange={changesMenuType}
                />
              </Form.Item>

              <Form.Item name="status" label="Status">
                <Select
                  placeholder="Select an Option"
                  onChange={handleChangeStatus}
                  value={value}
                  defaultValue={{ key: 'active' }}
                  size="large"
                  allowClear
                >
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button
                  type="danger"
                  style={{
                    marginRight: '1rem',
                  }}
                  onClick={handleReset}
                >
                  Reset
                </Button>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddNewFood;
