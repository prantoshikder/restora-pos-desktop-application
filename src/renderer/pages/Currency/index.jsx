import { Col, ConfigProvider, Row } from 'antd';
import Heading from 'renderer/components/Heading';
import Sidebar from './../../components/partials/Sidebar';
import './Currency.styles.scss';
import CurrencyList from './CurrencyList';

const Currency = ({ settings, currencyLists, setCurrencyLists }) => {
  return (
    <>
      <ConfigProvider direction={settings.site_align}>
        <div className="main_wrapper">
          <div className="pos_system">
            <Row>
              <Col lg={3}>
                <Sidebar />
              </Col>
              <Col md={21}>
                <Heading title="Currency" />

                <CurrencyList
                  currencyLists={currencyLists}
                  setCurrencyLists={setCurrencyLists}
                />
              </Col>
            </Row>
          </div>
        </div>
      </ConfigProvider>
    </>
  );
};

export default Currency;
