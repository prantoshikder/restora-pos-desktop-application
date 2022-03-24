import { CloseOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useContext, useEffect, useRef, useState } from 'react';
import { ContextData } from 'renderer/contextApi';
import AddFoodsModal from '../AddFoodsModal';

const Search = ({ foodLists }) => {
  const searchResultRef = useRef(null);
  const searchInputRef = useRef(null);

  const { cartItems, setCartItems } = useContext(ContextData);
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isExpanded, setExpanded] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [addonsAdd, setAddonsAdd] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [variantPrice, setVariantPrice] = useState(0);
  const [variantFixedPrice, setVariantFixedPrice] = useState(0);
  const [foodVariantName, setFoodVariantName] = useState('Regular');

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

  const handleAddToCartItem = (e, item) => {
    console.log('foodCartItem', item);

    const isCartItemExist = cartItems.find(
      (cartItem) => cartItem.food_id === item.food_id
    );

    console.log('asdfasd', item?.variants[0]);

    if (Array.isArray(item?.variants) && item?.variants?.length > 1) {
      setVariantPrice(item.variants[0].price);
      setVariantFixedPrice(item.variants[0].price);
      setAddonsAdd(item);
      setOpenModal(true);
      setFoodVariantName(item?.variants[0]);
    } else if (Array.isArray(item?.addons) && item?.addons?.length > 0) {
      setVariantPrice(item.variants[0].price);
      setVariantFixedPrice(item.variants[0].price);
      setAddonsAdd(item);
      setOpenModal(true);
      setFoodVariantName(item?.variants[0]);
    } else {
      if (!isCartItemExist) {
        const cartItem = {
          id: item.variants[0].date_inserted,
          food_id: item.food_id,
          isSelected: true,
          product_name: item.variants[0].product_name,
          foodVariant: item.variants[0].variant_name,
          price: item.variants[0].price,
          total_price: item.variants[0].price,
          quantity: item.variants[0].quantity,
        };

        e.currentTarget.style.borderColor = '#297600';
        setCartItems([...cartItems, cartItem]);
      } else {
        const index = cartItems.findIndex(
          (cartItem) => cartItem.food_id === item.food_id
        );

        isCartItemExist.quantity += 1;
        isCartItemExist.total_price =
          isCartItemExist.quantity * isCartItemExist.price;

        const newCartItems = [
          ...cartItems.slice(0, index),
          isCartItemExist,
          ...cartItems.slice(index + 1),
        ];

        setCartItems([...newCartItems]);

        if (item.id) {
          message.info({
            content: `${isCartItemExist.product_name} has already been added. That's why we just increased the amount & price.`,
            duration: 1,
            style: {
              marginTop: '5vh',
              float: 'right',
            },
          });
        }
      }
    }
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
                        onClick={(e) => handleAddToCartItem(e, item)}
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

      <AddFoodsModal
        addonsAdd={addonsAdd}
        openModal={openModal}
        setOpenModal={setOpenModal}
        variantPrice={variantPrice}
        cartItems={cartItems}
        setCartItems={setCartItems}
        foodVariantName={foodVariantName}
        setFoodVariantName={setFoodVariantName}
        variantFixedPrice={variantFixedPrice}
        setVariantFixedPrice={setVariantFixedPrice}
        closeModal={closeModal}
        setVariantPrice={setVariantPrice}
      />
    </>
  );
};

export default Search;
