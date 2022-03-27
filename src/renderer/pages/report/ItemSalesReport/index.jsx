import { Col, ConfigProvider, Row } from 'antd';
import AllItemSalesReport from 'renderer/components/AllItemSalesReport';
import Heading from 'renderer/components/Heading';
import Sidebar from './../../../components/partials/Sidebar';

const ItemSalesReport = ({ settings }) => {
  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <ConfigProvider direction={settings.site_align}>
          <Row>
            <Col lg={5} xl={3} xxl={3}>
              <Sidebar settings={settings} />
            </Col>
            <Col lg={19} xl={21} xxl={21}>
              <Heading title="Items Sales Report" />

              <AllItemSalesReport settings={settings} />
            </Col>
          </Row>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default ItemSalesReport;
