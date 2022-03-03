import { CheckCircleOutlined } from '@ant-design/icons';
import { Button, Col, Modal, Row, Typography } from 'antd';
import { useContext, useState } from 'react';
import '../cart.styles.scss';
import QuickOrderModal from '../QuickOrderModal';
import { ContextData } from './../../../contextApi';

const { Text } = Typography;

const ConfirmOrderModal = (props) => {
  const { cartItems, setCartItems } = useContext(ContextData);

  console.log('cartItems confirmasdfad', cartItems);

  const { confirmOrder, setConfirmOrder, confirmBtn, printId, settings } =
    props;
  const [quickOrder, setQuickOrder] = useState(false);

  const quickOrderModal = () => {
    setConfirmOrder(false);
    setQuickOrder(true);
  };

  const placeOrderModal = () => {
    const printContents = document.getElementById(printId).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    // window.print();
    document.body.innerHTML = originalContents;
  };

  return (
    <>
      <Modal
        visible={confirmOrder}
        onOk={() => setConfirmOrder(false)}
        onCancel={() => setConfirmOrder(false)}
        footer={null}
        width={400}
      >
        <Row>
          <Col lg={24}>
            <div className="text_center">
              <div className="success_icon">
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
                  onClick={() => setConfirmOrder(false)}
                >
                  No
                </Button>

                {confirmBtn === 'quickOrder' ? (
                  <Button type="primary" onClick={quickOrderModal}>
                    Yes
                  </Button>
                ) : (
                  <Button type="primary" onClick={placeOrderModal}>
                    Yes
                  </Button>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Modal>

      <QuickOrderModal
        settings={settings}
        quickOrder={quickOrder}
        setQuickOrder={setQuickOrder}
      />
    </>
  );
};

export default ConfirmOrderModal;
