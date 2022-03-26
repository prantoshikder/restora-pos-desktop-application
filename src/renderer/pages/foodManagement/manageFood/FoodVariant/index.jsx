import { Col, ConfigProvider, Row } from 'antd';
import Heading from 'renderer/components/Heading';
import FoodVariantList from './../../../../components/FoodVariantList';
import Sidebar from './../../../../components/partials/Sidebar';
import './FoodVariant.style.scss';

const FoodVariant = ({ settings }) => {
  return (
    <div className="main_wrapper">
      <div className=" pos_system">
        <ConfigProvider direction={settings.site_align}>
          <Row>
            <Col lg={5} xl={3} xxl={3}>
              <Sidebar settings={settings} />
            </Col>
            <Col lg={19} xl={21} xxl={21}>
              <Heading title="Food Variant" />

              <FoodVariantList />
            </Col>
          </Row>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default FoodVariant;
