// import InVoiceLogo from '../../../../assets/retora_pos.png';
import { Modal } from 'antd';
import moment from 'moment';
import { useContext, useRef } from 'react';
import { ContextData } from './../../contextApi/index';
import './InVoiceGenerate.style.scss';

const InVoiceGenerate = ({
  settings,
  openModal,
  setOpenModal,
  openInvoice,
  setOpenInvoice,
  orderData,
  // setPrintInvoiceData,
}) => {
  const { cartItems, setCartItems } = useContext(ContextData);
  const invoiceWrapperRef = useRef(null);

  // const handleCalculatePrice = () => {
  //   let totalPrice = cartItems?.reduce(
  //     (prevPrice, currentPrice) => prevPrice + currentPrice.total_price,
  //     0
  //   );

  //   let discount = 0,
  //     totalVatBasedOnPrice = 0,
  //     serviceCharge = 0,

  //   // calculate if it has discount type & amount
  //   if (settings.discount_type === 'Amount') {
  //     discount = parseFloat(settings?.discountrate?.toFixed(2));
  //   } else {
  //     discount = parseFloat(
  //       (totalPrice * settings?.discountrate?.toFixed(2)) / 100
  //     );
  //   }

  //   // calculate if it has vat amount in percentage
  //   if (settings?.vat) {
  //     totalVatBasedOnPrice = parseFloat(
  //       ((totalPrice * settings?.vat) / 100).toFixed(2)
  //     );
  //   }

  //   // calculate if service_chargeType and service charge is available
  //   if (settings?.service_chargeType === 'amount' && settings.servicecharge) {
  //     // Fixed amount
  //     serviceCharge = parseFloat(
  //       settings?.servicecharge?.toFixed(2)
  //     );
  //   } else {
  //     serviceCharge = parseFloat(((totalPrice * settings?.servicecharge) / 100).toFixed(2));
  //   }

  //   return parseFloat((totalPrice + discount + totalVatBasedOnPrice + serviceCharge).toFixed(2));
  // };

  const date = new Date();
  // setPrintInvoiceData(invoiceWrapperRef.current);

  return (
    <Modal
      // title="Select Your Payment Method"
      visible={openInvoice}
      // onOk={() => setOpenInvoice(false)}
      onCancel={() => setOpenInvoice(false)}
      // footer={null}
      width={600}
      okText="Print"
      onOk={() => {
        window.print();
      }}
    >
      <div ref={invoiceWrapperRef} className="inVoice_wrapper">
        <div className="inVoice_print_area">
          <div className="in_voice_logo">
            {/* <img src={InVoiceLogo} alt="" /> */}
          </div>

          <h1
            style={{ textAlign: 'center', fontWeight: '700', marginBottom: 0 }}
          >
            {settings.storename}
          </h1>
          <p style={{ textAlign: 'center' }}>{settings?.address}</p>

          <div
            className="in_voice_info flex content_between"
            style={{ marginTop: '0.8rem' }}
          >
            <p style={{ fontWeight: '700' }}>
              Date: {`${moment(date).format('LL')}`}
            </p>
            {settings?.vattinno && <p>TIN OR VAT NUM.: {settings?.vattinno}</p>}
          </div>

          {/* <h1 style={{ textAlign: 'center', fontWeight: '700' }}>
            Dhaka Restaurant
          </h1> */}

          {/* <div className="in_voice_info flex content_between">
            <p style={{ fontWeight: '700' }}>
              Date: {`${moment(date).format('LL')}`}
            </p>
            <p>TIN OR VAT NUM.: {settings?.vattinno}</p>
          </div> */}

          <div style={{ border: '1px dashed #918c8c' }}></div>

          <div>
            <div className="in_voice_info flex content_between">
              <h4 style={{ fontWeight: '700' }}>Item</h4>
              <h4 style={{ fontWeight: '700' }}>Total</h4>
            </div>

            {console.log('orderData', orderData)}

            {cartItems.length > 0 &&
              cartItems?.map((item, index) => (
                <div key={index} className="in_voice_info flex content_between">
                  <p>{item.product_name}</p>
                  <p style={{ fontWeight: '700' }}>{item.total_price}</p>
                </div>
              ))}

            {cartItems.length > 0 &&
              cartItems?.map((item, index) => (
                <div key={index} className="in_voice_info flex content_between">
                  <p>{item.product_name}</p>
                  <p style={{ fontWeight: '700' }}>{item.total_price}</p>
                </div>
              ))}

            {/* <div className="in_voice_info flex content_between">
            <p>content</p>
            <p>25$</p>
            </div>

            <div className="in_voice_info flex content_between">
            <p>content</p>
            <p>25$</p>
          </div> */}
          </div>

          <div style={{ border: '1px dashed #918c8c' }}></div>

          <div>
            <div className="in_voice_info flex content_between">
              <h4 style={{ fontWeight: '700' }}>Subtotal</h4>
              {/* {cartItems?.length !== 0 ? (
            <span>${handleCalculatePrice()}</span>
            ) : (
              <span>$0.00</span>
            )} */}
              <h4 style={{ fontWeight: '700' }}>100$</h4>
            </div>

            <div className="in_voice_info flex content_between">
              <p>Vat(10%)</p>
              <p style={{ fontWeight: '700' }}>20$</p>
            </div>

            <div className="in_voice_info flex content_between">
              <p>Service Charge</p>
              <p style={{ fontWeight: '700' }}>20$</p>
            </div>

            <div className="in_voice_info flex content_between">
              <p>Discount</p>
              <p style={{ fontWeight: '700' }}>0$</p>
            </div>
          </div>

          <div style={{ border: '1px dashed #918c8c' }}></div>

          <div>
            <div className="in_voice_info flex content_between">
              <h4 style={{ fontWeight: '700' }}>Grand Total</h4>
              <h4 style={{ fontWeight: '700' }}>200$</h4>
            </div>

            <div className="in_voice_info flex content_between">
              <p>Total Payment</p>
              <p style={{ fontWeight: '700' }}>200$</p>
            </div>
          </div>

          <br />

          {/* <div className="in_voice_info flex content_between">
          <p>Billing To: Walkin</p>
          <p>Bill By: Jone Doe</p>
        </div> */}

          <h2 style={{ textAlign: 'center', fontWeight: '700' }}>
            Thank you very mush
          </h2>
          <div style={{ border: '1px solid #dbd4d4' }}></div>
          <p style={{ textAlign: 'center' }}>Powered By: RESTORAPOS,</p>
          <p style={{ textAlign: 'center' }}>https://restorapos.com/</p>
        </div>
      </div>
    </Modal>
  );
};

export default InVoiceGenerate;
