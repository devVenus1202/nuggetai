import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Modal, Button } from '@material-ui/core';
import './TestCardDeleteModal.scss';
function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}
class TestCardDeleteModal extends React.Component {
  handleClose = () => {
    this.props.onHide();
  };
  
  render() {
    const { show, testId, deleteTest } = this.props;
    console.log(show);
    return (
      <Modal
        className="testCardDeleteModal"
        aria-labelledby="simple-modal-title-"
        aria-describedby="simple-modal-description-"
        open={show}
        onClose={this.handleClose}
      >
        <div style={getModalStyle()} className={'paper'}>
          <Typography variant="subheading">
            {this.context.t('are-you-sure-you-want-to-delete')}
          </Typography>
          <br/>
          <div className="modal-actions">
            <Button
              className="deleteButton"
              onClick={deleteTest}
              variant="contained"
              color="primary"
              size = "small"
            >
              {this.context.t('delete')}
            </Button>
            <Button
              className="cancelButton"
              onClick={this.handleClose}
              variant="contained"
              color="default"
              size = "small"
            >
              {this.context.t('cancel')}
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}


TestCardDeleteModal.contextTypes = {
  t: PropTypes.func,
};


TestCardDeleteModal.propTypes = {
  onHide: PropTypes.func.isRequired,
  deleteTest: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};
export default TestCardDeleteModal;
