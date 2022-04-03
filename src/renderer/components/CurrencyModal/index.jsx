import { Button, Col, Form, Input, message, Modal, Row, Select } from 'antd';

const { Option } = Select;
const { confirm } = Modal;

const CurrencyModal = ({
  setReRender,
  setCurrencyModal,
  currencyModal,
  addCurrency,
  setAddCurrency,
  updateCurrency,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    const addNewCurrencyList = {};

    for (const data of addCurrency) {
      addNewCurrencyList[data.name[0]] =
        typeof data?.value === 'string' ? data?.value?.trim() : data?.value;
    }

    if (updateCurrency?.id) {
      addNewCurrencyList.id = updateCurrency.id;
    }

    // Insert or update Data
    window.insert_currency.send('insert_currency', addNewCurrencyList);

    setCurrencyModal(false);

    // Insert or update response
    window.insert_currency.once('insert_currency_response', ({ status }) => {
      if (status === 'updated') {
        setReRender((prevState) => !prevState);
        closeModal();

        message.success({
          content: 'Currency updated successfully',
          className: 'custom-class',
          duration: 1,
          style: {
            marginTop: '5vh',
            float: 'right',
          },
        });
      } else {
        setReRender((prevState) => !prevState);
        closeModal();

        message.success({
          content: 'Currency added successfully',
          className: 'custom-class',
          duration: 1,
          style: {
            marginTop: '5vh',
            float: 'right',
          },
        });
      }
    });
  };

  const handleReset = () => {
    form.resetFields();
  };

  function closeModal() {
    form.resetFields();
    setCurrencyModal(false);
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      title="Add Currency"
      visible={currencyModal}
      onOk={() => closeModal()}
      onCancel={() => closeModal()}
      footer={null}
      width={650}
    >
      <Row>
        <Col lg={24}>
          <Form
            form={form}
            fields={addCurrency}
            onFinish={handleSubmit}
            onFieldsChange={(_, allFields) => {
              setAddCurrency(allFields);
            }}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              name="currency_name"
              label="Currency Name"
              rules={[
                {
                  required: true,
                  message: 'Currency Name is required',
                },
              ]}
              required
            >
              <Input placeholder="Currency Name" size="large" />
            </Form.Item>

            <Form.Item
              name="currency_icon"
              label="Currency Icon"
              rules={[
                {
                  required: true,
                  message: 'Currency Icon is required',
                },
              ]}
              required
            >
              <Input placeholder="Currency Icon" size="large" />
            </Form.Item>

            <Form.Item
              name="currency_rate"
              label="Conversion Rate"
              rules={[
                {
                  required: true,
                  message: 'Conversion Rate is required',
                },
              ]}
              required
            >
              <Input placeholder="Conversion Rate" size="large" />
            </Form.Item>
            <Form.Item
              name="position"
              label="Position"
              rules={[
                { required: true, message: 'Please input your Position!' },
              ]}
            >
              <Select placeholder="Select Option" size="large" allowClear>
                <Option value="left">Left</Option>
                <Option value="right">Right</Option>
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
                Add
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default CurrencyModal;
