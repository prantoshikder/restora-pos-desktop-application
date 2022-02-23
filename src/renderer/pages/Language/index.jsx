import { Col, ConfigProvider, Row } from 'antd';
import Heading from 'renderer/components/Heading';
import LanguageList from 'renderer/components/LanguageList';
import Sidebar from './../../components/partials/Sidebar';

const Language = ({ settings }) => {
  return (
    <>
      <div className="main_wrapper">
        <div className="pos_system">
          <ConfigProvider direction={settings.site_align}>
            <Row>
              <Col lg={3}>
                <Sidebar />
              </Col>
              <Col lg={21}>
                <Heading title="Language" />

                <LanguageList />
              </Col>
            </Row>
          </ConfigProvider>
        </div>
      </div>
    </>
  );
};

export default Language;
