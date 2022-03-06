import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Col, Modal, Row, Typography } from 'antd';
import './WarmingModal.styles.scss';

const { Text, Title } = Typography;

const WarmingModal = ({ warmingModal, setWarmingModal }) => {
  return (
    <Modal
      visible={warmingModal}
      onOk={() => setWarmingModal(false)}
      onCancel={() => setWarmingModal(false)}
      footer={null}
      width={400}
    >
      <Row>
        <Col lg={24}>
          <div className="text_center">
            <div className="warning_icon">
              <ExclamationCircleOutlined />
            </div>

            <Title level={2}>Sorry, empty cart!</Title>

            <Text>No food items in the cart.</Text>

            <div className="flex content_center group_button">
              <Button
                type="danger"
                style={{
                  marginRight: '1rem',
                }}
                onClick={() => setWarmingModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default WarmingModal;
