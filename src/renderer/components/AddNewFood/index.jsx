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
  TimePicker,
  Upload,
} from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import './AddNewFood.style.scss';

const { RangePicker } = DatePicker;
const { Option } = Select;

const plainOptions = ['Party', 'Coffee', 'Dinner', 'Lunch', 'Breakfast'];

const AddNewFood = () => {
  const [form] = Form.useForm();
  const format = 'HH:mm';
  const [menuType, setMenuType] = useState([]);
  const [packageOffer, setPackageOffer] = useState('');
  const [addNewFood, setAddNewFood] = useState([]);
  const [offerStartDate, setOfferStartDate] = useState('');
  const [offerEndDate, setOfferEndDate] = useState('');
  const [timePicker, setTimePicker] = useState('');
  const [parentCategory, setParentCategory] = useState([]);
  const [reUpdate, setReUpdate] = useState(false);

  window.add_new_foods.once('add_new_foods_response', (args)=>{
    console.log(args);
  })



  useEffect(() => {
    setAddNewFood([
      {
        name: ['category_name'],
        // value: state?.category_name,
      },
      {
        name: ['kitchen_select'],
        // value: state?.kitchen_select,
      },
      {
        name: ['food_name'],
        // value: state?.food_name,
      },
      {
        name: ['component'],
        // value: state?.component,
      },
      {
        name: ['notes'],
        // value: state?.notes,
      },
      {
        name: ['description'],
        // value: state?.description,
      },
      {
        name: ['food_image'],
        // value: state?.food_image,
      },
      {
        name: ['vat'],
        // value: state?.vat,
      },
      {
        name: ['is_offer'],
        // value: state?.offer,
      },
      {
        name: ['special'],
        // value: state?.special,
      },
      {
        name: ['custom_quantity'],
        // value: state?.custom_quantity,
      },
      {
        name: ['price'],
        // value: state?.price,
      },
      {
        name: ['offer_rate'],
        // value: state?.offer_rate,
      },
      {
        name: ['offer_start_date'],
        // value: state?.offer_start_date,
      },
      {
        name: ['offer_end_date'],
        // value: state?.offer_end_date,
      },
      {
        name: ['cooking_time'],
        // value: state?.cooking_time,
      },
      {
        name: ['menu_type'],
        // value: state?.menu_type,
      },
      {
        name: ['food_status'],
        // value: state?.food_status,
      },
    ]);

    window.parent_category.send('parent_category', { status: true });

    window.parent_category.once('parent_category', (args = []) => {
      const categoryFilter =
        Array.isArray(args) &&
        args?.filter(
          (category) =>
            category.category_is_active !== 0 &&
            category.category_is_active !== null
        );
      setParentCategory(categoryFilter);
    });
  }, []);

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

  const changesMenuType = (checkedValues) => {
    console.log('menuType', checkedValues);
    setMenuType(checkedValues);
  };

  const handleOfferInfo = () => {
    setPackageOffer(!packageOffer);
  };

  const handleOfferStart = (value, stringDate) => {
    setOfferStartDate(stringDate);
  };

  const handleOfferEnd = (value, stringDate) => {
    setOfferEndDate(stringDate);
  };

  const handleChangeTime = (time, timeString) => {
    setTimePicker(timeString);
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
    const newFoods = {};

    for (const data of addNewFood) {
      newFoods[data.name[0]] = data.value;
    }

    newFoods.food_status === 'Active'
      ? (newFoods.food_status = 1)
      : (newFoods.food_status = 0);

    newFoods.offer_start_date = offerStartDate;
    newFoods.offer_end_date = offerEndDate;
    newFoods.cooking_time = timePicker;

    newFoods.menu_type = menuType;
    newFoods.offer_rate = newFoods.offer_rate ? newFoods.offer_rate : undefined;

    newFoods.custom_quantity === true
      ? (newFoods.custom_quantity = 1)
      : (newFoods.custom_quantity = 0);

    newFoods.is_offer === true
      ? (newFoods.is_offer = 1)
      : (newFoods.is_offer = 0);
    newFoods.special === true ? (newFoods.special = 1) : (newFoods.special = 0);

    message.success({
      content: 'Foods category added successfully',
      className: 'custom-class',
      duration: 1,
      style: {
        marginTop: '5vh',
        float: 'right',
      },
    });

    // setReUpdate((prevState) => !prevState);

    console.log('newFoods', newFoods);
    window.add_new_foods.send('add_new_foods', newFoods)
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="add_new_food">
      <Form
        form={form}
        fields={addNewFood}
        onFinish={handleSubmit}
        onFieldsChange={(_, allFields) => {
          setAddNewFood(allFields);
        }}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Row gutter={40}>
          <Col lg={14}>
            <Form.Item name="category_name" label="Category">
              <Select placeholder="Select a category" size="large" allowClear>
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

            <Form.Item name="kitchen_select" label="Select Kitchen">
              <Select placeholder="Select a kitchen" size="large" allowClear>
                <Option value="1">Common</Option>
                <Option value="2">MAIN</Option>
                <Option value="3">Mexican</Option>
                <Option value="4">Italian</Option>
                <Option value="5">Chinese</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Food Name"
              name="food_name"
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

            <Form.Item label="Description" name="description">
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
              <Row gutter={10}>
                <Col lg={16}>
                  <Form.Item
                    name="food_image"
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

                <Col lg={8}>
                  <h4>Preview Image</h4>
                </Col>
              </Row>
            </Form.Item>
          </Col>

          <Col lg={10}>
            <Form.Item
              label="Vat"
              name="vat"
              tooltip={{
                title: 'Vat are always calculate percent like:5 means:5%',
                icon: <InfoCircleOutlined />,
              }}
            >
              <Input placeholder="Vat" size="large" />
            </Form.Item>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Form.Item valuePropName="checked" name="is_offer">
                <Checkbox onClick={handleOfferInfo}>Offer</Checkbox>
              </Form.Item>

              <Form.Item name="special" valuePropName="checked">
                <Checkbox onChange={handleSpecial}>Special</Checkbox>
              </Form.Item>
            </div>

            <Form.Item name="custom_quantity" valuePropName="checked">
              <Checkbox onChange={customQuantity}>Custom Quantity</Checkbox>
            </Form.Item>

            {packageOffer && (
              <>
                <Form.Item
                  label="Offer Rate"
                  name="offer_rate"
                  tooltip={{
                    title:
                      'Offer Rate Must ba a number. It a Percentage Like: if 5% then put 5',
                    icon: <InfoCircleOutlined />,
                  }}
                >
                  <Input placeholder="Vat" size="large" />
                </Form.Item>

                <Row gutter={20}>
                  <Col lg={12}>
                    <Form.Item label="Offer Start Date" name="offer_start_date">
                      <DatePicker
                        format="DD-MM-YYYY"
                        placeholder="Offer Start Date"
                        disabledDate={disabledDate}
                        onChange={handleOfferStart}
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={12}>
                    <Form.Item label="Offer End Date" name="offer_end_date">
                      <DatePicker
                        format="DD-MM-YYYY"
                        placeholder="Offer End Date"
                        disabledDate={disabledDate}
                        onChange={handleOfferEnd}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}

            <Form.Item label="Cooking Time" name="cooking_time">
              <TimePicker onChange={handleChangeTime} format={format} />
            </Form.Item>

            <Form.Item
              label="Menu Type"
              name="menu_type"
              valuePropName="checked"
            >
              <Checkbox.Group
                options={plainOptions}
                onChange={changesMenuType}
              />
            </Form.Item>

            <Form.Item name="food_status" label="Status">
              <Select placeholder="Select an Option" size="large" allowClear>
                <Option value="1">Active</Option>
                <Option value="0">Inactive</Option>
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
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddNewFood;
