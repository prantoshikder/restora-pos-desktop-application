import { Button } from 'antd';
import React from 'react';
import './PosSidebar.style.scss';

const PosSidebar = ({ direction }) => {
  return (
    <div className="pos_sidebar">
      <div className="btn_wrapper">
        <Button
          size="large"
          type="primary"
          style={{ textAlign: direction === 'rtl' ? 'right' : 'left' }}
        >
          All
        </Button>

        <Button
          size="large"
          type="primary"
          style={{ textAlign: direction === 'rtl' ? 'right' : 'left' }}
        >
          Fast Food Item
        </Button>

        <Button
          size="large"
          type="primary"
          style={{ textAlign: direction === 'rtl' ? 'right' : 'left' }}
        >
          Thai
        </Button>

        <Button
          size="large"
          type="primary"
          style={{ textAlign: direction === 'rtl' ? 'right' : 'left' }}
        >
          Soup(Thai)
        </Button>

        <Button
          size="large"
          type="primary"
          style={{ textAlign: direction === 'rtl' ? 'right' : 'left' }}
        >
          Chicken Fry
        </Button>

        <Button
          size="large"
          type="primary"
          style={{ textAlign: direction === 'rtl' ? 'right' : 'left' }}
        >
          Prawn & Fish Fry
        </Button>

        <Button
          size="large"
          type="primary"
          style={{ textAlign: direction === 'rtl' ? 'right' : 'left' }}
        >
          Chowmein
        </Button>

        <Button
          size="large"
          type="primary"
          style={{ textAlign: direction === 'rtl' ? 'right' : 'left' }}
        >
          Grill & Deep Fried
        </Button>

        <Button
          size="large"
          type="primary"
          style={{ textAlign: direction === 'rtl' ? 'right' : 'left' }}
        >
          Chicken Sharma
        </Button>

        <Button
          size="large"
          type="primary"
          style={{ textAlign: direction === 'rtl' ? 'right' : 'left' }}
        >
          Burger
        </Button>

        <Button
          size="large"
          type="primary"
          style={{ textAlign: direction === 'rtl' ? 'right' : 'left' }}
        >
          Pizza
        </Button>

        <Button
          size="large"
          type="primary"
          style={{ textAlign: direction === 'rtl' ? 'right' : 'left' }}
        >
          Rice
        </Button>

        <Button
          size="large"
          type="primary"
          style={{ textAlign: direction === 'rtl' ? 'right' : 'left' }}
        >
          Italian
        </Button>

        <Button
          size="large"
          type="primary"
          style={{ textAlign: direction === 'rtl' ? 'right' : 'left' }}
        >
          Indian
        </Button>

        <Button
          size="large"
          type="primary"
          style={{ textAlign: direction === 'rtl' ? 'right' : 'left' }}
        >
          Chinese Vegetables
        </Button>

        <Button
          size="large"
          type="primary"
          style={{ textAlign: direction === 'rtl' ? 'right' : 'left' }}
        >
          Arabic
        </Button>

        <Button
          size="large"
          type="primary"
          style={{ textAlign: direction === 'rtl' ? 'right' : 'left' }}
        >
          Maxican
        </Button>

        <Button
          size="large"
          type="primary"
          style={{ textAlign: direction === 'rtl' ? 'right' : 'left' }}
        >
          Beef(Thai)
        </Button>

        <Button
          size="large"
          type="primary"
          style={{ textAlign: direction === 'rtl' ? 'right' : 'left' }}
        >
          Salad
        </Button>
      </div>
    </div>
  );
};

export default PosSidebar;
