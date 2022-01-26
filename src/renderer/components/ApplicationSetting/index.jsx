import { PictureOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select,
  Upload,
} from 'antd';
import React, { useEffect, useState } from 'react';
import './ApplicationSetting.style.scss';

const { RangePicker } = DatePicker;
const { Option } = Select;

const ApplicationSetting = () => {
  window.api.send('getSettingDataFromDB', { status: true });

  const [form] = Form.useForm();
  const [appSettingsData, setAppSettingsData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [defaultData, setDefaultData] = useState([]);
  const [setting, setSetting] = useState({
    applicationTitle: 'Munir',
    storeName: 'BDTASK',
    address: 'Mirpur 12',
    emailAddress: '',
    phone: '',
    availableOn: '',
    closingTime: '',
    discountType: '',
    discountRate: '',
    serviceChange: '',
    selectServiceChargeType: '',
    vatSetting: '',
    tinOrVatNumber: '',
    deliveryTime: '',
    currency: '',
    language: '',
    dateFormate: '',
    timeZone: '',
    applicationAlignment: '',
    poweredByText: '',
    footerText: '',
  });

  useEffect(() => {
    getApplicationSettingsData().then((data) => {
      setDefaultData([
        {
          name: ['title'],
          value: data?.title,
        },
        {
          name: ['storename'],
          value: data?.storename,
        },
        {
          name: ['address'],
          value: data?.address,
        },
        {
          name: ['email'],
          value: data?.email,
        },
        {
          name: ['phone'],
          value: data?.phone,
        },
        // {
        //   name: ['favicon'],
        //   value: data?.favicon,
        // },
        {
          name: ['opentime'],
          value: data?.opentime,
        },
        {
          name: ['closetime'],
          value: data?.closetime,
        },
        {
          name: ['discount_type'],
          value: data?.discount_type,
        },
        {
          name: ['discountrate'],
          value: data?.discountrate,
        },
        {
          name: ['servicecharge'],
          value: data?.servicecharge,
        },
        {
          name: ['service_chargeType'],
          value: data?.service_chargeType,
        },
        {
          name: ['vat'],
          value: data?.vat,
        },
        {
          name: ['vattinno'],
          value: data?.vattinno,
        },
        {
          name: ['currency'],
          value: data?.currency,
        },
        {
          name: ['min_prepare_time'],
          value: data?.min_prepare_time,
        },
        {
          name: ['language'],
          value: data?.language,
        },
        {
          name: ['dateformat'],
          value: data?.dateformat,
        },
        {
          name: ['timezone'],
          value: data?.timezone,
        },
        {
          name: ['site_align'],
          value: data?.site_align,
        },
        {
          name: ['powerbytxt'],
          value: data?.powerbytxt,
        },
      ]);
    });
  }, []);

  function getApplicationSettingsData() {
    return new Promise((resolve, reject) => {
      window.api.once('sendSettingDataFromMain', (settingsData) => {
        if (settingsData[0]) {
          resolve(settingsData[0]);
        } else {
          reject(Error('No settings found'));
        }
      });
    });
  }

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const fileList = [];

  const handleDocumentType = (value) => {
    setSetting({ ...setting, categoryStatus: value });
  };

  const handleSelectServiceCharge = (value) => {
    setSetting({ ...setting, selectServiceChargeType: value });
  };

  const handleCurrency = (value) => {
    setSetting({ ...setting, currency: value });
  };

  const handleLanguageSet = (value) => {
    setSetting({ ...setting, language: value });
  };

  const changeDateFormate = (value) => {
    setSetting({ ...setting, dateFormate: value });
  };

  const changeTimeZone = (value) => {
    setSetting({ ...setting, timeZone: value });
  };

  const changeApplicationAlignment = (value) => {
    setSetting({ ...setting, applicationAlignment: value });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleSubmit = (e) => {
    // get form value
    // e.preventDefault();

    const settingsValue = {};

    for (const data of defaultData) {
      settingsValue[data.name[0]] = data.value;
    }

    console.log('settingsValue', settingsValue);

    // console.log('defaultData', defaultData);
    // return;

    // send data to the main process
    window.api.send('getSettingDataFromDB', setting);

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
          <Col lg={13}>
            <Form.Item label="Application Title" name="title">
              <Input placeholder="Application Title" size="large" />
            </Form.Item>

            <Form.Item label="Store Name" name="storename">
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
                <Col lg={16}>
                  <Form.Item
                    name="favicon"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    noStyle
                  >
                    <Upload.Dragger name="files" action="/upload.do">
                      <p className="ant-upload-drag-icon">
                        <PictureOutlined />
                      </p>
                      <p className="ant-upload-hint">
                        Click or drag a favicon to this area to upload
                      </p>
                    </Upload.Dragger>
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <h4>Preview Image</h4>
                  {appSettingsData?.favicon && (
                    <img src={appSettingsData?.favicon} alt="Favicon" />
                  )}
                  {/* <img src='../../../../assets/icon.ico' alt="Favicon" /> */}
                </Col>
              </Row>
            </Form.Item>

            <Form.Item label="Logo">
              <Row gutter={20}>
                <Col lg={16}>
                  <Form.Item
                    name="logo"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    noStyle
                  >
                    <Upload.Dragger name="files" action="/upload.do">
                      <p className="ant-upload-drag-icon">
                        <PictureOutlined />
                      </p>
                      <p className="ant-upload-hint">
                        Click or drag & drop a logo here to upload
                      </p>
                    </Upload.Dragger>
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <h4>Preview Image</h4>
                  {appSettingsData?.logo && (
                    <img src={appSettingsData?.logo} alt="Logo" />
                  )}
                </Col>
              </Row>
            </Form.Item>

            <Form.Item label="Available On" name="opentime">
              <Input
                placeholder="Available On"
                size="large"
                value={setting.availableOn}
                onChange={(e) =>
                  setSetting({ ...setting, availableOn: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item label="Closing Time" name="closetime">
              <Input
                placeholder="Closing Time"
                size="large"
                value={setting.closingTime}
                onChange={(e) =>
                  setSetting({ ...setting, closingTime: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item name="discount_type" label="Discount Type">
              <Select
                placeholder="Select an Option"
                size="large"
                value={setting.discountType}
                onChange={handleDocumentType}
                allowClear
              >
                <Option value="1">Amount</Option>
                <Option value="2">Percent</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Discount Rate" name="discountrate">
              <Input
                placeholder="Discount Rate"
                size="large"
                value={setting.discountRate}
                onChange={(e) =>
                  setSetting({ ...setting, discountRate: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item label="Service Charge" name="servicecharge">
              <Input
                placeholder="Service Charge"
                size="large"
                value={setting.serviceChange}
                onChange={(e) =>
                  setSetting({ ...setting, serviceChange: e.target.value })
                }
              />
            </Form.Item>
          </Col>

          <Col lg={11}>
            <Form.Item
              label="Select Service Charge Type"
              name="service_chargeType"
            >
              <Select
                placeholder="Select an Option"
                size="large"
                value={setting.selectServiceChargeType}
                onChange={handleSelectServiceCharge}
                allowClear
              >
                <Option value="amount">Amount</Option>
                <Option value="percent">Percent</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Vat Setting" name="vat">
              <Input
                placeholder="Vat Setting"
                size="large"
                value={setting.vatSetting}
                onChange={(e) =>
                  setSetting({ ...setting, vatSetting: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item label="Tin Number" name="vattinno">
              <Input
                placeholder="Tin Number"
                size="large"
                value={setting.tinOrVatNumber}
                onChange={(e) =>
                  setSetting({ ...setting, tinOrVatNumber: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item label="Currency" name="currency">
              <Select
                placeholder="Select Currency"
                size="large"
                value={setting.currency}
                onChange={handleCurrency}
                allowClear
              >
                <Option value="amount">Amount</Option>
                <Option value="percent">Percent</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Delivery Time" name="min_prepare_time">
              <Input
                placeholder="Delivery Time"
                size="large"
                value={setting.deliveryTime}
                onChange={(e) =>
                  setSetting({ ...setting, deliveryTime: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item label="Language" name="language">
              <Select
                placeholder="Select Language"
                size="large"
                value={setting.language}
                onChange={handleLanguageSet}
                // defaultValue={{ key: 'active' }}

                allowClear
              >
                <Option value="english">English</Option>
                <Option value="spanish">Spanish</Option>
                <Option value="turkish">Turkish</Option>
                <Option value="arabic">Arabic</Option>
              </Select>
            </Form.Item>

            <div className="d-flex">
              <Form.Item label="Date Format" name="dateformat">
                <Select
                  placeholder="Select Your "
                  size="large"
                  value={setting.dateFormate}
                  onChange={changeDateFormate}
                  // defaultValue={{ key: 'active' }}

                  allowClear
                >
                  <Option value="dd/mm/yyyy">dd/mm/yyyy</Option>
                  <Option value="yyyy/mm/dd">yyyy/mm/dd</Option>
                  <Option value="dd-mm-yyyy">dd-mm-yyyy</Option>
                  <Option value="yyyy-mm-dd">yyyy-mm-dd</Option>
                  <Option value="mm/dd/yyyy">mm/dd/yyyy</Option>
                  <Option value="dd M,yyyy">dd M,yyyy</Option>
                  <Option value="dd MM,yyyy">dd MM,yyyy</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Time Zone"
                name="timezone"
                style={{ marginLeft: 'auto' }}
              >
                <Select
                  placeholder="Select Your Time zone"
                  size="large"
                  value={setting.timezone}
                  onChange={changeTimeZone}
                  // defaultValue={{ key: 'active' }}

                  allowClear
                >
                  <Option value="asiaDhaka">Asia/Dhaka</Option>
                  <Option value="asiaThimbu">Asia/Thimbu</Option>
                  <Option value="asiaJakarta">Asia/Jakarta</Option>
                  <Option value="asiaOmsk">Asia/Omsk</Option>
                  <Option value="asiaHovd">Asia/Hovd</Option>
                </Select>
              </Form.Item>
            </div>

            <Form.Item label="Application Alignment" name="site_align">
              <Select
                placeholder="Select Application Alignment"
                size="large"
                value={setting.applicationAlignment}
                onChange={changeApplicationAlignment}
                // defaultValue={{ key: 'active' }}

                allowClear
              >
                <Option value="leftToRight">Left to Right</Option>
                <Option value="rightToLeft">Right to Left</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Copyright Information" name="powerbytxt">
              <Input.TextArea
                placeholder="Copyright Information"
                size="large"
                rows={2}
                value={setting.poweredByText}
                onChange={(e) =>
                  setSetting({ ...setting, poweredByText: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item label="Footer Text" name="footer_text">
              <Input.TextArea
                placeholder="Footer Text"
                size="large"
                rows={2}
                value={setting.footerText}
                onChange={(e) =>
                  setSetting({ ...setting, footerText: e.target.value })
                }
              />
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

export default ApplicationSetting;
