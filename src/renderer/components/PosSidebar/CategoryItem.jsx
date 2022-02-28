import { DownOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';

const CategoryItem = ({
  category,
  settings,
  show,
  foodLists,
  setFoodLists,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpenSubCategory = (categoryItem) => {
    if (
      category?.category_id === categoryItem?.category_id &&
      categoryItem?.subCategories?.length > 0
    ) {
      setOpen(!open);
    } else {
      console.log('category', categoryItem.category_id);
      const filterData = foodLists.filter((foodList) => {
        console.log('foodList', foodList);
        return foodList?.category_id === categoryItem?.category_id;
      });

      setFoodLists(filterData);
      console.log('filterData', filterData);
      // console.log('foodLists', foodLists);
    }
  };

  return (
    <>
      <Button
        onClick={() => handleOpenSubCategory(category)}
        size="large"
        type="primary"
        style={{
          textAlign: settings.site_align === 'rtl' ? 'right' : 'left',
          backgroundColor: category.category_color
            ? category.category_color
            : '#000',
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

        {category?.subCategories?.length > 0 && (
          <DownOutlined style={{ fontWeight: 'bold', marginLeft: 'auto' }} />
        )}
      </Button>

      {open && category?.subCategories?.length > 0 && (
        <>
          {category?.subCategories?.map((category) => (
            <CategoryItem
              key={category?.category_id}
              settings={settings}
              category={category}
              show={show}
            />
          ))}
        </>
      )}
    </>
  );
};

export default CategoryItem;
