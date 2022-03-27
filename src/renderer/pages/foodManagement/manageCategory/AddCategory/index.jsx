import { Col, ConfigProvider, Row } from 'antd';
import { useLocation } from 'react-router-dom';
import Heading from 'renderer/components/Heading';
import AddNewCategory from './../../../../components/AddNewCategory';
import Sidebar from './../../../../components/partials/Sidebar';

const AddCategory = ({ settings }) => {
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
              {state?.category_id ? (
                <Heading title="Update Category" />
              ) : (
                <Heading title="Add Category" />
              )}

              <AddNewCategory state={state} />
            </Col>
          </Row>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default AddCategory;
