import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { SANDBOX_URL } from '../../constants/config';
import './Login.scss';
import { Button, Grid, Paper, InputBase, Typography, InputAdornment } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import authAction from '../../redux/auth/actions';
import loginBack from '../../images/login/background.png';
import Footer from '../../components/Footer/Footer';
import { getUser } from '../../utils/localStorageUtil';

const { loginRequest, logoutRequest } = authAction;

const CustomInput = withStyles((theme) => ({
  root: {
    width: '100%',
    border: 'solid 1px #d3d3d3',
    paddingRight: 16,
    borderRadius: 5
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
      borderColor: theme.palette.primary.main
    }
  }
}))(InputBase);

class Login extends Component {
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

  render() {
    const { type, valid, showPassword, email, password } = this.state;
    const { history, errorMsg } = this.props;

    const invalidMsg = [
      this.context.t('invalid-username'),
      this.context.t('invalid-email'),
      this.context.t('invalid-password'),
      this.context.t('password-not-match')
    ];

    const user = getUser();
    return user ? (
      <Redirect to="/" />
    ) : (
      <React.Fragment>
        <Grid className="login_wrapper" container justify="center" alignItems="center">
          <img className="back-image" src={loginBack} alt="" />
          <Paper elevation={0} className="login_form">
            <Grid xs={12} container justify="flex-start" alignItems="center" className="login-header">
              <Typography variant="h5" component="h5" className="selected">
                {this.context.t('login')}
              </Typography>
              <Typography variant="h5" component="h5" onClick={() => history.push('/register')}>
                {this.context.t('signup')}
              </Typography>
            </Grid>
            <React.Fragment>
              {(valid !== 0 || errorMsg) && (
                <Grid xs={12} className="error-msg">
                  <i className="fa fa-exclamation-triangle valid__icon" />
                  <p className="valid__text">
                    &nbsp;
                    {invalidMsg[valid - 1]}
                    {valid === 0 && this.context.t(errorMsg)}
                  </p>
                </Grid>
              )}
              <Grid container spacing={8} className="inputs-wrapper">
                <Grid item xs={12} container>
                  <Typography variant="label" component="label">
                    {this.context.t('email')}
                  </Typography>
                  <CustomInput
                    value={email}
                    onChange={this.handleChangeInfo('email')}
                    helperText={this.context.t('email')}
                    placeholder={this.context.t('enter-your-email')}
                  />
                </Grid>
                <Grid item xs={12} container>
                  <Grid xs={6}>
                    <Typography variant="label" component="label">
                      {this.context.t('password')}
                    </Typography>
                  </Grid>
                  <Grid xs={6}>
                    <Typography
                      className="forgot-link"
                      variant="label"
                      component="label"
                      align="right"
                      onClick={() => history.push('/password-reset')}
                    >
                      {this.context.t('forgot-password')}
                    </Typography>
                  </Grid>
                  <Grid xs={12} container>
                    <CustomInput
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={this.handleChangeInfo('password')}
                      placeholder={this.context.t('enter-your-password')}
                      helperText={this.context.t('password')}
                      endAdornment={
                        <InputAdornment
                          position="start"
                          className="visible-password"
                          onClick={this.handleClickShowPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </InputAdornment>
                      }
                    />
                  </Grid>
                </Grid>

                <Grid item container xs={12} alignItems="center" justify="center">
                  <Button
                    className="sign-in-btn"
                    onClick={this.handleSignin}
                    variant="contained"
                    color="primary"
                  >
                    {this.context.t('login')}
                  </Button>
                </Grid>
              </Grid>
              <Grid className="login-actions" item container xs={12} alignItems="center" justify="center">
                <Typography variant="a" component="a">
                  <a href={`${SANDBOX_URL}/login`}>{this.context.t('login-as-employee')}</a>
                </Typography>
              </Grid>
            </React.Fragment>
          </Paper>
        </Grid>
      </React.Fragment>
    );
  }
}

Login.contextTypes = {
  t: PropTypes.func
};

Login.propTypes = {
  loginRequest: PropTypes.func.isRequired,
  logoutRequest: PropTypes.func.isRequired,
  registerStatus: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object,
  history: PropTypes.object,
  errorMsg: PropTypes.string
};

const mapStateToProps = (state) => ({
  registerStatus: state.authReducer.registerStatus,
  isLoggedIn: state.authReducer.isLoggedIn,
  user: state.authReducer.user,
  errorMsg: state.authReducer.errorMsg
});

const mapDispatchToProps = {
  loginRequest,
  logoutRequest
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
