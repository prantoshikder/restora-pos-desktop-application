import { Col, ConfigProvider, Row } from 'antd';
import Heading from 'renderer/components/Heading';
import Sidebar from './../../components/partials/Sidebar';
import CurrencyList from './CurrencyList';

const Currency = ({ settings }) => {
  return (
    <>
      <ConfigProvider direction={settings.site_align}>
        <div className="main_wrapper">
          <div className="pos_system">
            <Row>
              <Col lg={5} xl={3} xxl={3}>
                <Sidebar settings={settings} />
              </Col>
              <Col lg={19} xl={21} xxl={21}>
                <Heading title="Currency" />

                <CurrencyList />
              </Col>
            </Row>
          </div>
        </div>
      </ConfigProvider>
    </>
  );
};

export default Currency;
