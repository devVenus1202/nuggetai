import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Modal, Button } from '@material-ui/core';
import './ConfirmModal.scss';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class ConfirmModal extends React.Component {
  constructor(props) {
    super(props);
  }

  handleStart = () => {
    this.props.onConfirm();
  };

  handleClose = () => {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  };

  handleCancel = () => {
    this.props.onCancel();
  };

  render() {
    const { isOpened, title, content, confirmText, cancelText } = this.props;
    return (
      <Modal
        className="confirmModal start-test-modal"
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={isOpened}
        onClose={this.handleClose}
      >
        <div style={getModalStyle()} className="paper">
          <Typography variant="title" id="modal-title">
            {title || ''}
          </Typography>
          <Typography className="modal_content" id="modal-content">
            {content || ''}
            <br />
          </Typography>
          <div className="form">
            {this.props.onConfirm && (
              <Button
                className="start_but"
                variant="contained"
                color="primary"
                onClick={this.handleStart}
              >
                {confirmText || 'Ok'}
              </Button>
            )}
            {this.props.onCancel && (
              <Button
                className="cancel_but"
                color="primary"
                variant="outlined"
                onClick={this.handleCancel}
              >
                {cancelText || 'Cancel'}
              </Button>
            )}
          </div>
        </div>
      </Modal>
    );
  }
}

ConfirmModal.propTypes = {
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  isOpened: PropTypes.bool,
};

export default ConfirmModal;
