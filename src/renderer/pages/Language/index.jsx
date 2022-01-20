import { Col, Row } from 'antd';
import React from 'react';
import Heading from 'renderer/components/Heading';
import LanguageList from 'renderer/components/LanguageList';
import Sidebar from './../../components/partials/Sidebar';

const Language = () => {
  return (
    <>
      <div className="main_wrapper">
        <div className="pos_system">
          <Row>
            <Col lg={3}>
              <Sidebar />
            </Col>
            <Col lg={21}>
              <Heading title="Language" />
              <LanguageList />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Language;
