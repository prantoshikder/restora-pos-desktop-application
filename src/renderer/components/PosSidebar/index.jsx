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

  const handelClick = (category_id) => {
    window.get_sub_category_list.send('get_sub_category_list', {'category_id': 1})
  }
  window.get_sub_category_list.once('get_sub_category_list_response', (args)=>{
    console.log(args);
  })
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
            onClick={() => handelClick(category?.category_id)}
            size="large"
            type="primary"
            style={{
              textAlign: direction === 'rtl' ? 'right' : 'left',
              backgroundColor: category.category_color
                ? category.category_color
                : '#6900ff',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div style={{ width: '30px', marginRight: '5px' }}>
              {category?.category_icon ? (
                <img src="" alt="" />
              ) : (
                <img
                  src="https://i.postimg.cc/bvzKkjn3/image.png"
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
