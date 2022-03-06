import InVoiceGenerate from 'renderer/components/InVoiceGenerate';
import OnGoingOrderItems from 'renderer/components/OnGoingOrderItems';
import OnGoingFooter from '../../components/OnGoingFooter';
import Header from './../../components/partials/Header';

const OnGoingOrder = ({ settings }) => {
  return (
    <div className="main_wrapper">
      <Header settings={settings} />

      <div className="on_going_order_menu" style={{ margin: '0rem 1.2rem' }}>
        <OnGoingOrderItems />
      </div>

      <InVoiceGenerate />

      <OnGoingFooter />
    </div>
  );
};

export default OnGoingOrder;
