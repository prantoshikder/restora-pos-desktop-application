import { CloseOutlined } from '@ant-design/icons';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './Header.style.scss';

const Header = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="navbar">
        <Container fluid>
          {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#newOrder">New Order</Nav.Link>
              <Nav.Link href="#onGoingOrder">On Going Order</Nav.Link>
              <Nav.Link href="#kitchenStatus">Kitchen Status</Nav.Link>
              <Nav.Link href="#qrOrder">QR Order</Nav.Link>
              <Nav.Link href="#onlineOrder">Online Order</Nav.Link>
              <Nav.Link href="#todayOrder">Today Order</Nav.Link>
            </Nav>

            <Nav>
              <Nav.Link href="#deets">
                <CloseOutlined />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
