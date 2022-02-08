import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { getDataFromDatabase } from './../../../helpers';
import './PosSidebar.style.scss';

const PosSidebar = ({ direction }) => {
  const [categories, setCategories] = useState([]);
  window.get_category.send('sendResponseForCategory', { status: true });

  useEffect(() => {
    getDataFromDatabase('sendCategoryData', window.get_category).then(
      (data) => {
        console.log('data', data);
        setCategories(data);
      }
    );
  }, []);

  // console.log('categories', categories);

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

        {categories?.map((category) => (
          <Button
            key={category?.category_id}
            size="large"
            type="primary"
            style={{ textAlign: direction === 'rtl' ? 'right' : 'left' }}
          >
            {category?.category_name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PosSidebar;
