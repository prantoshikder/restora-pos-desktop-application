import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './Header.style.scss';

const Header = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="navbar">
        <Container fluid>
          {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto left_navbar">
              <Nav.Link href="#newOrder">New Order</Nav.Link>
              <Nav.Link href="#onGoingOrder">On Going Order</Nav.Link>
              <Nav.Link href="#kitchenStatus">Kitchen Status</Nav.Link>
              <Nav.Link href="#qrOrder">QR Order</Nav.Link>
              <Nav.Link href="#onlineOrder">Online Order</Nav.Link>
              <Nav.Link href="#todayOrder">Today Order</Nav.Link>
            </Nav>

            <div className="right_navbar">
              <Button type="primary" onClick={() => setVisible(true)} danger>
                <FontAwesomeIcon icon={faTimes} />
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal
        title="Modal 1000px width"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={null}
        width={700}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
};

export default Header;
