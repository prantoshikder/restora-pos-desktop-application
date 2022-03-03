import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Col, Modal, Row, Typography } from 'antd';

const { Text, Title } = Typography;

const PremiumVersion = ({ premiumVersion, setPremiumVersion }) => {
  return (
    <Modal
      visible={premiumVersion}
      onOk={() => setPremiumVersion(false)}
      onCancel={() => setPremiumVersion(false)}
      footer={null}
      width={400}
    >
      <Row>
        <Col lg={24}>
          <div className="text_center">
            <div className="warning_icon">
              <ExclamationCircleOutlined />
            </div>

            <Title level={2}>Premium Version</Title>

            {/* <Text>
              Order not placed due to some reason. Please Try Again!!!. Thank
              You !!!
            </Text> */}

            <div className="flex content_center group_button">
              <Button
                type="danger"
                style={{
                  marginRight: '1rem',
                }}
                onClick={() => setPremiumVersion(false)}
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

export default PremiumVersion;
