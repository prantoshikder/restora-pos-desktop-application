import { Col, Row } from 'antd';
import Address from './Address';
import './ContactUs.style.scss';

const ContactUs = ({ settings }) => {
  return (
    <div className="contact_us_area">
      <h1 className="contact_us_title">
        Hello. <span>How can we you help you?</span>
      </h1>

      <div className="contact_address">
        <Row gutter={40}>
          <Col lg={6} push={3}>
            <div className="address">
              <Address
                title="Bangladesh Office"
                address="B-25, Mannan Plaza, 4th Floor, Khilkhet, Dhaka-1229,
                Bangladesh"
                number="+88-01817584639, +88-01817584639"
                email="business@bdtask.com"
              />
            </div>
          </Col>
          <Col lg={6} push={3}>
            <div className="address">
              <Address
                title="Australia Office"
                address="29/22 Tunbridge St Mascot NSW 2020"
                number="+61 405 989 463"
                email="bdtask@bdtask.com"
              />
            </div>
          </Col>
          <Col lg={6} push={3}>
            <div className="address">
              <Address
                title="Everything else."
                address="Front Desk"
                number="+88-01817584639"
                email="bdtask@gmail.com"
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ContactUs;
