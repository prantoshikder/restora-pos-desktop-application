import { Col, ConfigProvider, Row } from 'antd';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Heading from 'renderer/components/Heading';
import AddNewAddons from './../../../../components/AddNewAddons';
import Sidebar from './../../../../components/partials/Sidebar';

const AddAddons = ({ direction }) => {
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
              <Heading title="Add Add-ons" />

              <AddNewAddons state={state} />
            </Col>
          </Row>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default AddAddons;
