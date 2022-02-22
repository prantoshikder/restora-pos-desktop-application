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
  Upload,
} from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddNewCategory.style.scss';

const { RangePicker } = DatePicker;
const { Option } = Select;

const AddNewCategory = ({ state }) => {
  const [form] = Form.useForm();
  let navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [packageOffer, setPackageOffer] = useState('');
  const [offerEndDate, setOfferEndDate] = useState('');
  const [offerStartDate, setOfferStartDate] = useState('');
  const [parentCategory, setParentCategory] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [categoryIcon, setCategoryIcon] = useState(null);
  const [categoryImage, setCategoryImage] = useState(null);

  // Get only 3 columns from the add_item_category table from database
  // category_id, category_name, parent_id
  window.parent_category.send('parent_category', { status: true });

  useEffect(() => {
    setCategories([
      {
        name: ['category_name'],
        value: state?.category_name,
      },
      {
        name: ['parent_id'],
        value: state?.parent_id,
      },
      {
        name: ['category_color'],
        value: state?.category_color,
      },
      {
        name: ['category_image'],
        value: state?.category_image,
      },
      {
        name: ['category_icon'],
        value: state?.category_icon,
      },
      {
        name: ['category_is_active'],
        value: state?.category_is_active || 'Active',
      },
    ]);

    window.parent_category.once('parent_category', (args = []) => {
      const categoryFilter =
        Array.isArray(args) &&
        args?.filter(
          (category) =>
            category.category_is_active !== 0 &&
            category.category_is_active !== null
        );

      const categories = categoryFilter.sort((a, b) => {
        if (a.parent_id < b.parent_id) {
          return a.parent_id - b.parent_id;
        }
      });

      setParentCategory(categories);
    });
  }, [reRender]);

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

  const handleChangeStartDate = (date, stringDate) => {
    setOfferStartDate(stringDate);
  };
  const handleChangeEndDate = (date, stringDate) => {
    setOfferEndDate(stringDate);
  };

  const handleSubmit = () => {
    const newCategory = {};

    for (const data of categories) {
      newCategory[data.name[0]] =
        typeof data.value === 'string' ? data?.value?.trim() : data?.value;
    }

    parseInt(newCategory.category_is_active);

    newCategory.category_is_active === 'Active'
      ? (newCategory.category_is_active = 1)
      : parseInt(newCategory.category_is_active) === 1
      ? (newCategory.category_is_active = 1)
      : (newCategory.category_is_active = 0);

    newCategory.offer_start_date = offerStartDate;
    newCategory.offer_end_date = offerEndDate;
    newCategory.category_id = state?.category_id;
    newCategory.category_image = JSON.stringify({
      name: categoryImage.file.name,
      path: categoryImage.file.path,
    });
    newCategory.category_icon = JSON.stringify({
      name: categoryIcon.file.name,
      path: categoryIcon.file.path,
    });

    // Insert & update through the same event & channel
    window.add_category.send('insertCategoryData', newCategory);

    // Get add category insert & update response
    window.add_category.once('after_insert_get_response', ({ status }) => {
      if (status === 'updated') {
        message.success({
          content: 'Category has been updated successfully',
          className: 'custom-class',
          duration: 1,
          style: {
            marginTop: '5vh',
            float: 'right',
          },
        });

        navigate('/category_list');
      } else {
        setReRender((prevState) => !prevState);

        message.success({
          content: 'Food category added successfully',
          className: 'custom-class',
          duration: 1,
          style: {
            marginTop: '5vh',
            float: 'right',
          },
        });

        form.resetFields();
      }
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
                {parentCategory?.map((catItem) => (
                  <Option
                    key={catItem?.category_id}
                    value={catItem?.category_id}
                  >
                    {catItem?.category_name}
                  </Option>
                ))}
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
                    <Upload.Dragger
                      name="files"
                      customRequest={(imageObj) => {
                        setCategoryImage(imageObj);
                      }}
                    >
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
                  <h3>Preview</h3>
                  {categoryImage?.file && (
                    <img
                      src={URL.createObjectURL(categoryImage.file)}
                      alt="Category"
                    />
                  )}
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
                    <Upload.Dragger
                      name="files"
                      customRequest={(icon) => {
                        setCategoryIcon(icon);
                      }}
                    >
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
                  <h4>Preview</h4>
                  {categoryIcon?.file && (
                    <img
                      src={URL.createObjectURL(categoryIcon.file)}
                      alt="Icon"
                    />
                  )}
                </Col>
              </Row>
            </Form.Item>

            <Form.Item valuePropName="checked">
              <Checkbox onClick={handleOfferInfo}>Offer</Checkbox>
            </Form.Item>

            {packageOffer && (
              <div className="offer_date_select">
                <Row gutter={20}>
                  <Col lg={12}>
                    <Form.Item name="offer_start_date" label="Offer Start Date">
                      <DatePicker
                        format="DD-MM-YYYY"
                        placeholder="Offer Start Date"
                        disabledDate={disabledDate}
                        onChange={handleChangeStartDate}
                      />
                    </Form.Item>
                  </Col>

                  <Col lg={12}>
                    <Form.Item name="offer_end_date" label="Offer End Date">
                      <DatePicker
                        format="DD-MM-YYYY"
                        placeholder="Offer End Date"
                        onChange={handleChangeEndDate}
                        disabledDate={disabledDate}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            )}

            <Form.Item name="category_is_active" label="Status">
              <Select placeholder="Select an Option" size="large" allowClear>
                <Option value="1">Active</Option>
                <Option value="0">Inactive</Option>
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
