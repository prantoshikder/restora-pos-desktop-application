import defaultIcon from '';
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

        const categoryFilter =
          Array.isArray(data) &&
          data?.filter(
            (category) =>
              category.category_is_active !== 0 &&
              category.category_is_active !== null
          );

        setCategories(categoryFilter);
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
            style={{
              textAlign: direction === 'rtl' ? 'right' : 'left',
              backgroundColor: category.category_color
                ? category.category_color
                : '#6900ff',
              display: 'flex',
            }}
          >
            <div style={{ width: '30px' }}>
              {category?.category_icon ? (
                <img src="" alt="" />
              ) : (
                <img
                  src="https://restorapos.com/newrpos/application/modules/itemmanage/assets/images/2021-12-09/s.jpg"
                  width="20px"
                  height="20px"
                  alt=""
                />
              )}
            </div>

            {category?.category_name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PosSidebar;
