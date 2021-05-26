import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './VerifyEmail.scss';
import { Grid, Paper, InputBase, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import authAction from '../../redux/auth/actions';
import loginBack from '../../images/login/background.png';

const { sendVerifyRequest, logoutRequest } = authAction;

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      valid: 0,
      showPassword: false
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user === null && this.props.user) {
      this.props.history.push('/');
    }
  }

  handleClickShowPassword = () => {
    this.setState((state) => ({ showPassword: !state.showPassword }));
  };

  handleChangeInfo = (name) => (event) => {
    this.setState({ [name]: event.target.value, valid: 0 });
  };

  handleSignin = (event) => {
    event.preventDefault();
    const { loginRequest } = this.props;
    const { email, password } = this.state;

    if (!email.length || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      this.setState({ valid: 2 });
      return;
    }

    if (password.length < 5) {
      this.setState({ valid: 3 });
      return;
    }

    loginRequest({
      email,
      password
    });
  };

  handleClickShowPassword = () => {
    this.setState((state) => ({ showPassword: !state.showPassword }));
  };

  sendAgain = (event) => {
    event.preventDefault();
    console.log('send again', this.props.user);
    this.props.sendVerifyRequest(this.props.user);
  };

  render() {
    const { type, valid, showPassword, email, password } = this.state;
    const { history, errorMsg, sucessMsg } = this.props;

    const invalidMsg = [
      this.context.t('invalid-username'),
      this.context.t('invalid-email'),
      this.context.t('invalid-password'),
      this.context.t('password-not-match')
    ];

    return (
      <React.Fragment>
        <Grid className="verify_wrapper" container justify="center" alignItems="flex-start">
          <img className="back-image" src={loginBack} alt="" />

          <Paper elevation={0} className="verify_form">
            <Grid xs={12} container justify="flex-start" alignItems="center" className="verify_header">
              <Typography variant="h5" component="h5">
                {this.context.t('verify-email-title')}
              </Typography>
            </Grid>
            {errorMsg && (
              <Grid xs={12} className="error-msg">
                <i className="fa fa-exclamation-triangle valid__icon" />
                <p className="valid__text">
                  &nbsp;
                  {this.context.t('error-mail-sent')}
                </p>
              </Grid>
            )}
            {sucessMsg && (
              <Grid xs={12} className="error-msg">
                <p className="valid__text success_text">
                  &nbsp;
                  {this.context.t('mail-sent')}
                </p>
              </Grid>
            )}
            <React.Fragment>
              <Grid container spacing={8} className="inputs-wrapper">
                <Grid item xs={12} container>
                  <Typography variant="label" component="label">
                    {this.context.t('verify-email-content')}
                  </Typography>
                </Grid>
                <Grid item xs={12} container>
                  <Typography variant="label" component="label">
                    {this.context.t('send-email-again-text')}
                  </Typography>
                </Grid>
                <Grid item xs={12} container>
                  <Button variant="contained" color="secondary" onClick={this.sendAgain}>
                    {this.context.t('send-email-again')}
                  </Button>
                </Grid>
              </Grid>
            </React.Fragment>
          </Paper>
        </Grid>
      </React.Fragment>
    );
  }
}

VerifyEmail.contextTypes = {
  t: PropTypes.func
};

VerifyEmail.propTypes = {
  sendVerifyRequest: PropTypes.func.isRequired,
  logoutRequest: PropTypes.func.isRequired,
  registerStatus: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object,
  history: PropTypes.object,
  errorMsg: PropTypes.string,
  sucessMsg: PropTypes.string
};

const mapStateToProps = (state) => ({
  registerStatus: state.authReducer.registerStatus,
  isLoggedIn: state.authReducer.isLoggedIn,
  user: state.authReducer.user,
  errorMsg: state.authReducer.errorMsg,
  sucessMsg: state.authReducer.sucessMsg
});

const mapDispatchToProps = {
  sendVerifyRequest,
  logoutRequest
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VerifyEmail));
