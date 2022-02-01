import { Col, ConfigProvider, Row } from 'antd';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Heading from 'renderer/components/Heading';
import AddNewCategory from './../../../../components/AddNewCategory';
import Sidebar from './../../../../components/partials/Sidebar';
import './AddCategory.style.scss';

const AddCategory = ({ direction }) => {
  const { state } = useLocation();

  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <ConfigProvider direction={direction}>
          <Row>
            <Col lg={3}>
              <Sidebar />
            </Col>

            <Col lg={21}>
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
