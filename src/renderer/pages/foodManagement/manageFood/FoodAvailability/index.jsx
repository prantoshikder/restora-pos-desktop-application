import { Col, ConfigProvider, Row } from 'antd';
import FoodAvailabilityList from 'renderer/components/FoodAvailabilityList';
import Heading from 'renderer/components/Heading';
import Sidebar from './../../../../components/partials/Sidebar';
import './FoodAvailability.style.scss';

const FoodAvailability = ({ settings }) => {
  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <ConfigProvider direction={settings.site_align}>
          <Row>
            <Col lg={5} xl={3} xxl={3}>
              <Sidebar settings={settings} />
            </Col>
            <Col lg={19} xl={21} xxl={21}>
              <Heading title="Food Availability" />

              <FoodAvailabilityList />
            </Col>
          </Row>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default FoodAvailability;
