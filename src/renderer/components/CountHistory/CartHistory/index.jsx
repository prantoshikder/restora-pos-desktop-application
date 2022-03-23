import { Col } from 'antd';

const CartHistory = ({ item }) => {
  return (
    <Col lg={6}>
      <div
        style={{
          backgroundColor: '#fbfbfb',
          borderRadius: '8px',
          textAlign: 'center',
          padding: '1rem',
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
          marginBottom: '2rem',
        }}
      >
        <h1>{item?.amount}</h1>
        <h2>{item?.name}</h2>
      </div>
    </Col>
  );
};

export default CartHistory;
