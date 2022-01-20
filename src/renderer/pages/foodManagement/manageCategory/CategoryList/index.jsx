import { Col, ConfigProvider, Row } from 'antd';
import React from 'react';
import Heading from 'renderer/components/Heading';
import AllCategoryList from './../../../../components/AllCategoryList';
import Sidebar from './../../../../components/partials/Sidebar';
import './CategoryList.style.scss';

const CategoryList = ({ direction }) => {
  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <ConfigProvider direction={direction}>
          <Row>
            <Col lg={3}>
              <Sidebar />
            </Col>

            <Col lg={21}>
              <Heading title="Category List" />
              <AllCategoryList />
            </Col>
          </Row>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default CategoryList;
