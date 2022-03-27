// import InVoiceLogo from '../../../../assets/retora_pos.png';
import { Modal } from 'antd';
import { CalculatePrice } from 'helpers';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import restoraPosLogo from '../../../../assets/retora_pos.png';
import { getDataFromDatabase } from './../../../helpers';
import './InVoiceGenerate.style.scss';

const InVoiceGenerate = ({
  settings,
  openModal,
  setOpenModal,
  openInvoice,
  setOpenInvoice,
  foodItems,
}) => {
  const invoiceWrapperRef = useRef(null);
  const calc = new CalculatePrice(settings, foodItems);
  const [customerList, setCustomerList] = useState('');

  window.print_invoice.send('print_invoice', { status: true });

  window.get_customer_names.send('get_customer_names', { status: true });

  useEffect(() => {
    getDataFromDatabase(
      'get_customer_names_response',
      window.get_customer_names
    ).then((data = []) => {
      const filterCustomerId = data.find(
        (customersId) => customersId?.id === foodItems?.customerId
      );

      if (filterCustomerId) {
        setCustomerList(filterCustomerId.customer_name);
      } else {
        setCustomerList('Walk In');
      }
    });
  }, [foodItems]);

  const handleCalculatePrice = () => {
    // if no property exist in the settings, initialize them
    if (!settings.servicecharge) {
      settings.servicecharge = 0;
    }

    if (!settings.vat) {
      settings.vat = 0;
    }

    if (!settings.discountrate) {
      settings.discountrate = 0;
    }

    let totalPrice = foodItems?.reduce(
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

    return parseFloat(
      (totalPrice + totalVatBasedOnPrice + serviceCharge - discount).toFixed(2)
    );
  };

  const date = new Date();

  const printInvoice = (printableArea) => {
    var printContents = document.getElementById(printableArea).innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    window.location.reload();
  };

  return (
    <Modal
      visible={openInvoice}
      onCancel={() => setOpenInvoice(false)}
      width={600}
      okText="Print"
      onOk={() => printInvoice('printableArea')}
    >
      <div
        // ref={invoiceWrapperRef}
        className="inVoice_wrapper"
        id="printableArea"
        style={{
          padding: '0px 20px',
          // width: '500px',
          //   background: '#f1f1f1',
          //   margin: '15px auto',
          margin: 0,
          // marginTop: '-50px',
        }}
      >
        <div className="inVoice_print_area">
          <div
            className="in_voice_logo"
            style={{ textAlign: 'center', padding: '5px 0px' }}
          >
            <img
              src={settings?.logo || restoraPosLogo}
              width="100px"
              height="50px"
              alt="Restora POS"
              style={{ width: '170px', height: '50px', objectFit: 'cover' }}
            />
          </div>

          <h2
            style={{
              textAlign: 'center',
              fontWeight: '700',
              color: '#000',
              marginBottom: 0,
            }}
          >
            {settings.storename ? settings.storename : 'Restora POS'}
          </h2>
          <p
            style={{
              textAlign: 'center',
              marginBottom: 0,
              color: '#000',
              fontSize: '12px',
            }}
          >
            {settings?.address}
          </p>

          <div
            className="in_voice_info flex content_between"
            style={{ marginTop: '0.2rem' }}
          >
            <p
              style={{
                fontWeight: '700',
                marginBottom: 0,
                color: '#000',
                fontSize: '12px',
              }}
            >
              Date: {`${moment(date).format('LL')}`}
            </p>
            {settings?.vattinno && (
              <p style={{ marginBottom: 0, color: '#000', fontSize: '12px' }}>
                TIN OR VAT NUM.: {settings?.vattinno}
              </p>
            )}
          </div>

          <div style={{ border: '1px dashed #000' }}></div>

          <div>
            <div className="in_voice_info flex content_between">
              <h4
                style={{
                  fontWeight: '700',
                  marginBottom: 0,
                  color: '#000',
                  fontSize: '12px',
                }}
              >
                Item
              </h4>
              <h4
                style={{
                  fontWeight: '700',
                  marginBottom: 0,
                  color: '#000',
                  fontSize: '12px',
                }}
              >
                Total
              </h4>
            </div>

            {foodItems?.length > 0 &&
              foodItems?.map((item, index) => (
                <div key={index} className="in_voice_info flex content_between">
                  <p
                    style={{ marginBottom: 0, color: '#000', fontSize: '12px' }}
                  >
                    {item.product_name} {item.quantity} x {item.price}
                  </p>
                  <p
                    style={{
                      fontWeight: '700',
                      marginBottom: 0,
                      color: '#000',
                      fontSize: '12px',
                    }}
                  >
                    {item.total_price}
                  </p>
                </div>
              ))}
          </div>

          <div style={{ border: '1px dashed #000' }}></div>

          <div>
            <div className="in_voice_info flex content_between">
              <h4
                style={{
                  fontWeight: '700',
                  marginBottom: 0,
                  color: '#000',
                  fontSize: '12px',
                }}
              >
                Subtotal
              </h4>
              <h4
                style={{
                  fontWeight: '700',
                  marginBottom: 0,
                  color: '#000',
                  fontSize: '12px',
                }}
              >
                {settings.currency}
                {calc.getTotalPrice()}
              </h4>
            </div>

            <div className="in_voice_info flex content_between">
              <p style={{ marginBottom: 0, color: '#000', fontSize: '12px' }}>
                Vat({settings.vat ? settings.vat : 0}%)
              </p>
              <p
                style={{
                  fontWeight: '700',
                  marginBottom: 0,
                  color: '#000',
                  fontSize: '12px',
                }}
              >
                {settings.currency}
                {calc.getVat()}
              </p>
            </div>

            <div className="in_voice_info flex content_between">
              <p style={{ marginBottom: 0, color: '#000', fontSize: '12px' }}>
                Service Charge
              </p>
              <p
                style={{
                  fontWeight: '700',
                  marginBottom: 0,
                  color: '#000',
                  fontSize: '12px',
                }}
              >
                {settings.currency}
                {calc.getServiceCharge()}
              </p>
            </div>

            <div className="in_voice_info flex content_between">
              <p style={{ marginBottom: 0, color: '#000', fontSize: '12px' }}>
                Discount
              </p>
              <p
                style={{
                  fontWeight: '700',
                  marginBottom: 0,
                  color: '#000',
                  fontSize: '12px',
                }}
              >
                {settings.currency}
                {calc.getDiscountAmount()}
              </p>
            </div>
          </div>

          <div style={{ border: '1px dashed #000' }}></div>

          <div>
            <div className="in_voice_info flex content_between">
              <h4
                style={{
                  fontWeight: '700',
                  marginBottom: 0,
                  color: '#000',
                  fontSize: '12px',
                }}
              >
                Total
              </h4>
              <h4
                style={{
                  fontWeight: '700',
                  marginBottom: 0,
                  color: '#000',
                  fontSize: '12px',
                }}
              >
                {settings.currency}
                {calc.getGrandTotal()}
              </h4>
            </div>

            {/* <div className="in_voice_info flex content_between">
              <p style={{ marginBottom: 0, color: '#000' }}>
                Total Payable Amount
              </p>
              <p style={{ fontWeight: '700', marginBottom: 0, color: '#000' }}>
                {settings.currency}
                {calc.getGrandTotal()}
              </p>
            </div> */}
          </div>

          <div className="in_voice_info flex content_center">
            <p
              style={{
                marginBottom: 0,
                color: '#000',
                marginTop: '0.5rem',
                fontSize: '12px',
              }}
            >
              Billing To: {customerList}
            </p>
            {/* <p>Bill By: Jone Doe</p> */}
          </div>

          <h3
            style={{
              textAlign: 'center',
              fontWeight: '700',
              marginBottom: 0,
              color: '#000',
              fontSize: '14px',
            }}
          >
            Thank you very mush
          </h3>
          <div style={{ border: '1px solid #000' }}></div>
          <p
            style={{
              textAlign: 'center',
              marginBottom: 0,
              color: '#000',
              fontSize: '12px',
            }}
          >
            Powered By: RESTORAPOS,
          </p>
          <p
            style={{
              textAlign: 'center',
              marginBottom: 0,
              color: '#000',
              fontSize: '12px',
            }}
          >
            https://restorapos.com/
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default InVoiceGenerate;
