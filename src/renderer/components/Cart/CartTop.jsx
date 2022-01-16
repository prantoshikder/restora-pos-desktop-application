import React from 'react';
import { Col, Row } from 'react-bootstrap';

const CartTop = () => {
  return (
    <div className="form-content">
      <div className="banner-card">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A, iure.
          Earum commodi pariatur, ut est harum quaerat, obcaecati magnam ratione
          sequi rem fuga? Eos veniam distinctio veritatis illo repellat tempore!
        </p>
        <Row className="search-food-wrapper justify-content-md-center">
          <Col lg={8}>
            <input type="text" placeholder="Search" className="form-control" />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CartTop;
