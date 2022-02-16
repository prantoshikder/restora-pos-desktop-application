import { Col, ConfigProvider, Row } from 'antd';
import Heading from 'renderer/components/Heading';
import AllFoodList from './../../../../components/AllFoodList';
import Sidebar from './../../../../components/partials/Sidebar';
import './FoodList.style.scss';

const FoodList = ({ settings }) => {
  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <ConfigProvider direction={settings.direction}>
          <Row>
            <Col lg={3}>
              <Sidebar />
            </Col>

            <Col lg={21}>
              <Heading title="Food List" />

              <AllFoodList />
            </Col>
          </Row>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default FoodList;
