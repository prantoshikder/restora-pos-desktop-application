import { PictureOutlined, PlusCircleOutlined } from '@ant-design/icons';
import {
  Button,
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
import CurrencyModal from 'renderer/components/CurrencyModal';
import './ApplicationSetting.style.scss';

const { RangePicker } = DatePicker;
const { Option } = Select;

const ApplicationSetting = ({ setReRenderOnSettings, reRenderOnSettings }) => {
  window.get_app_settings.send('get_app_settings', { status: true });
  window.get_currency_lists.send('get_currency_lists', {
    status: true,
  });

  const format = 'HH:mm';
  const [form] = Form.useForm();
  const [appSettingsData, setAppSettingsData] = useState(null);
  const [currencyLists, setCurrencyLists] = useState([]);
  const [defaultData, setDefaultData] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [favIcon, setFavIcon] = useState(null);
  const [appLogo, setAppLogo] = useState(null);

  const [currencyModal, setCurrencyModal] = useState(false);
  const [addCurrency, setAddCurrency] = useState(null);

  const [restaurantTime, setRestaurantTime] = useState({
    openingTime: '',
    closingTime: '',
  });

  useEffect(() => {
    getDataFromDatabase(
      'get_app_settings_response',
      window.get_app_settings
    ).then((data) => {
      const response = data[0];

      setAppSettingsData(response);

      // setRestaurantTime({
      //   openingTime: response.opentime,
      //   closingTime: response.closetime,
      // });

      setDefaultData([
        {
          name: ['title'],
          value: response?.title,
        },
        {
          name: ['storename'],
          value: response?.storename,
        },
        {
          name: ['address'],
          value: response?.address,
        },
        {
          name: ['email'],
          value: response?.email,
        },
        {
          name: ['phone'],
          value: response?.phone,
        },
        {
          name: ['opentime'],
          // value: response?.opentime,
        },
        {
          name: ['closetime'],
          // value: response?.closetime,
        },
        {
          name: ['discount_type'],
          value:
            response?.discount_type === 2
              ? 'Percent'
              : response?.discount_type === 1
              ? 'Amount'
              : 'Percent',
        },
        {
          name: ['discountrate'],
          value: response?.discountrate,
        },
        {
          name: ['servicecharge'],
          value: response?.servicecharge,
        },
        {
          name: ['service_chargeType'],
          value: response?.service_chargeType,
        },
        {
          name: ['vat'],
          value: response?.vat,
        },
        {
          name: ['vattinno'],
          value: response?.vattinno,
        },
        {
          name: ['currency'],
          value: response?.currency,
        },
        {
          name: ['min_prepare_time'],
          value: response?.min_prepare_time,
        },
        {
          name: ['language'],
          value: response?.language,
        },
        {
          name: ['dateformat'],
          value: response?.dateformat,
        },
        {
          name: ['timezone'],
          value: response?.timezone,
        },
        {
          name: ['site_align'],
          value: response?.site_align,
        },
        {
          name: ['powerbytxt'],
          value: '© Copyright Restora POS',
        },
        {
          name: ['footer_text'],
          value: response?.footer_text,
        },
      ]);
    });
  }, [reRenderOnSettings]);

  useEffect(() => {
    getDataFromDatabase(
      'get_currency_lists_response',
      window.get_currency_lists
    )
      .then((res) => {
        Array.isArray(res) && res?.length && setCurrencyLists(res);
      })
      .catch((err) => console.log('Getting menu types error', err));
  }, [reRender]);

  const handleFavicon = (e) => {
    console.log('hanlde file', e);
  };
  const normFile = (e) => {
    console.log('hanlde file norm', e);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleAvailableOn = (time, timeString) => {
    setRestaurantTime({ ...restaurantTime, openingTime: timeString });
  };
  const handleClosingTime = (time, timeString) => {
    setRestaurantTime({ ...restaurantTime, closingTime: timeString });
  };

  const handleSubmit = (e) => {
    const settingsValue = {};

    for (const data of defaultData) {
      settingsValue[data.name[0]] = data.value;
    }

    if (favIcon) {
      settingsValue.favicon = JSON.stringify({
        name: favIcon.name,
        path: favIcon.path,
      });
      settingsValue.newFavicon = true;
    } else {
      settingsValue.favicon = appSettingsData?.favicon;
      settingsValue.newFavicon = false;
    }

    if (appLogo) {
      settingsValue.logo = JSON.stringify({
        name: appLogo.name,
        path: appLogo.path,
      });
      settingsValue.newLogo = true;
    } else {
      settingsValue.logo = appSettingsData?.logo;
      settingsValue.newLogo = false;
    }

    settingsValue.discount_type =
      settingsValue.discount_type === 'Amount'
        ? 1
        : settingsValue.discount_type === 'Percent'
        ? 2
        : 2;

    settingsValue.opentime = restaurantTime?.openingTime;
    settingsValue.closetime = restaurantTime?.closingTime;

    // send data to the main process
    window.insert_settings.send('insert_settings', settingsValue);

    setReRenderOnSettings((prevState) => !prevState);

    message.success({
      content: 'Settings done successfully',
      className: 'custom-class',
      duration: 1,
      style: {
        marginTop: '5vh',
        float: 'right',
      },
    });
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

  const handleCurrencyModal = () => {
    setCurrencyModal(true);
  };

  return (
    <div className="application_setting">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        fields={defaultData}
        onFieldsChange={(_, allFields) => {
          setDefaultData(allFields);
        }}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row gutter={20}>
          <Col lg={12} xl={13} xxl={13}>
            {/* <Form.Item
              label="Application Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Application Title is required',
                },
              ]}
            >
              <Input placeholder="Application Title" size="large" />
            </Form.Item> */}

            <Form.Item
              label="Store Name"
              name="storename"
              rules={[
                {
                  required: true,
                  message: 'Store Name is required',
                },
              ]}
            >
              <Input placeholder="Store Name" size="large" />
            </Form.Item>

            <Form.Item label="Address" name="address">
              <Input placeholder="Address" size="large" />
            </Form.Item>

            <Form.Item label="Email Address" name="email">
              <Input placeholder="Email Address" size="large" />
            </Form.Item>

            <Form.Item label="Phone" name="phone">
              <Input placeholder="Phone" size="large" />
            </Form.Item>

            <Form.Item label="Favicon">
              <Row gutter={20}>
                <Col lg={13} xl={16} xxl={16}>
                  <Form.Item
                    name="favicon"
                    // valuePropName="fileList"
                    // getValueFromEvent={handleFavicon}
                    noStyle
                  >
                    <Upload.Dragger
                      name="files"
                      customRequest={(imageObj) => {
                        setFavIcon(imageObj.file);
                      }}
                      accept=".jpg, .png, .jpeg, .gif"
                      showUploadList={false}
                    >
                      <p className="ant-upload-drag-icon">
                        <PictureOutlined />
                      </p>
                      <p className="ant-upload-hint">
                        Click or drag a favicon to this area to upload
                      </p>
                    </Upload.Dragger>
                  </Form.Item>
                </Col>
                <Col lg={11} xl={8} xxl={8}>
                  <h4>Preview</h4>
                  {favIcon ? (
                    <Image
                      width={125}
                      src={URL.createObjectURL(favIcon)}
                      preview={false}
                    />
                  ) : (
                    appSettingsData?.favicon && (
                      <Image
                        width={125}
                        src={`file://${appSettingsData?.favicon}`}
                        preview={false}
                      />
                    )
                  )}
                </Col>
              </Row>
            </Form.Item>

            <Form.Item label="Logo">
              <Row gutter={20}>
                <Col lg={13} xl={16} xxl={16}>
                  <Form.Item
                    name="logo"
                    // valuePropName="fileList"
                    // getValueFromEvent={normFile}
                    noStyle
                  >
                    <Upload.Dragger
                      name="files"
                      customRequest={(imageObj) => {
                        setAppLogo(imageObj.file);
                      }}
                      accept=".jpg, .png, .jpeg, .gif"
                      showUploadList={false}
                    >
                      <p className="ant-upload-drag-icon">
                        <PictureOutlined />
                      </p>
                      <p className="ant-upload-hint">
                        Click or drag & drop a logo here to upload
                      </p>
                    </Upload.Dragger>
                  </Form.Item>
                </Col>
                <Col lg={11} xl={8} xxl={8}>
                  <h4>Preview</h4>
                  {appLogo ? (
                    <Image
                      width={125}
                      src={URL.createObjectURL(appLogo)}
                      preview={false}
                    />
                  ) : (
                    appSettingsData?.logo && (
                      <Image
                        width={125}
                        src={`file://${appSettingsData?.logo}`}
                        preview={false}
                      />
                    )
                  )}
                </Col>
              </Row>
            </Form.Item>

            <Row gutter={20}>
              <Col lg={12}>
                <Form.Item label="Available On" name="opentime">
                  {/* <Input placeholder="Available On" size="large" /> */}
                  <TimePicker
                    // defaultValue={moment('12:08', format)}
                    onSelect={moment(appSettingsData?.opentime)}
                    format={format}
                    size="large"
                    onChange={handleAvailableOn}
                  />
                </Form.Item>
              </Col>

              <Col lg={12}>
                <Form.Item label="Closing Time" name="closetime">
                  {/* <Input placeholder="Closing Time" size="large" /> */}
                  <TimePicker
                    defaultValue={moment('12:08', format)}
                    format={format}
                    size="large"
                    onChange={handleClosingTime}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col lg={12} xl={11} xxl={11}>
            <Row gutter={20}>
              <Col lg={12}>
                <Form.Item name="discount_type" label="Discount Type">
                  <Select
                    placeholder="Select an Option"
                    size="large"
                    allowClear
                  >
                    <Option value="1">Amount</Option>
                    <Option value="2">Percent</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col lg={12}>
                <Form.Item label="Discount Rate" name="discountrate">
                  <Input placeholder="Discount Rate" size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col lg={12}>
                <Form.Item
                  label="Select Service Charge Type"
                  name="service_chargeType"
                >
                  <Select
                    placeholder="Select an Option"
                    size="large"
                    allowClear
                  >
                    <Option value="amount">Amount</Option>
                    <Option value="percent">Percent</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col lg={12}>
                <Form.Item label="Service Charge" name="servicecharge">
                  <Input placeholder="Service Charge" size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col lg={12}>
                <Form.Item label="Vat %" name="vat">
                  <Input placeholder="0.00" size="large" />
                </Form.Item>
              </Col>

              <Col lg={12}>
                <Form.Item label="Tin Number" name="vattinno">
                  <Input placeholder="Tin Number" size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col lg={12}>
                <Row gutter={20}>
                  <Col lg={20}>
                    <Form.Item label="Currency" name="currency">
                      <Select
                        placeholder="Select Currency"
                        size="large"
                        allowClear
                      >
                        {currencyLists?.map((currencyItem) => (
                          <Option
                            key={currencyItem?.id}
                            value={currencyItem?.currency_icon}
                          >
                            {currencyItem?.currency_name}{' '}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col lg={4}>
                    <Form.Item label=" ">
                      <Button
                        type="primary"
                        size="large"
                        onClick={handleCurrencyModal}
                      >
                        <PlusCircleOutlined />
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>

              <Col lg={12}>
                <Form.Item label="Delivery Time" name="min_prepare_time">
                  <Input placeholder="Delivery Time" size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Language" name="language">
              <Select placeholder="Select Language" size="large" allowClear>
                <Option value="english">English</Option>
                <Option value="spanish">Spanish</Option>
                <Option value="turkish">Turkish</Option>
                <Option value="arabic">Arabic</Option>
              </Select>
            </Form.Item>

            <Row gutter={20}>
              <Col lg={12}>
                <Form.Item label="Date Format" name="dateformat">
                  <Select placeholder="Select Your " size="large" allowClear>
                    <Option value="DD/MM/YYYY">dd/mm/yyyy</Option>
                    <Option value="YYYY/MM/DD">yyyy/mm/dd</Option>
                    <Option value="DD-MM-YYYY">dd-mm-yyyy</Option>
                    <Option value="YYYY-MM-DD">yyyy-mm-dd</Option>
                    <Option value="MM/DD/YYYY">mm/dd/yyyy</Option>
                    <Option value="DD M,YYYY">dd M,yyyy</Option>
                    <Option value="DD MM,YYYY">dd MM,yyyy</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col lg={12}>
                <Form.Item
                  label="Time Zone"
                  name="timezone"
                  style={{ marginLeft: 'auto' }}
                >
                  <Select
                    placeholder="Select Your Time zone"
                    size="large"
                    allowClear
                  >
                    <Option value="asiaDhaka">Asia/Dhaka</Option>
                    <Option value="asiaThimbu">Asia/Thimbu</Option>
                    <Option value="asiaJakarta">Asia/Jakarta</Option>
                    <Option value="asiaOmsk">Asia/Omsk</Option>
                    <Option value="asiaHovd">Asia/Hovd</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Application Alignment" name="site_align">
              <Select
                placeholder="Select Application Alignment"
                size="large"
                allowClear
              >
                <Option value="ltr">Left to Right</Option>
                <Option value="rtl">Right to Left</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Copyright Information" name="powerbytxt">
              <Input
                placeholder="©Copyright RESTORA POS"
                size="large"
                readOnly={true}
                disabled
                rows={2}
              />
            </Form.Item>

            {/* <Form.Item label="Footer Text" name="footer_text">
              <Input.TextArea placeholder="Footer Text" size="large" rows={2} />
            </Form.Item> */}

            <div className="button_group">
              <Button
                type="danger"
                className="resetBtn"
                style={{
                  marginRight: '0.6rem',
                }}
                onClick={handleReset}
                className="reset_btn"
              >
                Reset
              </Button>
              <Button
                type="primary"
                className="save_btn"
                htmlType="submit"
                className="submit_btn"
              >
                Submit
              </Button>
            </div>
          </Col>
        </Row>
      </Form>

      <CurrencyModal
        currencyModal={currencyModal}
        setCurrencyModal={setCurrencyModal}
        addCurrency={addCurrency}
        setAddCurrency={setAddCurrency}
        setReRender={setReRender}
      />
    </div>
  );
};

export default ApplicationSetting;
