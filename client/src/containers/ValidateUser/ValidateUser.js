import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './ValidateUser.scss';
import { Grid, Paper, Typography, CircularProgress } from '@material-ui/core';
import authAction from '../../redux/auth/actions';
import loginBack from '../../images/login/background.png';

const { validateUser } = authAction;

class ValidateUser extends Component {
  componentDidMount() {
    const { match, validateUser } = this.props;
    validateUser({ token: match.params.token });
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.user && this.props.user) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    const { errorMsg } = this.props;
    console.log(errorMsg);
    return (
      <React.Fragment>
        <Grid
          className="validate-main"
          container
          justify="center"
          alignItems="flex-start"
        >
          <img className="back-image" src={loginBack} alt="" />

          <Paper elevation={0} className="verify_form">
            <Grid
              xs={12}
              container
              justify="flex-start"
              alignItems="center"
              className="verify_header"
            >
              <Typography variant="h5" component="h5">
                {this.context.t('verify-email-title')}
              </Typography>
            </Grid>
            <React.Fragment>
              <Grid container spacing={8} className="inputs-wrapper">
                <Grid item xs={12} container>
                  <Typography variant="label" component="label">
                    {errorMsg ? this.context.t(errorMsg) : <CircularProgress />}
                  </Typography>
                </Grid>
              </Grid>
            </React.Fragment>
          </Paper>
        </Grid>
      </React.Fragment>
    );
  }
}

ValidateUser.contextTypes = {
  t: PropTypes.func,
};

ValidateUser.propTypes = {
  user: PropTypes.object,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  validateUser: PropTypes.func.isRequired,
  errorMsg: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  loading: state.authReducer.loading,
  errorMsg: state.authReducer.errorMsg,
});

const mapDispatchToProps = {
  validateUser,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ValidateUser),
);
