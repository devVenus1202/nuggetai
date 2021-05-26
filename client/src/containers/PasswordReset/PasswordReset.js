import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Grid,
  Paper,
  InputBase,
  Typography,
  Snackbar,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import authAction from '../../redux/auth/actions';
import loginBack from '../../images/login/background.png';
import './PasswordReset.scss';
import Footer from '../../components/Footer/Footer';

const { sendPasswordReset } = authAction;

const CustomInput = withStyles(theme => ({
  root: {
    width: '100%',
    border: 'solid 1px #d3d3d3',
    paddingRight: 16,
    borderRadius: 5,
  },
  input: {
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    fontSize: 14,
    width: '100%',
    height: 38,
    padding: '10px 26px 10px 12px',
    lineHeight: '1.43',
    letterSpacing: 'normal',
    // transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      borderRadius: 4,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);

class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      openError: false,
      error: '',
    };
  }

  handleChangeInfo = name => event => {
    this.setState({ [name]: event.target.value, valid: 0, error: '' });
  };

  handleSubmit = () => {
    const { email } = this.state;
    const { sendPasswordReset } = this.props;
    if (
      !email.length ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
    ) {
      this.setState({
        openError: true,
        error: this.context.t('invalid-email'),
      });
      return;
    }
    this.setState({
      openError: false,
      error: '',
    });
    sendPasswordReset({ email });
  };

  handleClose = () => {
    this.setState({ openError: false });
  };

  render() {
    const { email, openError, error } = this.state;
    const { loading, errorMsg } = this.props;

    return (
      <React.Fragment>
        <Grid
          className="password-reset-wrapper"
          container
          justify="center"
          alignItems="center"
        >
          <img className="back-image" src={loginBack} alt="" />

          <Paper elevation={0} className="password-reset-form">
            <Grid
              xs={12}
              container
              justify="flex-start"
              alignItems="center"
              className="password-reset-header"
            >
              <Typography variant="h5" component="h5">
                {this.context.t('password-reset')}
              </Typography>
            </Grid>
            <Grid container spacing={8} className="inputs-wrapper">
              <Grid item xs={12} container>
                <Typography variant="p" component="p">
                  {this.context.t('enter-your-email-and-well')}
                </Typography>
              </Grid>

              <Grid item xs={12} container>
                <Typography variant="label" component="label">
                  {this.context.t('email')}
                </Typography>
                <CustomInput
                  disabled={loading}
                  value={email}
                  onChange={this.handleChangeInfo('email')}
                  helperText={this.context.t('email')}
                  placeholder={this.context.t('enter-your-email')}
                />
              </Grid>

              <Grid item container xs={12} alignItems="center" justify="center">
                <Button
                  className="sign-in-btn"
                  onClick={this.handleSubmit}
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {this.context.t('send')}
                </Button>
              </Grid>
              {(error || errorMsg) && (
                <Grid xs={12} className="error-msg">
                  <i className="fa fa-exclamation-triangle valid__icon" />
                  <p className="valid__text">
                    &nbsp;
                    {error}
                  </p>
                  <p className="valid__text">
                    &nbsp;
                    {errorMsg}
                  </p>
                </Grid>
              )}
            </Grid>
          </Paper>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={openError}
            autoHideDuration={3000}
            onClose={this.handleClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{error}</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
        </Grid>
      </React.Fragment>
    );
  }
}

PasswordReset.contextTypes = {
  t: PropTypes.func,
};

PasswordReset.propTypes = {
  sendPasswordReset: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

const mapStateToProps = state => ({
  loading: state.authReducer.loading,
  errorMsg: state.authReducer.errorMsg,
});

const mapDispatchToProps = {
  sendPasswordReset,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PasswordReset);
