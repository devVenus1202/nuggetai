import React from 'react';
import PropTypes from 'prop-types';
import 'rc-color-picker/assets/index.css';
import { Typography, Modal, Button } from '@material-ui/core';
import './InformModal.scss';

import HeaderImage from '../../../images/watch.png';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class InformModal extends React.Component {

  closeModal = () => {
    this.props.onClose();
  };

  onConfirm = () => {
    this.props.onConfirm();
  }

  render() {
    return (
      <Modal
        className="informDataModal"
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.isOpened}
        // onClose={this.closeModal}
      >
        <div style={getModalStyle()} className={'paper'}>
          <div className="header">
            <img src={HeaderImage} className="header-image" alt="Header" />
            <Typography
              variant="title"
              id="modal-title"
              className="header-title"
            >
              {this.context.t('go-take-a-look')}
            </Typography>
          </div>

          <div className="content">
            <Typography className="description" component="div">
              {this.context.t('for-2-minutes')}
              <Typography className="note" component="div">
                {this.context.t('your-data-will-not-saved-in-the-preview')}
              </Typography>
            </Typography>
          </div>
          <div className="footer">
            <Button
              className="start_but"
              variant="contained"
              onClick={this.onConfirm}
              color="primary"
              size="large"
            >
              {this.context.t('neat-let-me-see-it')}
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

InformModal.propTypes = {
  isOpened: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

InformModal.contextTypes = {
  t: PropTypes.func,
};

export default InformModal;
