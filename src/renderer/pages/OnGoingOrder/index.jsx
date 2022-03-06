import { useEffect, useState } from 'react';
import InVoiceGenerate from 'renderer/components/InVoiceGenerate';
import OnGoingOrderItems from 'renderer/components/OnGoingOrderItems';
// import OnGoingFooter from '../../components/OnGoingFooter';
import { getDataFromDatabase } from './../../../helpers';
import Header from './../../components/partials/Header';

const OnGoingOrder = ({ settings }) => {
  window.get_all_order_info_ongoing.send('get_all_order_info_ongoing', {
    status: true,
  });

  const [orderData, setOrderData] = useState([]);
  const [orderComplete, setOrderComplete] = useState({});

  useEffect(() => {
    getDataFromDatabase(
      'get_all_order_info_ongoing_response',
      window.get_all_order_info_ongoing
    ).then((data) => {
      if (Array.isArray(data) && data?.length > 0) {
        setOrderData(data);
      }
    });
  }, []);

  return (
    <div className="main_wrapper">
      <Header settings={settings} />

      <div className="on_going_order_menu" style={{ margin: '0rem 1.2rem' }}>
        <OnGoingOrderItems
          orderData={orderData}
          setOrderData={setOrderData}
          setOrderComplete={setOrderComplete}
        />
      </div>

      <InVoiceGenerate settings={settings} />

      {/* <OnGoingFooter orderComplete={orderComplete} settings={settings} /> */}
    </div>
  );
};

export default OnGoingOrder;
