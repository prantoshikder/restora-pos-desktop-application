import InVoiceLogo from '../../../../assets/retora_pos.png';
import './InVoiceGenerate.style.scss';

const InVoiceGenerate = () => {
  return (
    <div className="inVoice_wrapper">
      <div className="inVoice_print_area">
        <div className="in_voice_logo">
          <img src={InVoiceLogo} alt="" />
        </div>
        <h1>Dhaka Restaurant</h1>
        <br />

        <div style={{ border: '1px dashed #333' }}></div>

        <div>
          <div className="in_voice_info flex content_between">
            <p>content</p>
            <p>25$</p>
          </div>
          <div className="in_voice_info flex content_between">
            <p>content</p>
            <p>25$</p>
          </div>
          <div className="in_voice_info flex content_between">
            <p>content</p>
            <p>25$</p>
          </div>
          <div className="in_voice_info flex content_between">
            <p>content</p>
            <p>25$</p>
          </div>
        </div>

        <div style={{ border: '1px dashed #333' }}></div>

        <div className="in_voice_info flex content_between">
          <p>Total</p>
          <p>100$</p>
        </div>
      </div>
    </div>
  );
};

export default InVoiceGenerate;
