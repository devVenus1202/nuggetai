import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class AuthRoute extends Route {
  render() {
    const { component: Component, authenticated, user } = this.props;
    return !authenticated ? (
      <Redirect to="/login" />
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

export default connect(mapStateToProps)(AuthRoute);
