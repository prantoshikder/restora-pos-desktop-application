import defaultIcon from '';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { getDataFromDatabase } from './../../../helpers';
import CategoryItem from './CategoryItem';
import './PosSidebar.style.scss';

const PosSidebar = ({ settings }) => {
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

  return (
    <div className="pos_sidebar">
      <div className="btn_wrapper">
        <Button
          size="large"
          type="primary"
          style={{
            textAlign: settings.site_align === 'rtl' ? 'right' : 'left',
          }}
        >
          All
        </Button>

        {categories?.map((category) => (
          <CategoryItem
            key={category?.category_id}
            settings={settings}
            category={category}
          />
        ))}
      </div>
    </div>
  );
};

export default PosSidebar;
