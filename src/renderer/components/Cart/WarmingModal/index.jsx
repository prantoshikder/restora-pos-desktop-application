import { Button, Col, Modal, Row } from 'antd';
import React from 'react';

const WarmingModal = ({ warmingModal, setWarmingModal }) => {
  return (
    <Modal
      title="Add Variant"
      visible={warmingModal}
      onOk={() => setWarmingModal(false)}
      onCancel={() => setWarmingModal(false)}
      footer={null}
      width={650}
    >
      <Row>
        <Col lg={24}>
          <div>
            <h1>Order Failed!!!</h1>
            <Button
              type="danger"
              style={{
                marginRight: '1rem',
              }}
              onCancel={() => setWarmingModal(false)}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              onCancel={() => setWarmingModal(false)}
            >
              Yes, Cancel
            </Button>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default WarmingModal;
