import { CloseOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useState } from 'react';

const Search = ({ foodLists }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setLoading] = useState(false);

  // Search Food Items
  const handleSearchProducts = () => {
    setLoading(true);

    if (searchValue?.length > 1) {
      const searchItems = foodLists.filter((foodItems) =>
        foodItems.product_name
          .toLowerCase()
          .match(new RegExp(searchValue.toLowerCase(), 'g'))
      );

      if (searchItems?.length > 0) {
        setSearchResults(searchItems);
        setLoading(false);
      }
    } else {
      closeModal();
      setLoading(false);
    }
  };

  function closeModal() {
    setSearchResults('');
    setSearchValue('');
  }

  const isEmpty = !searchResults || searchResults.length === 0;

  const expandContainer = () => {
    setIsExpanded(true);
  };

  const handleAddToCartItem = (foodCartItem) => {
    console.log('foodCartItem', foodCartItem);

    // if (foodCartItem?.variants?.length > 1) {
    //   setIsExpanded(false);
    //   closeModal();
    //   setCartItems(foodCartItem);
    // } else {
    //   setIsExpanded(false);
    //   closeModal();
    //   setCartItems(foodCartItem);
    // }
  };

  return (
    <>
      <Input
        type="text"
        placeholder="Search"
        size="large"
        onFocus={expandContainer}
        value={searchValue}
        suffix={
          <>
            {isExpanded === true && (
              <CloseOutlined
                onClick={() => {
                  setIsExpanded(false);
                  closeModal();
                }}
                // className="site-form-item-icon"
              />
            )}
          </>
        }
        onChange={(e) => {
          handleSearchProducts();
          setSearchValue(e.target.value);
        }}
      />

      {isExpanded && (
        <div className="searchResultWrapper">
          {/* <div>
            <CloseOutlined
              onClick={() => {
                setIsExpanded(false);
                closeModal();
              }}
              style={{ float: 'right' }}
            />
          </div> */}

          <div className="">
            {isLoading && (
              <div style={{ textAlign: 'center' }}>
                <p style={{ textAlign: 'center' }}>Loading...</p>

                {/* <Spin tip="Loading..." size="large" /> */}
              </div>
            )}

            {!isLoading && isEmpty && (
              <div>
                <p style={{ textAlign: 'center' }}>Start typing to search</p>
              </div>
            )}

            {searchResults?.length > 0 && (
              <>
                {searchResults?.map((item) => (
                  <div
                    key={item?.id}
                    className="flex content_between item_center"
                    style={{
                      marginTop: '10px',
                      cursor: 'pointer',
                      backgroundColor: '#f4f4f4',
                      padding: '0.5rem 2rem',
                    }}
                    onClick={() => handleAddToCartItem(item)}
                  >
                    <p>{item?.product_name}</p>

                    <img
                      src={item?.product_image}
                      height="50px"
                      width="50px"
                      style={{
                        float: 'right',
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                      }}
                      alt=""
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
