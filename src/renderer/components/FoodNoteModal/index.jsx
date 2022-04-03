import { Button, Form, Input, Modal } from 'antd';
import { useState } from 'react';

const FoodNoteModal = ({ foodNoteModal, setFoodNoteModal }) => {
  const [form] = Form.useForm();
  const [foodNote, setFoodNote] = useState();

  const handleSubmit = (values) => {
    console.log('Success:', values);
    setFoodNoteModal(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      title="Food Note"
      visible={foodNoteModal}
      onOk={() => setFoodNoteModal(false)}
      onCancel={() => setFoodNoteModal(false)}
      footer={null}
      width={500}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        // fields={defaultData}
        // onFieldsChange={(_, allFields) => {
        //   setDefaultData(allFields);
        // }}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Food Note" name="food_note">
          <Input.TextArea size="large" rows={2} />
        </Form.Item>

        <div className="button_group">
          <Button type="primary" className="save_btn" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default FoodNoteModal;
