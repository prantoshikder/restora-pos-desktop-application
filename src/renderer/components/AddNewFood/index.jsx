import { InfoCircleOutlined, PictureOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  message,
  Row,
  Select,
  TimePicker,
  Upload,
} from 'antd';
import { getDataFromDatabase } from 'helpers';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddNewFood.style.scss';

const { RangePicker } = DatePicker;
const { Option } = Select;

const AddNewFood = ({ state, settings }) => {
  // Get menu types e.g lunch, breakfast, dinner etc.
  window.get_active_menu_type_lists.send('get_active_menu_type_lists', {
    status: true,
  });

  const dateFormat = settings?.dateformat ? settings?.dateformat : 'DD/MM/YYYY';

  const [form] = Form.useForm();
  const format = 'mm:ss';
  let navigate = useNavigate();

  const selectedValue = state?.menu_type.split(',');

  const [menuTypes, setMenuTypes] = useState([]);
  const [parentCategory, setParentCategory] = useState([]);
  const [offerStartDate, setOfferStartDate] = useState('');
  const [offerEndDate, setOfferEndDate] = useState('');
  const [addNewFood, setAddNewFood] = useState([]);
  const [timePicker, setTimePicker] = useState('');
  const [menuType, setMenuType] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [productImage, setProductImage] = useState(null);

  const offerStatus = state?.offer_is_available === 1 ? true : false;
  const [isOfferChecked, setIsOfferChecked] = useState(offerStatus);
  const [checkedList, setCheckedList] = useState(selectedValue);
  const [indeterminate, setIndeterminate] = useState(true);

  useEffect(() => {
    setAddNewFood([
      {
        name: ['category_name'],
        value: state?.category_name,
      },
      {
        name: ['kitchen_select'],
        value: state?.kitchen_id,
      },
      {
        name: ['food_name'],
        value: state?.product_name,
      },
      {
        name: ['component'],
        value: state?.component,
      },
      {
        name: ['notes'],
        value: state?.item_note,
      },
      {
        name: ['description'],
        value: state?.description,
      },
      // {
      //   name: ['food_image'],
      //   value: state?.product_image,
      // },
      {
        name: ['vat'],
        value: state?.product_vat || '0.00%',
      },
      {
        name: ['offer_is_available'],
        value: state?.offer_is_available,
      },
      {
        name: ['special'],
        value: state?.special,
      },
      {
        name: ['custom_quantity'],
        value: state?.is_custom_quantity,
      },
      {
        name: ['offer_rate'],
        value: state?.offers_rate,
      },
      {
        name: ['menu_type'],
        value: state?.menu_type,
      },
      {
        name: ['food_status'],
        value: state?.is_active || 'Active',
      },
    ]);

    window.parent_category.send('parent_category', { status: true });

    window.parent_category.once('parent_category', (args = []) => {
      console.log('cats args', args);
      const categoryFilter =
        Array.isArray(args) &&
        args?.filter(
          (category) =>
            category.category_is_active !== 0 &&
            category.category_is_active !== null
        );

      // args.map(category => {
      //   if(category.parent_id !== null) {}
      // })

      setParentCategory(categoryFilter);
    });
  }, [reRender]);

  useEffect(() => {
    getDataFromDatabase(
      'get_active_menu_type_lists_response',
      window.get_active_menu_type_lists
    )
      .then((res) => {
        Array.isArray(res) &&
          res?.length &&
          setMenuTypes(res.map((item) => item.menu_type));
      })
      .catch((err) => console.log('Getting menu types error', err));
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
    return current && current < moment().endOf('day');
  };

  const changesMenuType = (checkedValues) => {
    setCheckedList(checkedValues);
    setIndeterminate(
      !!checkedValues.length && checkedValues.length < menuTypes.length
    );

    setMenuType(checkedValues);
  };

  const handleOfferInfo = () => {
    setIsOfferChecked(!isOfferChecked);
  };

  const handleOfferStart = (timeObj, stringDate) => {
    setOfferStartDate(stringDate);
  };

  const handleOfferEnd = (timeObj, stringDate) => {
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
    setCheckedList('');
    setProductImage('');

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
      newFoods[data.name[0]] =
        typeof data.value === 'string' ? data?.value?.trim() : data?.value;
    }

    parseInt(newFoods.food_status);

    newFoods.food_status === 'Active'
      ? (newFoods.food_status = 1)
      : parseInt(newFoods.food_status) === 1
      ? (newFoods.food_status = 1)
      : (newFoods.food_status = 0);

    newFoods.offer_start_date = offerStartDate;
    newFoods.offer_end_date = offerEndDate;
    newFoods.cooking_time = timePicker;
    newFoods.menu_type = menuType;
    newFoods.offer_rate = newFoods.offer_rate ? newFoods.offer_rate : undefined;
    newFoods.id = state?.id;
    // productImage

    if (state?.category_id) {
      newFoods.category_name = state?.category_id;
    }

    newFoods.custom_quantity === true
      ? (newFoods.custom_quantity = 1)
      : (newFoods.custom_quantity = 0);

    newFoods.is_offer === true
      ? (newFoods.is_offer = 1)
      : (newFoods.is_offer = 0);

    newFoods.special === true ? (newFoods.special = 1) : (newFoods.special = 0);

    if (productImage) {
      newFoods.food_image = JSON.stringify({
        name: productImage.name,
        path: productImage.path,
      });
    } else {
      newFoods.food_image = state?.product_image;
    }

    newFoods.offer_is_available = newFoods.offer_is_available ? 1 : 0;

    // Insert & update through the same event & channel
    window.add_new_foods.send('add_new_foods', newFoods);

    // Get add food name insert & update response
    window.add_new_foods.once('add_new_foods_response', ({ status }) => {
      if (status === 'updated') {
        message.success({
          content: 'Food name has been updated successfully',
          className: 'custom-class',
          duration: 1,
          style: {
            marginTop: '5vh',
            float: 'right',
          },
        });

        navigate('/food_list');
      } else {
        setReRender((prevState) => !prevState);

        setCheckedList('');
        setProductImage('');

        message.success({
          content: 'Foods name added successfully',
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
            <Form.Item
              name="category_name"
              label="Category"
              rules={[
                {
                  required: true,
                  message: 'Category name is required',
                },
              ]}
            >
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

            {/* <Form.Item
              name="kitchen_select"
              label="Select Kitchen"
              rules={[
                {
                  required: true,
                  message: 'Kitchen select is required',
                },
              ]}
            >
              <Select placeholder="Select a kitchen" size="large" allowClear>
                <Option value="1">Common</Option>
                <Option value="2">MAIN</Option>
                <Option value="3">Mexican</Option>
                <Option value="4">Italian</Option>
                <Option value="5">Chinese</Option>
              </Select>
            </Form.Item> */}

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
                    <Upload.Dragger
                      name="files"
                      customRequest={(imageObj) => {
                        setProductImage(imageObj.file);
                      }}
                      accept=".jpg, .png, .jpeg, .gif"
                      showUploadList={false}
                    >
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
                  <h3>Preview</h3>
                  {productImage ? (
                    <Image
                      width={125}
                      src={URL.createObjectURL(productImage)}
                      preview={false}
                    />
                  ) : (
                    state?.product_image && (
                      <Image
                        width={125}
                        src={state?.product_image}
                        preview={false}
                      />
                    )
                  )}
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
              <Form.Item valuePropName="checked" name="offer_is_available">
                <Checkbox onChange={handleOfferInfo} checked={isOfferChecked}>
                  Offer
                </Checkbox>
              </Form.Item>

              <Form.Item name="special" valuePropName="checked">
                <Checkbox onChange={handleSpecial}>Special</Checkbox>
              </Form.Item>
            </div>

            <Form.Item name="custom_quantity" valuePropName="checked">
              <Checkbox onChange={customQuantity}>Custom Quantity</Checkbox>
            </Form.Item>

            {isOfferChecked && (
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
                  <Input placeholder="e.g 5%" size="large" />
                </Form.Item>

                <Row gutter={20}>
                  <Col lg={12}>
                    <Form.Item label="Offer Start Date" name="offer_start_date">
                      {state?.offer_start_date ? (
                        <DatePicker
                          format={dateFormat}
                          placeholder="Offer Start Date"
                          disabledDate={disabledDate}
                          onChange={handleOfferStart}
                          defaultValue={moment(
                            `${state.offer_start_date}`,
                            dateFormat
                          )}
                        />
                      ) : (
                        <DatePicker
                          format={dateFormat}
                          placeholder="Offer Start Date"
                          disabledDate={disabledDate}
                          onChange={handleOfferStart}
                        />
                      )}
                    </Form.Item>
                  </Col>
                  <Col lg={12}>
                    <Form.Item label="Offer End Date" name="offer_end_date">
                      {state?.offer_end_date ? (
                        <DatePicker
                          format={dateFormat}
                          placeholder="Offer End Date"
                          disabledDate={disabledDate}
                          onChange={handleOfferEnd}
                          defaultValue={moment(
                            `${state.offer_end_date}`,
                            dateFormat
                          )}
                        />
                      ) : (
                        <DatePicker
                          format={dateFormat}
                          placeholder="Offer End Date"
                          disabledDate={disabledDate}
                          onChange={handleOfferEnd}
                        />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}

            <Form.Item label="Cooking Time">
              {state?.cooked_time ? (
                <TimePicker
                  onChange={handleChangeTime}
                  format={format}
                  defaultValue={moment(`${state.cooked_time}`, format)}
                />
              ) : (
                <TimePicker onChange={handleChangeTime} format={format} />
              )}
            </Form.Item>

            <Form.Item
              label="Menu Type"
              name="menu_type"
              valuePropName="checked"
            >
              <Checkbox.Group
                options={menuTypes}
                value={checkedList}
                onChange={changesMenuType}
              />
            </Form.Item>

            <Form.Item name="food_status" label="Status">
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
                onClick={handleReset}
                className="reset_btn"
              >
                Reset
              </Button>
              <Button type="primary" htmlType="submit" className="submit_btn">
                {state?.category_id ? 'Update' : 'Submit'}
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddNewFood;
