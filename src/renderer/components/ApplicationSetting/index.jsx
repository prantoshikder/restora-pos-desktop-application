import { PictureOutlined } from '@ant-design/icons';
import { faDollarSign, faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import { getDataFromDatabase } from 'helpers';
import { useEffect, useState } from 'react';
import './ApplicationSetting.style.scss';

const { RangePicker } = DatePicker;
const { Option } = Select;

const ApplicationSetting = ({ setReRenderOnSettings }) => {
  window.get_app_settings.send('get_app_settings', { status: true });

  const [form] = Form.useForm();
  const [appSettingsData, setAppSettingsData] = useState(null);
  const [defaultData, setDefaultData] = useState([]);
  const [favIcon, setFavIcon] = useState(null);
  const [appLogo, setAppLogo] = useState(null);

  useEffect(() => {
    getDataFromDatabase(
      'get_app_settings_response',
      window.get_app_settings
    ).then((data) => {
      const response = data[0];
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
          name: ['favicon'],
          // value: response?.favicon,
        },
        {
          name: ['opentime'],
          value: response?.opentime,
        },
        {
          name: ['closetime'],
          value: response?.closetime,
        },
        {
          name: ['discount_type'],
          value: response?.discount_type,
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
          value: response?.powerbytxt,
        },
      ]);
    });
  }, []);

  const handleFavicon = (e) => {
    console.log('hanlde file', e);
    // if (Array.isArray(e)) {
    //   return e;
    // }
    // return e && e.fileList;
  };
  const normFile = (e) => {
    console.log('hanlde file norm', e);
    // if (Array.isArray(e)) {
    //   return e;
    // }
    // return e && e.fileList;
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleSubmit = (e) => {
    // e.preventDefault();

    const settingsValue = {};

    for (const data of defaultData) {
      settingsValue[data.name[0]] = data.value;
    }

    if (favIcon) {
      settingsValue.favicon = JSON.stringify({
        name: favIcon.name,
        path: favIcon.path,
      });
    }

    if (appLogo) {
      settingsValue.logo = JSON.stringify({
        name: appLogo.name,
        path: appLogo.path,
      });
    }

    console.log('settingsValue', settingsValue);

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
            <Form.Item
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
                    // getValueFromEvent={handleFavicon}
                    noStyle
                  >
                    <Upload.Dragger
                      name="files"
                      // customRequest={(imageObj) => {
                      //   setFavIcon(imageObj.file);
                      // }}
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
                <Col lg={8}>
                  <h4>Preview</h4>
                  {/* {appSettingsData?.favicon && (
                    <Image width={125} src={appSettingsData?.favicon} />
                  )}
                  {favIcon && (
                    <Image width={125} src={URL.createObjectURL(favIcon)} />
                  )} */}
                </Col>
              </Row>
            </Form.Item>

            <Form.Item label="Logo">
              <Row gutter={20}>
                <Col lg={16}>
                  {/* <Form.Item
                    name="logo"
                    valuePropName="fileList"
                    // getValueFromEvent={normFile}
                    noStyle
                  >
                    <Upload.Dragger
                      name="files"
                      customRequest={(imageObj) => {
                        setAppLogo(imageObj.file);
                      }}
                    >
                      <p className="ant-upload-drag-icon">
                        <PictureOutlined />
                      </p>
                      <p className="ant-upload-hint">
                        Click or drag & drop a logo here to upload
                      </p>
                    </Upload.Dragger>
                  </Form.Item> */}
                </Col>
                <Col lg={8}>
                  <h4>Preview</h4>
                  {/* {appSettingsData?.logo && (
                    <img src={appSettingsData?.logo} alt="Logo" />
                  )}
                  {appLogo && (
                    <img src={URL.createObjectURL(appLogo)} alt="Logo" />
                  )} */}

                  <img
                    src="file:///C:/Users/Munir/AppData/Roaming/Electron/assets/settings_favicon/Big_and_small_329.jpg"
                    alt=""
                  />
                </Col>
              </Row>
            </Form.Item>

            <Row gutter={20}>
              <Col lg={12}>
                <Form.Item label="Available On" name="opentime">
                  <Input placeholder="Available On" size="large" />
                </Form.Item>
              </Col>

              <Col lg={12}>
                <Form.Item label="Closing Time" name="closetime">
                  <Input placeholder="Closing Time" size="large" />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col lg={11}>
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
                <Form.Item label="Currency" name="currency">
                  <Select placeholder="Select Currency" size="large" allowClear>
                    <Option value="bdt">
                      BDT{' '}
                      <span style={{ float: 'right' }}>
                        <FontAwesomeIcon icon={faDollarSign} />
                      </span>
                    </Option>
                    <Option value="usd">
                      USD{' '}
                      <span style={{ float: 'right' }}>
                        <FontAwesomeIcon icon={faDollarSign} />
                      </span>
                    </Option>
                    <Option value="inr">
                      INR{' '}
                      <span style={{ float: 'right' }}>
                        <FontAwesomeIcon icon={faRupeeSign} />
                      </span>
                    </Option>
                  </Select>
                </Form.Item>
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
              <Input.TextArea
                placeholder="Copyright Information"
                size="large"
                rows={2}
              />
            </Form.Item>

            <Form.Item label="Footer Text" name="footer_text">
              <Input.TextArea placeholder="Footer Text" size="large" rows={2} />
            </Form.Item>

            <div className="button_group">
              <Button
                type="danger"
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
