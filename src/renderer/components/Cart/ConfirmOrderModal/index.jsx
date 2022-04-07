import { CheckCircleOutlined } from '@ant-design/icons';
import { Button, Col, Modal, Row, Typography } from 'antd';
import { getDataFromDatabase } from 'helpers';
import { useContext, useState } from 'react';
import { ContextData } from '../../../contextApi';
import '../cart.styles.scss';
import QuickOrderModal from '../QuickOrderModal';
import TokenModal from './../../TokenModal/index';

const { Text } = Typography;

const ConfirmOrderModal = (props) => {
  window.get_data_to_create_token.send('get_data_to_create_token', {
    status: true,
  });

  const { cartItems, setCartItems } = useContext(ContextData);
  const [openModal, setOpenModal] = useState(false);
  const [tokenPrint, setTokenPrint] = useState('printToken');
  const [orderData, setOrderData] = useState({});

  const {
    confirmOrder,
    setConfirmOrder,
    confirmBtn,
    printId,
    settings,
    quickOrderAdditionalData,
    state,
  } = props;

  const [foodItems, setFoodItems] = useState({});

  const insertOrderInfo = {
    cartItems,
    customer_id: quickOrderAdditionalData?.customerId,
    grandTotal: quickOrderAdditionalData?.grandTotal,
    discount: quickOrderAdditionalData?.discount,
    serviceCharge: quickOrderAdditionalData?.serviceCharge,
    vat: quickOrderAdditionalData?.vat,
  };

  const quickOrderModal = () => {
    setConfirmOrder(false);
    setOpenModal(true);
    const invoiceData = {
      ...insertOrderInfo,
      order_info: cartItems,
    };

    window.insert_order_info.send('insert_order_info', insertOrderInfo);

    setFoodItems(invoiceData);
  };

  const updateOrderModal = () => {
    console.log('state confirm', state);
    setConfirmOrder(false);
    if (cartItems.length > 0) {
      getDataFromDatabase(
        'get_data_to_create_token_response',
        window.get_data_to_create_token
      ).then((args) => {
        console.log('args', args);
        const cartData = JSON.parse(args.order_info);
        setOrderData({ ...args, order_info: cartData });
        return;
        printToken();
      });
    }

    setCartItems([]);
  };

  const handleSubmitOrder = (eventName) => {
    if (confirmBtn === eventName) {
      window.insert_order_info.send('insert_order_info', insertOrderInfo);
    }
  };

  const placeOrderModal = () => {
    setConfirmOrder(false);
    if (cartItems.length > 0) {
      getDataFromDatabase(
        'get_data_to_create_token_response',
        window.get_data_to_create_token
      ).then((args) => {
        const cartData = JSON.parse(args.order_info);
        setOrderData({ ...args, order_info: cartData });
        printToken();
      });
    }

    setCartItems([]);
  };

  const printToken = () => {
    var printContents = document.getElementById(tokenPrint).innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    window.location.reload();
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
              <Text>
                Do you want to print{' '}
                {confirmBtn === 'quickOrder' ? 'invoice' : 'token'} ?
              </Text>

              <div className="flex content_center group_button">
                <Button
                  type="danger"
                  style={{
                    marginRight: '1rem',
                  }}
                  onClick={() => {
                    setCartItems([]);
                    setConfirmOrder(false);
                    handleSubmitOrder('quickOrder');
                  }}
                >
                  No
                </Button>

                {confirmBtn === 'quickOrder' ? (
                  <Button type="primary" onClick={quickOrderModal}>
                    Yes
                  </Button>
                ) : (
                  <>
                    {confirmBtn === 'updateOrder' ? (
                      <Button type="primary" onClick={updateOrderModal}>
                        Yes
                      </Button>
                    ) : (
                      <Button type="primary" onClick={placeOrderModal}>
                        Yes
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Modal>

      <QuickOrderModal
        settings={settings}
        openModal={openModal}
        setOpenModal={setOpenModal}
        foodItems={foodItems}
      />

      <TokenModal
        cartItems={cartItems}
        orderData={orderData}
        tokenPrint={tokenPrint}
      />
    </>
  );
};

export default ConfirmOrderModal;
