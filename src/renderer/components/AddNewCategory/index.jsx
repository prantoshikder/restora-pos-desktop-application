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
  Typography,
  Upload,
} from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import './AddNewCategory.style.scss';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title } = Typography;

const AddNewCategory = () => {
  const [form] = Form.useForm();
  const [packageOffer, setPackageOffer] = useState('');

  const [categories, setCategories] = useState({
    categoryName: '',
    parentCategory: '',
    categoryImage: '',
    categoryIcon: '',
    categoryStatus: 'active',
    categoryOfferStart: '',
    categoryOfferEnd: '',
    categoryBackgroundColor: '#0f71c5',
  });

  const handleSelectCategory = (value) => {
    setCategories({ ...categories, parentCategory: value });
  };

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const fileList = [];

  const handleOfferInfo = () => {
    setPackageOffer(!packageOffer);
  };

  // Date Picker
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  };

  const handleChangeStatus = (value) => {
    setCategories({ ...categories, categoryStatus: value });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleOfferStart = (value, dateString) => {
    console.log('value', value);
    console.log('dateString', dateString);
    setCategories({ ...categories, categoryOfferStart: value });
  };

  const handleOfferEnd = (value, dateString) => {
    console.log('value', value);
    console.log('dateString', dateString);
    setCategories({ ...categories, categoryOfferEnd: value });
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
    console.log('categories', categories);

    message.success({
      content: 'Foods category added successfully',
      className: 'custom-class',
      duration: 1,
      style: {
        marginTop: '5vh',
        float: 'right',
      },
    });
  };

  return (
    <div className="add_new_category">
      <Title level={3}>Add Category</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row>
          <Col lg={7}>
            <Form.Item
              label="Category name"
              name="categoryName"
              rules={[
                {
                  required: true,
                  message: 'Category name is required',
                },
              ]}
            >
              <Input
                placeholder="Category Name"
                size="large"
                value={categories.categoryName}
                onChange={(e) =>
                  setCategories({ ...categories, categoryName: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item name="parent category" label="Parent Category">
              <Select
                placeholder="Select an Option"
                value={categories.parentCategory}
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

            <Form.Item
              label="Category Background Color"
              tooltip={{
                title:
                  'Change category menu background color that will be shown in the POS',
                icon: <InfoCircleOutlined />,
              }}
            >
              <Input
                type="color"
                size="medium"
                name="color"
                value={categories.categoryBackgroundColor}
                onChange={(e) =>
                  setCategories({
                    ...categories,
                    categoryBackgroundColor: e.target.value,
                  })
                }
              />
            </Form.Item>

            <Form.Item
              label="Upload Category Image"
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
                        Click or drag file to this area to upload
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
            <Form.Item
              label="Category Icon"
              tooltip={{
                title:
                  'Use only .jpg,.jpeg,.gif and .png Images & Icon size: 28 X 26',
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
                        Please, select category icon
                      </p>
                    </Upload.Dragger>
                  </Form.Item>
                </Col>
                <Col lg={4}>
                  <h4>Preview Icon</h4>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item name="offer" valuePropName="checked">
              <Checkbox onClick={handleOfferInfo}>Offer</Checkbox>
            </Form.Item>

            {packageOffer && (
              <Space direction="vertical" size={12}>
                <div className="offer_date_select">
                  <Form.Item label="Offer Start Date">
                    <DatePicker
                      format="DD-MM-YYYY"
                      placeholder="Offer Start Date"
                      disabledDate={disabledDate}
                      value={categories.categoryOfferStart}
                      onChange={handleOfferStart}
                    />
                  </Form.Item>

                  <Form.Item label="Offer End Date">
                    <DatePicker
                      format="DD-MM-YYYY"
                      placeholder="Offer End Date"
                      disabledDate={disabledDate}
                      value={categories.categoryOfferEnd}
                      onChange={handleOfferEnd}
                    />
                  </Form.Item>
                </div>
              </Space>
            )}

            <Form.Item name="status" label="Status">
              <Select
                placeholder="Select an Option"
                value={categories.categoryStatus}
                onChange={handleChangeStatus}
                defaultValue={{ key: 'active' }}
                size="large"
                allowClear
              >
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Form.Item>

            <div className="button_group">
              <Button
                type="primary"
                className="resetBtn"
                style={{
                  marginRight: '0.6rem',
                }}
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button type="primary" className="save_btn" htmlType="submit">
                Submit
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddNewCategory;
