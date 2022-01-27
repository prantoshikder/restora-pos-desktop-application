import { Button, Col, Modal, Row, Typography } from 'antd';
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

            <div className="total_order_amount">
              <Title level={4}>
                Your Cart: {cartItems?.length} items{' '}
                <span style={{ float: 'right' }}>
                  $
                  {cartItems.reduce(
                    (prevPrice, currentPrice) => prevPrice + currentPrice.price,
                    0
                  )}
                </span>
              </Title>
            </div>

            <div style={{ height: '330px', overflowY: 'scroll' }}>
              {cartItems?.map((item) => (
                <div className="flex content_between order_item" key={item?.id}>
                  <h3>{item?.name}</h3>
                  <h3>${item?.price}</h3>
                </div>
              ))}
            </div>

            <div className="total_order">
              <Title level={4}>
                Subtotal{' '}
                <span style={{ float: 'right' }}>
                  $
                  {cartItems.reduce(
                    (prevPrice, currentPrice) => prevPrice + currentPrice.price,
                    0
                  )}
                </span>
              </Title>
              <Title level={4}>
                Service Charge <span style={{ float: 'right' }}>$0.00</span>
              </Title>
              <Title level={4}>
                GST @ 2% <span style={{ float: 'right' }}>$0.00</span>
              </Title>
            </div>

            <div className="total_order_discount">
              <div>
                <Title level={4}>Discount:</Title>
              </div>
            </div>

            <div className="total_grand_item">
              <Title level={4}>
                Grand Total:
                <span style={{ float: 'right' }}>
                  $
                  {cartItems.reduce(
                    (prevPrice, currentPrice) => prevPrice + currentPrice.price,
                    0
                  )}
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

            <div>
              <Button>Cash Payment</Button>
              <Button>Card Payment</Button>
              <Button>Mobile Payment</Button>
              <Button>SSL Commerz</Button>
              <Button>Two Checkout</Button>
              <Button>Food Panda</Button>
            </div>

            <div style={{ minHeight: '300px' }}>
              <Text>Do you Want to Print Invoice???</Text>
            </div>

            <div style={{ background: '#ddd' }}>
              <Title level={2}>Order Payment Successfully</Title>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At,
                iusto dolorem fugit, eligendi veritatis, corporis inventore
                aspernatur perspiciatis ab facere consectetur aliquam
                exercitationem repudiandae aut magnam et cupiditate natus
                voluptates? Aut voluptates ad suscipit earum amet tenetur
                expedita quas in et eaque quo magni quae doloribus at non quod
                ipsum sed est veniam neque eligendi adipisci ducimus, corrupti
                ut. Dolor optio vel illo labore debitis, quibusdam saepe,
                architecto molestiae, deleniti unde quo eos? Incidunt
                praesentium excepturi aliquid quaerat enim consequuntur,
                accusamus id tempore quisquam fugiat quas sint nulla eius
                suscipit a veniam quis similique aut expedita beatae voluptas
                aperiam quam. Similique omnis error cupiditate, itaque a eveniet
                animi explicabo, maxime sit corporis vel non? Nesciunt, culpa
                inventore, adipisci libero ipsa saepe magnam provident
                voluptates unde sapiente odit facilis. Aspernatur ducimus minima
                provident aperiam commodi adipisci similique consectetur,
                molestiae, corrupti sapiente repellendus, quae mollitia ullam.
                Dolor, aliquid tempore! Recusandae, laborum consequuntur.
              </Text>
            </div>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default QuickOrderModal;
