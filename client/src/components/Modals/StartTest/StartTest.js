import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Modal, Button } from '@material-ui/core';
import './StartTest.scss';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

class StartTest extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClose = () => {
    this.props.onHide();
  };

  handleStart = () => {
    this.props.onStart();
  };

  handleCancel = () => {
    this.props.onCancel();
  };

  render() {
    const { show, startTestError } = this.props;
    return (
      <Modal
        className="startTest start-test-modal"
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={show}
        onClose={this.handleClose}
      >
        <div style={getModalStyle()} className="paper">
          <div className="message">{startTestError}</div>
          <Typography variant="title" id="modal-title">
            {this.context.t('start-test-title')}
          </Typography>
          <Typography className="modal_content" id="modal-content">
            {this.context.t('start-test-content')} <br />
          </Typography>
          <div className="form">

            <Button
              className="cancel_but"
              color="primary"
              variant="outlined"
              onClick={this.handleCancel}
            >
              {this.context.t('show-me-again-u')}
            </Button>
            <Button
              className="start_but"
              variant="contained"
              color="primary"
              onClick={this.handleStart}
            >
              {this.context.t('start')}
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

StartTest.contextTypes = {
  t: PropTypes.func,
};

StartTest.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.bool,
};

export default StartTest;
