import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './Register.scss';
import { SANDBOX_URL } from '../../constants/config';

import { Button, Grid, Paper, InputBase, Typography, InputAdornment } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import authAction from '../../redux/auth/actions';
import loginBack from '../../images/login/background.png';
import Footer from '../../components/Footer/Footer';

const { registerRequest, logoutRequest } = authAction;

const CustomInput = withStyles((theme) => ({
  root: {
    width: '100%',
    border: 'solid 1px #d3d3d3',
    paddingRight: 10,
    paddingLeft: 5,
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

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      firstname: '',
      lastname: '',
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

  handleRegister = (event) => {
    event.preventDefault();

    const { firstname, lastname, email, password, confirmPassword } = this.state;

    if (!firstname.length || !lastname.length) {
      this.setState({ valid: 1 });
      return;
    }

    if (!email.length || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      this.setState({ valid: 2 });
      return;
    }
    if (password.length < 5) {
      this.setState({ valid: 3 });
      return;
    }

    if (password !== confirmPassword) {
      this.setState({ valid: 4 });
      return;
    }

    this.setState({ valid: -1 });

    const { registerRequest } = this.props;

    const res = registerRequest({
      email: email,
      password: password,
      account_type: true,
      firstname,
      lastname
    });
    console.log(res);
  };

  handleClickShowPassword = () => {
    this.setState((state) => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { valid, firstname, lastname, email, password, confirmPassword, showPassword } = this.state;
    const { history, errorMsg } = this.props;
    console.log(errorMsg);
    const invalidMsg = [
      this.context.t('invalid-username'),
      this.context.t('invalid-email'),
      this.context.t('invalid-password'),
      this.context.t('password-not-match')
    ];

    return (
      <React.Fragment>
        <Grid className="register_wrapper" container justify="center" alignItems="center">
          <img className="back-image" src={loginBack} alt="" />

          <Paper elevation={0} className="login_form">
            <Grid xs={12} container justify="flex-start" alignItems="center" className="login-header">
              <Typography variant="h5" component="h5" onClick={() => history.push('login')}>
                {this.context.t('login')}
              </Typography>
              <Typography variant="h5" component="h5" className="selected">
                {this.context.t('signup')}
              </Typography>
            </Grid>
            <React.Fragment>
              {(valid > 0 || errorMsg) && (
                <Grid xs={12} className="error-msg">
                  <i className="fa fa-exclamation-triangle valid__icon" />
                  <p className="valid__text">
                    &nbsp;
                    {invalidMsg[valid - 1]}
                  </p>
                  <p className="valid__text">
                    &nbsp;
                    {errorMsg}
                  </p>
                </Grid>
              )}
              <Grid container spacing={8} className="inputs-wrapper">
                <Grid item xs={6} container>
                  <Typography variant="label" component="label">
                    {this.context.t('firstname')}
                  </Typography>
                  <CustomInput
                    value={firstname}
                    onChange={this.handleChangeInfo('firstname')}
                    helperText={this.context.t('firstname')}
                    placeholder={this.context.t('enter-your-firstname')}
                  />
                </Grid>
                <Grid item xs={6} container>
                  <Typography variant="label" component="label">
                    {this.context.t('lastname')}
                  </Typography>
                  <CustomInput
                    value={lastname}
                    onChange={this.handleChangeInfo('lastname')}
                    helperText={this.context.t('lastname')}
                    placeholder={this.context.t('enter-your-lastname')}
                  />
                </Grid>
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
                  <Typography variant="label" component="label">
                    {this.context.t('password')}
                  </Typography>
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

                <Grid item xs={12} container>
                  <Typography variant="label" component="label">
                    {this.context.t('confirm-password')}
                  </Typography>
                  <CustomInput
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={this.handleChangeInfo('confirmPassword')}
                    placeholder={this.context.t('repeat-your-password')}
                    helperText={this.context.t('confirm-password')}
                  />
                </Grid>

                <Grid item container xs={12} alignItems="center" justify="center">
                  <Button
                    className="sign-in-btn"
                    onClick={this.handleRegister}
                    variant="contained"
                    color="primary"
                  >
                    {this.context.t('signup')}
                  </Button>
                </Grid>
              </Grid>
              <Grid className="login-actions" item container xs={12} alignItems="center" justify="center">
                <Typography variant="a" component="a">
                  <a href={`${SANDBOX_URL}/register`}>{this.context.t('signup-as-employee')}</a>
                </Typography>
              </Grid>
            </React.Fragment>
          </Paper>
        </Grid>
      </React.Fragment>
    );
  }
}

Register.contextTypes = {
  t: PropTypes.func
};

Register.propTypes = {
  registerRequest: PropTypes.func.isRequired,
  logoutRequest: PropTypes.func.isRequired,
  registerStatus: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string,
  user: PropTypes.object,
  history: PropTypes.object
};

const mapStateToProps = (state) => ({
  registerStatus: state.authReducer.registerStatus,
  errorMsg: state.authReducer.errorMsg,
  isLoggedIn: state.authReducer.isLoggedIn,
  user: state.authReducer.user
});

const mapDispatchToProps = {
  registerRequest,
  logoutRequest
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));
