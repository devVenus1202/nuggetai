import React, { Component } from "react";
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';
import './RecordTool.scss';

class RecordTool extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  handleClick = event => {
    
  };

  render() {
    const activeStyle = this.state.open ? "activeStyle" : "";
    return (
      <div>
        <div
          className={`tool__wrapper ${activeStyle}`}
          onClick={this.handleClick}
        >
          <SettingsVoiceIcon className="voice__icon" />
        </div>
      </div>
    );
  }
}

export default RecordTool;
