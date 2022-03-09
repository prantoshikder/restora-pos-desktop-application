import { Button, Col, Modal, Row, Space, Typography } from 'antd';
import { useContext, useState } from 'react';
import InVoiceGenerate from 'renderer/components/InVoiceGenerate';
import { ContextData } from './../../../contextApi';
import './QuickOrderModal.style.scss';

const { Text, Title } = Typography;

const QuickOrderModal = ({ openModal, setOpenModal, settings, orderData }) => {
  const { cartItems, setCartItems } = useContext(ContextData);
  const [openInvoice, setOpenInvoice] = useState(false);
  const [printInvoiceData, setPrintInvoiceData] = useState(null);
  const [onGoingOrderData, setOnGoingOrderData] = useState(null);

  const handlePayBtn = () => {
    // Received on going order data
    console.log('handlePayBtn orderData', JSON.parse(orderData.order_info));
    setOnGoingOrderData(JSON.parse(orderData.order_info));

    setOpenModal(false);
    setOpenInvoice(true);
    // TODO: Status process
    window.update_order_info_ongoing.send(
      'update_order_info_ongoing',
      orderData
    );

    window.update_order_info_ongoing.once(
      'update_order_info_ongoing_response',
      (args) => {
        console.log('))))))))))))))))))))))))))))))))))))))', args);
      }
    );
  };

  const handleCalculatePrice = () => {
    if (orderData?.order_info === undefined) return;

    const orderArray =
      orderData?.order_info && JSON.parse(orderData?.order_info);

    let totalPrice = orderArray?.reduce(
      (prevPrice, currentPrice) => prevPrice + currentPrice.total_price,
      0
    );

    let discount = 0,
      totalVatBasedOnPrice = 0,
      serviceCharge = 0;

    // calculate if it has discount type & amount
    if (settings.discount_type === 1) {
      discount = parseFloat(settings?.discountrate?.toFixed(2));
    } else if (settings.discount_type === 2) {
      discount = parseFloat(
        (totalPrice * settings?.discountrate?.toFixed(2)) / 100
      );
    }

    // calculate if it has vat amount in percentage
    if (settings?.vat) {
      totalVatBasedOnPrice = parseFloat(
        ((totalPrice * settings?.vat) / 100).toFixed(2)
      );
    }

    // calculate if service_chargeType and service charge is available
    if (settings?.service_chargeType === 'amount' && settings.servicecharge) {
      // Fixed amount
      serviceCharge = parseFloat(settings?.servicecharge?.toFixed(2));
    } else {
      serviceCharge = parseFloat(
        ((totalPrice * settings?.servicecharge) / 100).toFixed(2)
      );
    }

    const grandTotal = parseFloat(
      (totalPrice + totalVatBasedOnPrice + serviceCharge - discount).toFixed(2)
    );

    return {
      totalPrice,
      serviceCharge,
      totalVatBasedOnPrice,
      discount,
      grandTotal,
    };
  };

  return (
    <>
      <Modal
        title="Select Your Payment Method"
        visible={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        footer={null}
        width={1200}
      >
        <Row className="order_wrapper">
          <Col lg={8}>
            <div className="order_summary">
              <div className="order_summary_heading">
                <Title level={5}>Order Summary</Title>
              </div>

              <div className="total_order_amount">
                <Title level={4}>
                  Your Cart:{' '}
                  {orderData?.order_info &&
                    JSON.parse(orderData?.order_info)?.length}{' '}
                  items{' '}
                  <span style={{ float: 'right' }}>
                    {settings.currency}
                    {handleCalculatePrice()?.totalPrice}
                  </span>
                </Title>
              </div>

              <div style={{ height: '330px', overflowY: 'scroll' }}>
                {cartItems.length > 0 &&
                  cartItems?.map((item, index) => (
                    <div
                      className="flex content_between order_item"
                      key={index}
                    >
                      <h3>{item?.name}</h3>
                      <h3>
                        {settings.currency}
                        {item?.price}
                      </h3>
                    </div>
                  ))}

                {orderData !== undefined &&
                  Object.keys(orderData).length > 0 &&
                  JSON.parse(orderData.order_info)?.length > 0 &&
                  JSON.parse(orderData.order_info)?.map((item, index) => (
                    <div
                      className="flex content_between order_item"
                      key={index}
                    >
                      <h3>{item?.product_name}</h3>
                      <h3>
                        {settings.currency}
                        {item?.price}
                      </h3>
                    </div>
                  ))}
              </div>

              <div className="total_order">
                <Title level={4}>
                  Subtotal{' '}
                  <span style={{ float: 'right' }}>
                    {settings.currency}
                    {handleCalculatePrice()?.totalPrice}
                  </span>
                </Title>
                <Title level={4}>
                  Service Charge{' '}
                  <span style={{ float: 'right' }}>
                    {settings.currency}
                    {handleCalculatePrice()?.serviceCharge
                      ? handleCalculatePrice()?.serviceCharge
                      : '0.00'}
                  </span>
                </Title>
                <Title level={4}>
                  GST @ {settings?.vat}%{' '}
                  <span style={{ float: 'right' }}>
                    {settings.currency}
                    {handleCalculatePrice()?.totalVatBasedOnPrice
                      ? handleCalculatePrice()?.totalVatBasedOnPrice
                      : '0.00'}
                  </span>
                </Title>
              </div>

              <div className="total_order_discount">
                <div>
                  <Title level={4}>
                    Discount: {settings.currency}
                    {handleCalculatePrice()?.discount
                      ? handleCalculatePrice()?.discount
                      : '0.00'}
                  </Title>
                </div>
              </div>

              <div className="total_grand_item">
                <Title level={4}>
                  Grand Total:
                  <span style={{ float: 'right' }}>
                    {settings.currency}
                    {handleCalculatePrice()?.grandTotal
                      ? handleCalculatePrice()?.grandTotal
                      : '0.00'}
                  </span>
                </Title>
              </div>
            </div>
          </Col>

          <Col lg={16}>
            <div className="order_calculation">
              <div className="order_calculation_heading">
                <Title level={5}>Select Payment Type</Title>
              </div>

              <Space>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: '#1aa25a',
                    borderColor: '#1aa25a',
                    marginLeft: 10,
                  }}
                >
                  Cash Payment
                </Button>
                <Button disabled>Card Payment</Button>
                <Button disabled>Mobile Payment</Button>
                <Button disabled>SSL Commerz</Button>
                <Button disabled>Two Checkout</Button>
                <Button disabled>Food Panda</Button>
              </Space>

              <div
                style={{
                  minHeight: '265px',
                  marginTop: '2.2rem',
                  marginLeft: '1.5rem',
                }}
              >
                <Text>Total Payment</Text>
                <h3>
                  {settings.currency}
                  {handleCalculatePrice()?.grandTotal}
                </h3>
              </div>

              <div
                style={{
                  background: '#ddd',
                  minHeight: '280px',
                  padding: '1.5rem',
                }}
              >
                <Row gutter={20}>
                  <Col lg={15}>
                    {/* <Text>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. At,
                      iusto dolorem fugit, eligendi veritatis, corporis inventore
                      aspernatur perspiciatis ab facere consectetur aliquam
                      exercitationem repudiandae aut magnam et cupiditate natus
                      voluptates? Aut voluptates ad suscipit earum amet tenetur
                      expedita quas in et eaque quo magni quae doloribus at non
                      quod
                    </Text> */}
                  </Col>
                  <Col lg={9}>
                    <Space className="flex" style={{ flexDirection: 'column' }}>
                      <Button
                        className="premium_btn"
                        style={{ padding: '0 3.4rem' }}
                        type="primary"
                      >
                        Due Invoice
                      </Button>
                      <Button
                        className="premium_btn"
                        style={{ padding: '0 3.2rem' }}
                        type="primary"
                      >
                        Change Due:
                      </Button>
                      <Button
                        className="premium_btn"
                        style={{ padding: '0 2.4rem' }}
                        type="primary"
                      >
                        Payable Amount:
                      </Button>
                      <Button type="primary" onClick={handlePayBtn}>
                        Pay Now & Print Invoice
                      </Button>
                    </Space>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Modal>

      <InVoiceGenerate
        settings={settings}
        openModal={openModal}
        setOpenModal={setOpenModal}
        openInvoice={openInvoice}
        setOpenInvoice={setOpenInvoice}
        setPrintInvoiceData={setPrintInvoiceData}
        foodItems={onGoingOrderData}
      />
    </>
  );
};

export default QuickOrderModal;
