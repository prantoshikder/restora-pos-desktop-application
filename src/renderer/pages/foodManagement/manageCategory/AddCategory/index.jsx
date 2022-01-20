import { Col, ConfigProvider, Row } from 'antd';
import React from 'react';
import Heading from 'renderer/components/Heading';
import AddNewCategory from './../../../../components/AddNewCategory';
import Sidebar from './../../../../components/partials/Sidebar';
import './AddCategory.style.scss';

const AddCategory = ({ direction }) => {
  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <ConfigProvider direction={direction}>
          <Row>
            <Col lg={3}>
              <Sidebar />
            </Col>

            <Col lg={21}>
              <Heading title="Add Category" />

              <AddNewCategory />
            </Col>
          </Row>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default AddCategory;
