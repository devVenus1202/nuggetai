import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Modal } from '@material-ui/core';
import CopyInput from '../../CopyInput';
import './TrainLinkModal.scss';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class TrainLinkModal extends React.Component {

  handleClose = () => {
    this.props.onHide();
  };

  render() {
    const { trainlink, show } = this.props;

    return (
      <Modal
        className="trainLinkModal"
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={show}
        onClose={this.handleClose}
      >
        <div style={getModalStyle()} className={'paper'}>
          <Typography variant="title" id="modal-title">
            Train Link Modal
          </Typography>
          <Typography variant="subheading" id="simple-modal-description">
            <h4>Create your benchmark</h4>
            <p>Create a benchmark by sending the assessment to top performing employees first. Share the link below.</p>
            <br/>
            <CopyInput content={trainlink} />          
          </Typography>
          <TrainLinkModal />
        </div>
      </Modal>
    );
  }
}

TrainLinkModal.propTypes = {
  onHide: PropTypes.func,
  trainlink: PropTypes.string,
  show: PropTypes.bool,
};

export default TrainLinkModal;