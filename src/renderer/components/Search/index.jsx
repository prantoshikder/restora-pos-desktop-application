import { CloseOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useEffect, useRef, useState } from 'react';

const Search = ({ foodLists }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isExpanded, setExpanded] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const searchResultRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [searchResultRef]);

  function handleOutsideClick(e) {
    if (searchInputRef.current.input.contains(e.target)) {
      setExpanded(true);
    } else if (
      searchResultRef.current &&
      !searchResultRef.current.contains(e.target)
    ) {
      setExpanded(false);
    }
  }

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
    setExpanded(true);
  };

  const handleAddToCartItem = (foodCartItem) => {
    console.log('foodCartItem', foodCartItem);
  };

  return (
    <>
      <Input
        type="text"
        placeholder="Search by food name"
        size="large"
        ref={searchInputRef}
        onFocus={expandContainer}
        value={searchValue}
        suffix={
          <>
            {isExpanded === true && (
              <CloseOutlined
                onClick={() => {
                  setExpanded(false);
                  closeModal();
                }}
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
        <div className="search_result_wrapper" ref={searchResultRef}>
          <div className="">
            {!isLoading && isEmpty && (
              <div>
                <p style={{ textAlign: 'center' }}>Start typing to search</p>
              </div>
            )}

            {isLoading ? (
              <div>
                <p style={{ textAlign: 'center' }}>Product Not Found</p>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
