import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';
import { Col, Container, Modal } from 'react-bootstrap';
import Heading from 'renderer/components/Heading';
import AddNewFood from './../../../../components/AddNewFood';
import Sidebar from './../../../../components/partials/Sidebar';
import './AddFood.style.scss';

const AddFood = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Container fluid className="main-wrapper">
        <div className="flex pos_system">
          <Col lg={2}>
            <Sidebar />
          </Col>

          <Col lg={10}>
            <div className="flex content-between item-center">
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
        </div>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bulk Upload</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Category, kitchen, Food Name, Description, status, VariantName, Price
          Demo, Italian, Dosa, Delicious Food, Active, Small, 60
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddFood;
