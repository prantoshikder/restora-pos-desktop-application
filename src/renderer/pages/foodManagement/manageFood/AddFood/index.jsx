import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Modal, Row, Typography } from 'antd';
import React, { useState } from 'react';
import Heading from 'renderer/components/Heading';
import AddNewFood from './../../../../components/AddNewFood';
import Sidebar from './../../../../components/partials/Sidebar';
import './AddFood.style.scss';

const { Text } = Typography;

const AddFood = () => {
  const [show, setShow] = useState(false);

  const [visible, setVisible] = useState(false);

  const handleShow = () => setVisible(true);

  return (
    <>
      <div className="main_wrapper">
        <div className="pos_system">
          <Row>
            <Col lg={3}>
              <Sidebar />
            </Col>

            <Col lg={21}>
              <div className="flex content_between item_center">
                <Heading title="Add Food" />
                <Button
                  type="primary"
                  className="bulk_upload_btn"
                  onClick={handleShow}
                >
                  <PlusCircleOutlined />
                  Bulk Upload
                </Button>
              </div>
              <AddNewFood />
            </Col>
          </Row>
        </div>
      </div>

      <Modal
        title="Bulk Upload"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={null}
        width={650}
      >
        <Text>
          Category, kitchen, Food Name, Description, status, VariantName, Price
          Demo, Italian, Dosa, Delicious Food, Active, Small, 60
        </Text>
      </Modal>
    </>
  );
};

export default AddFood;
