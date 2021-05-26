import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../../utils/localStorageUtil';

class VerifyRoot extends Route {
  render() {
    const { component: Component, authenticated } = this.props;
    const user = getUser();
    return !authenticated ? (
      <Redirect to="/login" />
    ) : !user.isVerified ? (
      <Redirect to="/verify-email" />
    ) : (
      <Component {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.authReducer.isLoggedIn,
    user: state.authReducer.user,
  };
}

export default connect(mapStateToProps)(VerifyRoot);
