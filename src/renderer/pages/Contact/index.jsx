import { ConfigProvider } from 'antd';
import ContactUs from 'renderer/components/ContactUs';
import Header from 'renderer/components/partials/Header';

const Contact = ({ settings }) => {
  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <ConfigProvider direction={settings.site_align}>
          <Header settings={settings} />

          <ContactUs settings={settings} />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default Contact;
