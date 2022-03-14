import { Col, ConfigProvider, Row } from 'antd';
import AllAddonsAssignList from 'renderer/components/AllAddonsAssignList';
import Heading from 'renderer/components/Heading';
import Sidebar from './../../../../components/partials/Sidebar';
import './AddonsAssignList.style.scss';

const AddonsAssignList = ({ settings }) => {
  return (
    <div className="main_wrapper">
      <div className=" pos_system">
        <ConfigProvider direction={settings.site_align}>
          <Row>
            <Col lg={5} xl={3} xxl={3}>
              <Sidebar />
            </Col>

            <Col lg={19} xl={21} xxl={21}>
              <Heading title="Add-ons Assign List" />

              <AllAddonsAssignList />
            </Col>
          </Row>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default AddonsAssignList;
