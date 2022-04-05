import { Button, Form, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';

const FoodNoteModal = ({ foodNoteModal, setFoodNoteModal }) => {
  const [form] = Form.useForm();
  const [foodNote, setFoodNote] = useState([]);

  useEffect(() => {
    setFoodNote([
      {
        name: ['food_note'],
        // value: state?.category_name,
      },
    ]);
  }, []);

  const handleSubmit = () => {
    const itemFoodNote = {};

    for (const data of foodNote) {
      itemFoodNote[data.name[0]] =
        typeof data.value === 'string' ? data?.value?.trim() : data?.value;
    }

    console.log('itemFoodNote:', itemFoodNote);
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
        fields={foodNote}
        onFieldsChange={(_, allFields) => {
          setFoodNote(allFields);
        }}
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
