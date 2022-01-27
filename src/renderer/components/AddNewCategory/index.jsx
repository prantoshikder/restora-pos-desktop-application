import { InfoCircleOutlined, PictureOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Upload
} from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import './AddNewCategory.style.scss';

const { RangePicker } = DatePicker;
const { Option } = Select;

const AddNewCategory = () => {
  window.api.send('getCategoryData', { status: true });

  const [form] = Form.useForm();
  const [packageOffer, setPackageOffer] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategoriesData().then((data) => {
      setCategories([
        {
          name : ['category_name'],
          value: data?.category_name,
        },
        {
          name : ['parent_id'],
          value: data?.parent_id,
        },
        {
          name : ['category_color'],
          value: data?.category_color,
        },
        {
          name : ['category_image'],
          value: data?.category_image,
        },
        {
          name : ['category_icon'],
          value: data?.category_icon,
        },
        {
          name : ['offer_start_date'],
          value: data?.offer_start_date,
        },
        {
          name : ['offer_end_date'],
          value: data?.offer_end_date,
        },
        {
          name : ['category_is_active'],
          value: data?.category_is_active,
        },
      ])
    }
  }, [])

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

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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

    const categoriesValue = {};

    for(const data of categories) {
      categoriesValue[data.name[0]] = data.value;
    }

    window.api.send("getCategoryData", categoriesValue)

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
      <Form
        form={form}
        layout="vertical"
        fields={categories}
        onFinish={handleSubmit}
        onFieldsChange={(_, allFields) => {
          setCategories(allFields);
        }}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row gutter={40}>
          <Col lg={14}>
            <Form.Item
              label="Category name"
              name="category_name"
              rules={[
                {
                  required: true,
                  message: 'Category name is required',
                },
              ]}
            >
              <Input placeholder="Category Name" size="large" />
            </Form.Item>

            <Form.Item name="parent_id" label="Parent Category">
              <Select placeholder="Select an Option" size="large" allowClear>
                <Option value="1">Lunch Package</Option>
                <Option value="2">Japanese</Option>
                <Option value="3">Salad</Option>
                <Option value="4">Indian Food</Option>
                <Option value="5">Dinner Package</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Category Background Color"
              name="category_color"
              tooltip={{
                title:
                  'Change category menu background color that will be shown in the POS',
                icon: <InfoCircleOutlined />,
              }}
            >
              <Input type="color" size="medium" />
            </Form.Item>

            <Form.Item
              label="Upload Category Image"
              tooltip={{
                title:
                  'Use only .jpg,.jpeg,.gif and .png Images & Image size: 60 X 60',
                icon: <InfoCircleOutlined />,
              }}
            >
              <Row gutter={10}>
                <Col lg={16}>
                  <Form.Item
                    name="category_image"
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
                <Col lg={8}>
                  <h4>Preview Image</h4>
                </Col>
              </Row>
            </Form.Item>
          </Col>

          <Col lg={10}>
            <Form.Item
              label="Category Icon"
              tooltip={{
                title:
                  'Use only .jpg,.jpeg,.gif and .png Images & Icon size: 28 X 26',
                icon: <InfoCircleOutlined />,
              }}
            >
              <Row gutter={10}>
                <Col lg={16}>
                  <Form.Item
                    name="category_icon"
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
                <Col lg={8}>
                  <h4>Preview Icon</h4>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item valuePropName="checked">
              <Checkbox onClick={handleOfferInfo}>Offer</Checkbox>
            </Form.Item>

            {packageOffer && (
              <Space direction="vertical" size={12}>
                <div className="offer_date_select">
                  <Form.Item name="offer_start_date" label="Offer Start Date">
                    <DatePicker
                      format="DD-MM-YYYY"
                      placeholder="Offer Start Date"
                      disabledDate={disabledDate}
                    />
                  </Form.Item>

                  <Form.Item name="offer_end_date" label="Offer End Date">
                    <DatePicker
                      format="DD-MM-YYYY"
                      placeholder="Offer End Date"
                      disabledDate={disabledDate}
                    />
                  </Form.Item>
                </div>
              </Space>
            )}

            <Form.Item name="category_is_active" label="Status">
              <Select placeholder="Select an Option" size="large" allowClear>
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Form.Item>

            <div className="button_group">
              <Button
                type="danger"
                style={{
                  marginRight: '1rem',
                }}
                // className="resetBtn"
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button type="primary" htmlType="submit">
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
