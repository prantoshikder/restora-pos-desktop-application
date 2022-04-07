import { Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import './InsertSettingsModal.style.scss';

const InsertSettingsModal = ({
  insertSettingsModal,
  setInsertSettingsModal,
}) => {
  const navigate = useNavigate();
  const handleCloseModal = () => {
    setInsertSettingsModal(false);
    navigate('/application_setting');
  };

  return (
    <Modal
      visible={insertSettingsModal}
      centered
      footer={null}
      width={500}
      closable={false}
    >
      <div className="modal_content">
        <h1>Welcome to Restora POS</h1>
        <p>
          You did not setup your POS settings. Please, set the settings first to
          use the POS properly.{' '}
        </p>
        <Button type="primary" onClick={handleCloseModal}>
          Go to Settings
        </Button>
      </div>
    </Modal>
  );
};

export default InsertSettingsModal;
