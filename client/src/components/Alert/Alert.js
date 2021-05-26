import React, { Component } from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import './Alert.scss';

class Alert extends Component {
  render() {
    const { className, message, onClose, variant, ...other } = this.props;
    const Icon = CheckCircleIcon;
    return (
      <SnackbarContent
        className={`success ${className} alert_wrapper`}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={'message'}>
            <Icon className="icon iconVariant" />
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className="close"
            onClick={onClose}
          >
            <CloseIcon className="icon" />
          </IconButton>,
        ]}
        {...other}
      />
    );
  }
}

export default Alert;
