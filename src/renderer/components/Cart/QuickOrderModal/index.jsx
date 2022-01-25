import { CheckCircleOutlined } from '@ant-design/icons';
import { Button, Col, Modal, Row, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

const QuickOrderModal = ({ quickOrderModal, setQuickOrderModal }) => {
  return (
    <Modal
      visible={quickOrderModal}
      onOk={() => setQuickOrderModal(false)}
      onCancel={() => setQuickOrderModal(false)}
      footer={null}
      width={400}
    >
      <Row>
        <Col lg={24}>
          <div className="text_center">
            <div className="warning_icon">
              <CheckCircleOutlined />
            </div>
            <h1>Order Placed Successfully</h1>
            <Text>Do you Want to Print Invoice???</Text>
            <div className="flex content_center group_button">
              <Button
                type="danger"
                style={{
                  marginRight: '1rem',
                }}
                onClick={() => setQuickOrderModal(false)}
              >
                No
              </Button>

              <Button
                type="primary"
                htmlType="submit"
                // onClick={() => setWarmingModal(false)}
              >
                Yes
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default QuickOrderModal;
