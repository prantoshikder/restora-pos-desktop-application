import { Col, Input, Row } from 'antd';
import { useContext, useEffect, useState } from 'react';
import InVoiceGenerate from 'renderer/components/InVoiceGenerate';
import OnGoingOrderItems from 'renderer/components/OnGoingOrderItems';
import { ContextData } from 'renderer/contextApi';
import OnGoingFooter from '../../components/OnGoingFooter';
import { getDataFromDatabase } from './../../../helpers';
import Header from './../../components/partials/Header';

const OnGoingOrder = ({ settings }) => {
  window.get_all_order_info_ongoing.send('get_all_order_info_ongoing', {
    status: true,
  });

  const { cartItems, setCartItems } = useContext(ContextData);

  const [orderData, setOrderData] = useState([]);
  const [orderComplete, setOrderComplete] = useState({});
  const [openSearchInput, setOpenSearchInput] = useState(false);
  const [activeInactiveBtn, setActiveInactiveBtn] = useState({});
  // const [orderAllData, setOrderAllData] = useState([]);
  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    getDataFromDatabase(
      'get_all_order_info_ongoing_response',
      window.get_all_order_info_ongoing
    ).then((data) => {
      if (Array.isArray(data) && data?.length > 0) {
        setOrderData(data);
      }
    });
  }, [reRender]);

  const [searchValue, setSearchValue] = useState('');

  const handleSearchOnGoingOrder = (e) => {
    setSearchValue(e.target.value);

    const searchData = orderData.filter((orderItem) =>
      orderItem.order_id.toString().match(new RegExp(e.target.value, 'g'))
    );

    // const filtered = orderData.filter((entry) =>
    //   Object.keys(entry)
    //     .map((key) => entry[key])
    //     .some(e.target.value)
    // );

    // const filtered = orderData.filter((entry) =>
    //   Object.keys(entry)
    //     .map((key) => entry['order_id'].toString())
    //     .some(e.target.value)
    // );

    // console.log('searchData', searchData);

    if (searchData?.length > 0 && e.target.value.length > 0) {
      setOrderData(searchData);
    } else {
      setReRender((prevState) => !prevState);
    }
  };

  return (
    <div className="main_wrapper">
      <Header settings={settings} />

      <div className="on_going_order_menu" style={{ margin: '0rem 1.2rem' }}>
        <div>
          {openSearchInput === true && (
            <Row className="search_food_wrapper">
              <Col lg={14} push={5}>
                <Input
                  type="text"
                  placeholder="Search"
                  size="large"
                  style={{ margin: '1rem 0rem', transition: 'all 0.5s linear' }}
                  value={searchValue}
                  onChange={(e) => handleSearchOnGoingOrder(e)}
                />
              </Col>
            </Row>
          )}
        </div>

        <OnGoingOrderItems
          setActiveInactiveBtn={setActiveInactiveBtn}
          orderData={orderData}
          setOrderData={setOrderData}
          setOrderComplete={setOrderComplete}
        />
      </div>

      <InVoiceGenerate settings={settings} foodItems={cartItems} />

      <OnGoingFooter
        openSearchInput={openSearchInput}
        setOpenSearchInput={setOpenSearchInput}
        orderComplete={orderComplete}
        settings={settings}
        activeInactiveBtn={activeInactiveBtn}
        setReRender={setReRender}
      />
    </div>
  );
};

export default OnGoingOrder;
