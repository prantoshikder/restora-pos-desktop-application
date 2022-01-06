import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Select,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import './ApplicationSetting.style.scss';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title } = Typography;

const ApplicationSetting = () => {
  const [form] = Form.useForm();

  const [setting, setSetting] = useState({
    applicationTitle: '',
    storeName: '',
    address: '',
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

  const handleSubmit = () => {
    console.log('setting', setting);

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
      <Title level={3}>Application Settings</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row>
          <Col lg={6}>
            <Form.Item label="Application Title" name="applicationTitle">
              <Input
                placeholder="Application Title"
                value={setting.applicationTitle}
                onChange={(e) =>
                  setSetting({ ...setting, applicationTitle: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item label="Store Name" name="storeName">
              <Input
                placeholder="Store Name"
                value={setting.storeName}
                onChange={(e) =>
                  setSetting({ ...setting, storeName: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item label="Address" name="address">
              <Input
                placeholder="Address"
                value={setting.address}
                onChange={(e) =>
                  setSetting({ ...setting, address: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item label="Email Address" name="emailAddress">
              <Input
                placeholder="Email Address"
                value={setting.emailAddress}
                onChange={(e) =>
                  setSetting({ ...setting, emailAddress: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item label="Phone" name="phone">
              <Input
                placeholder="Phone"
                value={setting.phone}
                onChange={(e) =>
                  setSetting({ ...setting, phone: e.target.value })
                }
              />
            </Form.Item>

            <div className="d-flex">
              <Form.Item label="Available On" name="availableOn">
                <Input
                  placeholder="Available On"
                  value={setting.availableOn}
                  onChange={(e) =>
                    setSetting({ ...setting, availableOn: e.target.value })
                  }
                />
              </Form.Item>

              <Form.Item
                label="Closing Time"
                name="closingTime"
                style={{ marginLeft: 'auto' }}
              >
                <Input
                  placeholder="Closing Time"
                  value={setting.closingTime}
                  onChange={(e) =>
                    setSetting({ ...setting, closingTime: e.target.value })
                  }
                />
              </Form.Item>
            </div>

            <Form.Item name="discountType" label="Discount Type">
              <Select
                placeholder="Select an Option"
                value={setting.discountType}
                onChange={handleDocumentType}
                // defaultValue={{ key: 'active' }}

                allowClear
              >
                <Option value="amount">Amount</Option>
                <Option value="percent">Percent</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Discount Rate" name="discountRate">
              <Input
                placeholder="Discount Rate"
                value={setting.discountRate}
                onChange={(e) =>
                  setSetting({ ...setting, discountRate: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item label="Service Change" name="serviceChange">
              <Input
                placeholder="Service Change"
                value={setting.serviceChange}
                onChange={(e) =>
                  setSetting({ ...setting, serviceChange: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item
              label="Select Service Charge Type"
              name="selectServiceChargeType"
            >
              <Select
                placeholder="Select an Option"
                value={setting.selectServiceChargeType}
                onChange={handleSelectServiceCharge}
                // defaultValue={{ key: 'active' }}

                allowClear
              >
                <Option value="amount">Amount</Option>
                <Option value="percent">Percent</Option>
              </Select>
            </Form.Item>

            <div className="d-flex">
              <Form.Item label="Vat Setting" name="vatSetting">
                <Input
                  placeholder="Vat Setting"
                  value={setting.vatSetting}
                  onChange={(e) =>
                    setSetting({ ...setting, vatSetting: e.target.value })
                  }
                />
              </Form.Item>

              <Form.Item
                label="tinOrVatNumber"
                name="tinOrVatNumber"
                style={{ marginLeft: 'auto' }}
              >
                <Input
                  placeholder="tinOrVatNumber"
                  value={setting.tinOrVatNumber}
                  onChange={(e) =>
                    setSetting({ ...setting, tinOrVatNumber: e.target.value })
                  }
                />
              </Form.Item>
            </div>
          </Col>

          <Col lg={6}>
            <Form.Item label="Currency" name="currency">
              <Select
                placeholder="Select an Option"
                value={setting.currency}
                onChange={handleCurrency}
                // defaultValue={{ key: 'active' }}

                allowClear
              >
                <Option value="amount">Amount</Option>
                <Option value="percent">Percent</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Delivery Time" name="deliveryTime">
              <Input
                placeholder="Delivery Time"
                value={setting.deliveryTime}
                onChange={(e) =>
                  setSetting({ ...setting, deliveryTime: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item label="Language" name="language">
              <Select
                placeholder="Select an Option"
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
              <Form.Item label="Date Formate" name="dateFormate">
                <Select
                  placeholder="Select an Option"
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
                name="timeZone"
                style={{ marginLeft: 'auto' }}
              >
                <Select
                  placeholder="Select an Option"
                  value={setting.timeZone}
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

            <Form.Item
              label="Application Alignment"
              name="applicationAlignment"
            >
              <Select
                placeholder="Select an Option"
                value={setting.applicationAlignment}
                onChange={changeApplicationAlignment}
                // defaultValue={{ key: 'active' }}

                allowClear
              >
                <Option value="leftToRight">Left to Right</Option>
                <Option value="rightToLeft">Right to Left</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Powered By Text">
              <Input.TextArea
                placeholder="Powered By Text"
                rows={9}
                value={setting.poweredByText}
                onChange={(e) =>
                  setSetting({ ...setting, poweredByText: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item label="Footer Text">
              <Input.TextArea
                placeholder="Footer Text"
                rows={9}
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
