import { Button, Form, Input, Modal } from 'antd';
import { useContext } from 'react';
import { ContextData } from './../../contextApi';

const FoodNoteModal = ({
  foodNoteModal,
  setFoodNoteModal,
  addFoodNoteToItem,
}) => {
  const [form] = Form.useForm();
  const { cartItems, setCartItems } = useContext(ContextData);

  const handleFoodNote = (value) => {
    const index = cartItems.findIndex(
      (item) => item.id === addFoodNoteToItem.id
    );

    setCartItems([
      ...cartItems.slice(0, index),
      { ...addFoodNoteToItem, note: value.food_note },
      ...cartItems.slice(index + 1),
    ]);

    form.resetFields();
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
        onFinish={handleFoodNote}
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
