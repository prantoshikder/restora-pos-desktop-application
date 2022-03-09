import {
  CheckCircleOutlined,
  DeleteOutlined,
  DeliveredProcedureOutlined,
  EditOutlined,
  SearchOutlined,
  ShrinkOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PremiumVersion from '../partials/PremiumVersion';
import { ContextData } from './../../contextApi/index';
import QuickOrderModal from './../Cart/QuickOrderModal/index';
import './OnGoingFooter.style.scss';

const OnGoingFooter = ({
  orderComplete,
  settings,
  openSearchInput,
  setOpenSearchInput,
  activeInactiveBtn,
  setReRender,
}) => {
  let redirect = useNavigate();
  const { cartItems, setCartItems } = useContext(ContextData);
  const [premiumVersion, setPremiumVersion] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [orderData, setOrderData] = useState();

  function orderCompleted(orderItem) {
    if (Object.keys(orderItem).length === 0) {
      return true;
    }

    setOpenModal(true);
    setOrderData(orderItem);
    // setReRender((prevState) => !prevState);
  }

  const editOnGoingOrder = (orderData) => {
    localStorage.setItem('order_id', orderData.order_id);
    const orderItems = JSON.parse(orderData.order_info);

    setCartItems(orderItems);
    redirect('/', { state: { ...orderData, order_info: orderItems } });
  };

  return (
    <>
      <div className="on_going_footer">
        <div className="on_going_footer_container">
          <Row>
            <Col lg={24}>
              <div className="on_going_btn_wrapper">
                <Button
                  type="primary"
                  className="on_going_btn search_btn"
                  onClick={() => setOpenSearchInput(!openSearchInput)}
                >
                  <SearchOutlined /> Search
                </Button>

                <Button
                  type="primary"
                  className="on_going_btn cancel_btn premium_btn"
                  onClick={() => setPremiumVersion(true)}
                >
                  <DeleteOutlined /> Cancel
                </Button>

                <Button
                  type="primary"
                  className="on_going_btn merge_order_btn premium_btn"
                  onClick={() => setPremiumVersion(true)}
                >
                  <ShrinkOutlined /> Merge Order
                </Button>

                <Button
                  type="primary"
                  className="on_going_btn split_btn premium_btn"
                  onClick={() => setPremiumVersion(true)}
                >
                  <SwapOutlined /> Split
                </Button>

                <Button
                  type="primary"
                  className="on_going_btn due_invoice_btn premium_btn"
                  onClick={() => setPremiumVersion(true)}
                >
                  <DeliveredProcedureOutlined /> Due Invoice
                </Button>

                <Button
                  type="primary"
                  className="on_going_btn kot_btn premium_btn"
                  onClick={() => setPremiumVersion(true)}
                >
                  <EditOutlined /> Kot
                </Button>

                <Button
                  type="primary"
                  className={
                    activeInactiveBtn?.is_active === 1
                      ? 'on_going_btn edit_btn '
                      : 'on_going_btn edit_btn premium_btn'
                  }
                  onClick={() => editOnGoingOrder(orderComplete)}
                >
                  <EditOutlined /> Edit
                </Button>

                <Button
                  type="primary"
                  className={
                    activeInactiveBtn?.is_active === 1
                      ? 'on_going_btn complete_btn '
                      : 'on_going_btn complete_btn premium_btn'
                  }
                  onClick={() => orderCompleted(orderComplete)}
                >
                  <CheckCircleOutlined /> Complete
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <PremiumVersion
        premiumVersion={premiumVersion}
        setPremiumVersion={setPremiumVersion}
      />

      <QuickOrderModal
        settings={settings}
        openModal={openModal}
        setOpenModal={setOpenModal}
        foodItems={orderData}
        setReRender={setReRender}
      />
    </>
  );
};

export default OnGoingFooter;
