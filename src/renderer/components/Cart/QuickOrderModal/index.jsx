import { Button, Col, Modal, Row, Space, Typography } from 'antd';
import { useContext, useEffect, useState } from 'react';
import InVoiceGenerate from 'renderer/components/InVoiceGenerate';
import { ContextData } from 'renderer/contextApi';
import { CalculatePrice, getDataFromDatabase } from '../../../../helpers';
import './QuickOrderModal.style.scss';

const { Text, Title } = Typography;

const QuickOrderModal = ({
  openModal,
  setOpenModal,
  settings,
  foodItems,
  setReRender,
  ongoingOrders,
  setOngoingOrders,
}) => {
  window.get_all_order_info_ongoing.send('get_all_order_info_ongoing', {
    status: true,
  });
  const [foodData, setFoodData] = useState(null);

  const { cartItems, setCartItems } = useContext(ContextData);
  const [openInvoice, setOpenInvoice] = useState(false);
  const [printInvoiceData, setPrintInvoiceData] = useState(null);
  const [onGoingOrderData, setOnGoingOrderData] = useState(null);

  let calc = new CalculatePrice(settings, foodData);

  useEffect(() => {
    if (foodItems?.order_info) {
      setFoodData(JSON.parse(foodItems.order_info));
    } else {
      setFoodData(foodItems);
    }
  }, [foodItems]);

  const handlePayBtn = () => {
    // Received on going order data
    setOnGoingOrderData(foodData);
    console.log('foodData', foodData);

    getDataFromDatabase(
      'get_all_order_info_ongoing_response',
      window.get_all_order_info_ongoing
    ).then((data = []) => {
      console.log('ongoingOrders', ongoingOrders);
      console.log('foodItems', foodItems);
      setOpenModal(false);
      setOpenInvoice(true);

      window.update_order_info_ongoing.send(
        'update_order_info_ongoing',
        foodItems
      );

      // Set the item to remove it from the array
      const index = ongoingOrders.findIndex(
        (item) => item.order_id === foodItems.order_id
      );
      const updateOngoingOrders = ongoingOrders.splice(index, 1);
      console.log('ongoingOrders', ongoingOrders);
      console.log('index', index);
      setOngoingOrders(ongoingOrders);
      setReRender((prevState) => !prevState);

      // if (localStorage.getItem('order_id')) {
      //   setReRender((prevState) => !prevState);
      // }
    });

    // window.update_order_info_ongoing.once(
    //   'update_order_info_ongoing_response',
    //   (args) => {
    //     console.log('))))))))))))))))))))))))))))))))))))))', args);
    //   }
    // );
  };

  return (
    <>
      <Modal
        title="Select Your Payment Method"
        visible={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => {
          setOpenModal(false);
          setCartItems([]);
        }}
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
                  Your Cart: {Array.isArray(foodData) && foodData?.length}{' '}
                  item(s){' '}
                  <span style={{ float: 'right' }}>
                    {settings.currency}
                    {calc.getTotalPrice()}
                  </span>
                </Title>
              </div>

              <div style={{ height: '330px', overflowY: 'scroll' }}>
                {foodData?.length > 0 &&
                  foodData?.map((item, index) => (
                    <div
                      className="flex content_between order_item"
                      key={index}
                    >
                      <h3>
                        {item?.product_name}
                        <span
                          style={{
                            fontSize: 13,
                            marginLeft: '0.5rem',
                            fontWeight: 400,
                          }}
                        >
                          ({item.quantity} x {item?.price})
                        </span>
                      </h3>
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
                    {calc.getTotalPrice()}
                  </span>
                </Title>
                <Title level={4}>
                  Service Charge{' '}
                  <span style={{ float: 'right' }}>
                    {settings.currency}
                    {calc.getServiceCharge()}
                  </span>
                </Title>
                <Title level={4}>
                  GST @ {settings?.vat}%{' '}
                  <span style={{ float: 'right' }}>
                    {settings.currency}
                    {calc.getVat()}
                  </span>
                </Title>
              </div>

              <div className="total_order_discount">
                <Title level={4}>
                  Discount:
                  <span style={{ float: 'right' }}>
                    {settings.currency}
                    {calc.getDiscountAmount()
                      ? calc.getDiscountAmount()
                      : '0.00'}
                  </span>
                </Title>
              </div>

              <div className="total_grand_item">
                <Title level={4}>
                  Grand Total:
                  <span style={{ float: 'right' }}>{settings.currency} {calc.getGrandTotal()}
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
                <Title level={4}>Total Payable Amount</Title>
                <h3>
                  {settings.currency}
                  {calc.getGrandTotal()}
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
                        Pay Now &amp; Print Invoice
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
        foodData={foodItems}
      />
    </>
  );
};

export default QuickOrderModal;
