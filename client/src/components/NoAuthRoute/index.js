import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect, compose } from 'react-redux';

class AuthRoute extends Route {
  componentDidMount() {
    if (this.props.authenticated) {
      this.props.history.push('/');
    }
  }

  render() {
    const { component: Component } = this.props;
    return <Component {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.authReducer.isLoggedIn,
  };
}

export default compose(
  connect(mapStateToProps),
  withRouter,
)(AuthRoute);
