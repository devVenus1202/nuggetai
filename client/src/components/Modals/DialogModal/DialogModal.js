import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './DialogModal.scss';

const DialogModal = ({ isOpen, title, handleOk, handleClose, children }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      className="dialogModal"
    >
      <DialogTitle id="scroll-dialog-title" className="header">
        {title}
      </DialogTitle>
      <DialogContent dividers={true}>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions className="footer">
        <Button
          onClick={handleOk}
          variant="contained"
          color="primary"
          classes={{ root: 'actionButton' }}
        >
          Accept
        </Button>
        <Button
          onClick={handleClose}
          variant="outlined"
          color="primary"
          classes={{ outlined: 'outlinedButton' }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.object,
};

export default DialogModal;
