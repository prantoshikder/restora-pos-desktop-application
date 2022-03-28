import { ConfigProvider } from 'antd';
import Header from 'renderer/components/partials/Header';

const Contact = ({ settings }) => {
  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <ConfigProvider direction={settings.site_align}>
          <Header settings={settings} />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default Contact;
