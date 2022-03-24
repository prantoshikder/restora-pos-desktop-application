import { Col, ConfigProvider, Row } from 'antd';
import { useLocation } from 'react-router-dom';
import Heading from 'renderer/components/Heading';
import AddNewAddons from './../../../../components/AddNewAddons';
import Sidebar from './../../../../components/partials/Sidebar';

const AddAddons = ({ settings }) => {
  const { state } = useLocation();

  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <ConfigProvider direction={settings.site_align}>
          <Row>
            <Col lg={5} xl={3} xxl={3}>
              <Sidebar settings={settings} />
            </Col>

            <Col lg={19} xl={21} xxl={21}>
              {state?.add_on_id ? (
                <Heading title="Update Add-ons" />
              ) : (
                <Heading title="Add Add-ons" />
              )}

              <AddNewAddons state={state} />
            </Col>
          </Row>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default AddAddons;
