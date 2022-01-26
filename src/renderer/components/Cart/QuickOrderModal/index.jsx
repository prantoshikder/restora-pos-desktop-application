import { Col, Modal, Row, Typography } from 'antd';
import React, { useContext } from 'react';
import { ContextData } from './../../../contextApi';
import './QuickOrderModal.style.scss';

const { Text, Title } = Typography;

const QuickOrderModal = ({ quickOrder, setQuickOrder }) => {
  const { cartItems, setCartItems } = useContext(ContextData);

  return (
    <Modal
      title="Select Your Payment Method"
      visible={quickOrder}
      onOk={() => setQuickOrder(false)}
      onCancel={() => setQuickOrder(false)}
      footer={null}
      width={1200}
    >
      <Row className="order_wrapper">
        <Col lg={8}>
          <div className="order_summary">
            <div className="order_summary_heading">
              <Title level={5}>Order Summary</Title>
            </div>

            <Title level={2}>Order Placed Successfully</Title>

            {cartItems?.map((item) => (
              <div className="flex content_between order_item" key={item?.id}>
                <h3>{item?.name}</h3>
                <h3>{item?.price}</h3>
              </div>
            ))}
          </div>
        </Col>

        <Col lg={16}>
          <div className="order_calculation">
            <div className="order_calculation_heading">
              <Title level={5}>Select Payment Type</Title>
            </div>
            <Title level={2}>Order Payment Method Successfully</Title>
            <Text>Do you Want to Print Invoice???</Text>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default QuickOrderModal;
