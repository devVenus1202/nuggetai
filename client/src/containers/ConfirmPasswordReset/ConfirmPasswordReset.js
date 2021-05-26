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
import './ConfirmPasswordReset.scss';
import Footer from '../../components/Footer/Footer';


const {
  changePassword,
} = authAction;


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
      password: '',
      confirmPassword: '',
      openError: false,
      error: '',
    };
  }


  handleChangeInfo = name => event => {
    this.setState({ [name]: event.target.value, valid: 0 });
  };

  handleSubmit = () => {
    const { password, confirmPassword } = this.state;
    const { changePassword, match } = this.props;
    if (password.length < 5) {
      this.setState({ openError: true, error: this.context.t('invalid-password') });
      return;
    }

    if (password !== confirmPassword) {
      this.setState({ openError: true, error: this.context.t('password-not-match') });
      return;
    }
    changePassword({ data: { password }, token: match.params.token });
  }

  handleClose = () => {
    this.setState({ openError: false });
  }

  render() {

    const { password, confirmPassword, openError, error } = this.state;
    const { loading } = this.props;

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
                {this.context.t('create-new-password')}
              </Typography>
            </Grid>
            <Grid container spacing={8} className="inputs-wrapper">
              <Grid item xs={12} container>
                <Typography variant="p" component="p">
                  {this.context.t('create-new-password-info')}
                </Typography>
              </Grid>

              <Grid item xs={12} container>
                <Typography variant="label" component="label">
                  {this.context.t('new-password')}
                </Typography>
                <CustomInput
                  disabled={loading}
                  type="password"
                  value={password}
                  onChange={this.handleChangeInfo('password')}
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
  changePassword: PropTypes.func.isRequired,
  match: PropTypes.object,
  loading: PropTypes.bool,
};

const mapStateToProps = state => ({
  loading: state.authReducer.loading,
});

const mapDispatchToProps = {
  changePassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);
