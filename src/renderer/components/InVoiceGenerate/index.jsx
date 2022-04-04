// import InVoiceLogo from '../../../../assets/retora_pos.png';
import { Image } from 'antd';
import { CalculatePrice, checkTokenLength } from 'helpers';
import moment from 'moment';
import { useRef } from 'react';
import restoraPosLogo from '../../../../assets/retora_pos.png';
import './InVoiceGenerate.style.scss';

const InVoiceGenerate = ({
  settings,
  openModal,
  setOpenModal,
  openInvoice,
  foodItems,
  foodData,
  invoicePrint,
  customerName,
}) => {
  const date = new Date();
  const invoiceWrapperRef = useRef(null);
  const calc = new CalculatePrice(settings, foodItems);
  const receiptNo = foodData?.order_id?.toString().length;

  return (
    <div
      className="inVoice_wrapper"
      id={`${invoicePrint}`}
      style={{
        padding: '0px 20px',
        margin: 0,
        display: 'none',
      }}
    >
      <div className="inVoice_print_area">
        <div
          className="in_voice_logo"
          style={{ textAlign: 'center', padding: '5px 0px' }}
        >
          <Image
            src={`${
              settings?.logo ? `file://${settings?.logo}` : restoraPosLogo
            }`}
            width={150}
            preview={false}
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

        <div className="in_voice_info " style={{ marginTop: '0.2rem' }}>
          {foodData?.order_id && (
            <h4
              style={{
                fontWeight: '700',
                marginBottom: 0,
                color: '#000',
                fontSize: '12px',
              }}
            >
              Receipt No:{' '}
              <span
                style={{
                  fontWeight: 'normal',
                  color: '#000',
                  fontSize: '12px',
                }}
              >
                {checkTokenLength(receiptNo, foodData?.order_id)}
              </span>
            </h4>
          )}
          <h4
            style={{
              fontWeight: '700',
              marginBottom: 0,
              color: '#000',
              fontSize: '12px',
            }}
          >
            Date:{' '}
            <span
              style={{
                fontWeight: 'normal',
                color: '#000',
                fontSize: '12px',
              }}
            >{`${moment(date).format('LLL')}`}</span>
          </h4>

          {/* Static payment method type */}
          <h4
            style={{
              fontWeight: '700',
              marginBottom: 0,
              color: '#000',
              fontSize: '12px',
            }}
          >
            Payment Method:{' '}
            <span
              style={{
                fontWeight: 'normal',
                color: '#000',
                fontSize: '12px',
              }}
            >
              Cash
            </span>
          </h4>

          {settings?.vattinno && (
            <h4
              style={{
                fontWeight: '700',
                marginBottom: 0,
                color: '#000',
                fontSize: '12px',
              }}
            >
              Tin Or Vat No:{' '}
              <span
                style={{
                  fontWeight: 'normal',
                  color: '#000',
                  fontSize: '12px',
                }}
              >
                {settings?.vattinno}
              </span>
            </h4>
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
                <p style={{ marginBottom: 0, color: '#000', fontSize: '12px' }}>
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
              {settings.currency} {calc.getTotalPrice()}
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
              {settings.currency} {calc.getVat()}
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
              {settings.currency} {calc.getServiceCharge()}
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
              {settings.currency} {calc.getDiscountAmount()}
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
              {settings.currency} {calc.getGrandTotal()}
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
            Billing To: {customerName}
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
          Powered By: Restora POS,
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
  );
};

export default InVoiceGenerate;
