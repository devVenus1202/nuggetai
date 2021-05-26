import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Grid, Paper, InputBase, Typography, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import authAction from '../../redux/auth/actions';
import loginBack from '../../images/login/background.png';
import './ChangePassword.scss';
import Footer from '../../components/Footer/Footer';

const { changePassword } = authAction;

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

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      newpassword: '',
      confirmPassword: '',
      openError: false,
      error: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorMsg !== this.props.errorMsg && nextProps.errorMsg != '' && nextProps.errorMsg != null) {
      this.setState({
        openError: true,
        error: this.context.t(nextProps.errorMsg)
      });
    }
  }

  handleChangeInfo = (name) => (event) => {
    this.setState({ [name]: event.target.value, valid: 0 });
  };

  handleSubmit = () => {
    const { password, confirmPassword, newpassword } = this.state;
    const { changePassword } = this.props;
    if (password.length < 5) {
      this.setState({ openError: true, error: this.context.t('invalid-password') });
      return;
    }

    if (newpassword !== confirmPassword) {
      this.setState({ openError: true, error: this.context.t('password-not-match') });
      return;
    }
    changePassword({
      data: {
        password,
        newpassword
      }
    });
    this.setState({ openError: true, error: this.context.t('password-change') });
  };

  handleClose = () => {
    this.setState({ openError: false });
  };

  render() {
    const { password, newpassword, confirmPassword, openError, error } = this.state;
    const { loading, errorMsg } = this.props;
    return (
      <React.Fragment>
        <Grid className="password-reset-wrapper" container justify="center" alignItems="center">
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
                {this.context.t('change-your-password')}
              </Typography>
            </Grid>
            <Grid container spacing={8} className="inputs-wrapper">
              <Grid item xs={12} container>
                <Typography variant="label" component="label">
                  {this.context.t('current-password')}
                </Typography>
                <CustomInput
                  disabled={loading}
                  type="password"
                  value={password}
                  onChange={this.handleChangeInfo('password')}
                  helperText={this.context.t('current-password')}
                  placeholder={this.context.t('enter-your-password')}
                />
              </Grid>

              <Grid item xs={12} container>
                <Typography variant="label" component="label">
                  {this.context.t('new-password')}
                </Typography>
                <CustomInput
                  disabled={loading}
                  type="password"
                  value={newpassword}
                  onChange={this.handleChangeInfo('newpassword')}
                  helperText={this.context.t('new-password')}
                  placeholder={this.context.t('enter-your-password')}
                />
              </Grid>

              <Grid item xs={12} container>
                <Typography variant="label" component="label">
                  {this.context.t('confirm-password')}
                </Typography>
                <CustomInput
                  disabled={loading}
                  type="password"
                  value={confirmPassword}
                  onChange={this.handleChangeInfo('confirmPassword')}
                  helperText={this.context.t('confirm-password')}
                  placeholder={this.context.t('confirm-password')}
                />
              </Grid>

              <Grid item container xs={12} alignItems="center" justify="center">
                <Button
                  disabled={loading}
                  className="sign-in-btn"
                  onClick={this.handleSubmit}
                  variant="contained"
                  color="primary"
                >
                  {this.context.t('change-password')}
                </Button>
              </Grid>
            </Grid>
          </Paper>

          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            open={openError}
            autoHideDuration={3000}
            onClose={this.handleClose}
            ContentProps={{
              'aria-describedby': 'message-id'
            }}
            message={<span id="message-id">{error}</span>}
            action={[
              <IconButton key="close" aria-label="Close" color="inherit" onClick={this.handleClose}>
                <CloseIcon />
              </IconButton>
            ]}
          />
        </Grid>
      </React.Fragment>
    );
  }
}

ChangePassword.contextTypes = {
  t: PropTypes.func
};

ChangePassword.propTypes = {
  changePassword: PropTypes.func.isRequired,
  match: PropTypes.object,
  loading: PropTypes.bool,
  errorMsg: PropTypes.string
};

const mapStateToProps = (state) => ({
  loading: state.authReducer.loading,
  errorMsg: state.authReducer.errorMsg
});

const mapDispatchToProps = {
  changePassword
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
