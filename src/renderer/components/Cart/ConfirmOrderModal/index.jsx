import { CheckCircleOutlined } from '@ant-design/icons';
import { Button, Col, Modal, Row, Typography } from 'antd';
import { useContext, useState } from 'react';
import { ContextData } from '../../../contextApi';
import '../cart.styles.scss';
import QuickOrderModal from '../QuickOrderModal';

// const { BrowserWindow } = require('electron').remote;

// const electron = require('electron');
// const BrowserWindow = electron.remote.BrowserWindow;

const { Text } = Typography;

const ConfirmOrderModal = (props) => {
  const { cartItems, setCartItems } = useContext(ContextData);

  const { confirmOrder, setConfirmOrder, confirmBtn, printId, settings } =
    props;
  const [openModal, setOpenModal] = useState(false);

  const quickOrderModal = () => {
    setCartItems([]);
    setConfirmOrder(false);
    setOpenModal(true);
  };

  const options = {
    silent: false,
    printBackground: true,
    color: false,
    margin: {
      marginType: 'printableArea',
    },
    landscape: false,
    pagesPerSheet: 1,
    collate: false,
    copies: 1,
    header: 'Header of the Page',
    footer: 'Footer of the Page',
  };

  const placeOrderModal = () => {
    // let win = BrowserWindow.getFocusedWindow();
    console.log('win', window.print());

    const printContents = document.getElementById(printId).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;

    // win.webContents.print(options, (success, failureReason) => {
    //   if (!success) console.log(failureReason);

    //   console.log('Print Initiated');
    // });

    // console.log('printContents', printContents);
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
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};

export default ConfirmOrderModal;
