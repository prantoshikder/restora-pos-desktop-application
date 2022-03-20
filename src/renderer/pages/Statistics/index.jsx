import { Col, ConfigProvider, Row } from 'antd';
import Sidebar from 'renderer/components/partials/Sidebar';
import StatisticsRatio from './StatisticsRatio';

const Statistics = ({ settings }) => {
  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <ConfigProvider direction={settings.site_align}>
          <Row>
            <Col lg={5} xl={3} xxl={3}>
              <Sidebar />
            </Col>

            <Col lg={19} xl={21} xxl={21}>
              <StatisticsRatio />
            </Col>
          </Row>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default Statistics;
