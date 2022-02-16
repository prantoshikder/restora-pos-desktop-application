import { Col, ConfigProvider, Row } from 'antd';
import Heading from 'renderer/components/Heading';
import Sidebar from '../../../components/partials/Sidebar';
import AllSalesReport from './../../../components/AllSalesReport';
import './SalesReport.style.scss';

const SalesReport = ({ settings }) => {
  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <ConfigProvider direction={settings.direction}>
          <Row>
            <Col lg={3}>
              <Sidebar />
            </Col>
            <Col md={21}>
              <Heading title="Sales Report" />

              <AllSalesReport />
            </Col>
          </Row>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default SalesReport;
