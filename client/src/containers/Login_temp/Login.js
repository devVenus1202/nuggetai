import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Grid,
  Hidden,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import authAction from '../../redux/auth/actions';
import Ellipse from '../../images/Ellipse.png';
import bottom from '../../images/bottom.png';
import './Login.scss';

const { loginRequest, registerRequest, logoutRequest } = authAction;

const invalidMsg = ['Invalid Username!', 'Invalid Email!', 'Invalid Password!'];

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: 0,
      register_name: '',
      register_email: '',
      register_pwd: '',
      login_email: '',
      login_pwd: '',
      account_type: true,
      showRegister: true,
      reg_show_password: false,
      login_show_password: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user === null && this.props.user) {
      this.props.history.push('/dashboard');
    }

    // if (prevProps.registerStatus === false && this.props.registerStatus) {
    //   this.props.history.push('/dashboard');
    // }
  }

  handleChangeType = account_type => () => {
    this.setState({ account_type });
  };

  handleRegister = event => {
    event.preventDefault();

    const {
      register_name,
      register_email,
      register_pwd,
      account_type,
    } = this.state;

    if (register_name.length < 3 || register_name.indexOf('asdf') !== -1) {
      this.setState({ valid: 1 });
      return;
    }
    if (
      !register_email.length ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(register_email)
    ) {
      this.setState({ valid: 2 });
      return;
    }
    if (register_pwd.length < 5) {
      this.setState({ valid: 3 });
      return;
    }

    this.setState({ valid: -1 });

    const { registerRequest } = this.props;

    registerRequest({
      firstname: register_name,
      email: register_email,
      password: register_pwd,
      account_type: true,
    });
  };

  handleChangeInfo = name => event => {
    this.setState({ [name]: event.target.value, valid: 0 });
  };

  handleRegisterSuccess = () => {
    this.props.history.push('/dashboard');
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleSignin = event => {
    event.preventDefault();
    const { loginRequest } = this.props;
    const { login_email, login_pwd } = this.state;

    loginRequest({
      email: login_email,
      password: login_pwd,
    });
  };

  render() {
    const { user, registerStatus } = this.props;
    const { islogin } = this.props.match.params;

    const { valid } = this.state;

    let validationStyle;
    if (valid > 0) {
      validationStyle = 'validationFalse';
    } else if (valid === -1) {
      validationStyle = 'success';
    } else {
      validationStyle = 'validationTrue';
    }

    return (
      <div className="loginPage">
        {user === null && islogin === undefined && (
          <Grid
            className="register_wrapper"
            container
            spacing={40}
            justify="center"
          >
            <Grid item sm={6}>
              <div className="login_form">
                <h1>
                  <strong>{this.context.t('tell-us-about-yourself')}</strong>
                </h1>
                <h4>{this.context.t('own-your-personal-space')}.</h4>
                <TextField
                  id="company"
                  label="Username"
                  className="text_field"
                  value={this.state.register_name}
                  onChange={this.handleChangeInfo('register_name')}
                  margin="normal"
                />
                <TextField
                  id="register_email"
                  label="Email"
                  className="text_field"
                  value={this.state.register_email}
                  onChange={this.handleChangeInfo('register_email')}
                  margin="normal"
                />
                <FormControl className={'text_field'}>
                  <InputLabel htmlFor="adornment-password">{this.context.t('password')}</InputLabel>
                  <Input
                    id="adornment-password"
                    className="password_field"
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.register_pwd}
                    onChange={this.handleChangeInfo('register_pwd')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                          onMouseDown={this.handleMouseDownPassword}
                        >
                          {this.state.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {/* <FormLabel className="account-type-label">
                    Account Type
                  </FormLabel>
                  <RadioGroup>
                    <FormControlLabel
                      control={<Radio
                                color="primary"
                                value={true}
                                checked={this.state.account_type}
                                onChange={this.handleChangeType(true)}
                              />}
                      label="Employer"
                    />
                    <FormControlLabel
                      control={<Radio
                                color="primary"
                                value={false}
                                checked={!this.state.account_type}
                                onChange={this.handleChangeType(false)}
                              />}
                      label="Candidate"
                    />
                  </RadioGroup> */}
                <Button
                  className="register_but"
                  variant="contained"
                  color="primary"
                  onClick={this.handleRegister}
                >
                  {this.context.t('get-started')}
                </Button>

                <div className="toggleText">
                  {this.context.t('already-have-an-account')}?
                  <Link to="/login">
                    <span className="goto_login">&nbsp;{this.context.t('login')}</span>
                  </Link>
                </div>
                {
                  <div className={validationStyle}>
                    <i className="fa fa-exclamation-triangle valid__icon" />
                    <p className="valid__text">
                      &nbsp;
                      {valid !== 0 && invalidMsg[valid - 1]}
                      {registerStatus && 'register success!'}
                    </p>
                  </div>
                }
              </div>
            </Grid>
            <Hidden only="xs">
              <Grid item xs={6}>
                <img src={Ellipse} alt="nugget" />
              </Grid>
            </Hidden>
          </Grid>
        )}
        {user === null && islogin && (
          <Grid
            sm={12}
            container
            direction="column"
            justify="center"
            alignItems="center"
            className="login_wrapper"
          >
            <Grid item sm={6}>
              <div className="login_form">
                <h1>
                  <strong>{this.context.t('employer-login')}</strong>
                </h1>
                <TextField
                  id="login_email"
                  label="Email"
                  className="text_field"
                  value={this.state.login_email}
                  onChange={this.handleChangeInfo('login_email')}
                  margin="normal"
                />
                <FormControl className={'text_field'}>
                  <InputLabel htmlFor="adornment-password">{this.context.t('password')}</InputLabel>
                  <Input
                    id="adornment-password"
                    className="password_field"
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.login_pwd}
                    onChange={this.handleChangeInfo('login_pwd')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                          onMouseDown={this.handleMouseDownPassword}
                        >
                          {this.state.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>

                <Button
                  className="register_but"
                  variant="contained"
                  color="primary"
                  onClick={this.handleSignin}
                >
                  {this.context.t('login')}
                </Button>

                <div className="toggleText">
                  {this.context.t('post-have-an-account')}?
                  <Link to="/">
                    <span>&nbsp;{this.context.t('register')}</span>
                  </Link>
                </div>

                {
                  <div className={validationStyle}>
                    <i className="fa fa-exclamation-triangle valid__icon" />
                    <p className="valid__text">
                      &nbsp;
                      {valid !== 0 && invalidMsg[valid - 1]}
                    </p>
                  </div>
                }
              </div>
            </Grid>

            <img className="bottomImg" src={bottom} alt="nugget" />
          </Grid>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  registerRequest: PropTypes.func.isRequired,
  loginRequest: PropTypes.func.isRequired,
  logoutRequest: PropTypes.func.isRequired,
  registerStatus: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  registerStatus: state.authReducer.registerStatus,
  isLoggedIn: state.authReducer.isLoggedIn,
  user: state.authReducer.user,
});

const mapDispatchToProps = {
  loginRequest,
  registerRequest,
  logoutRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
