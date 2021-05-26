import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
  Button,
  AppBar,
  Toolbar,
  Grid,
  IconButton,
  Typography,
  Fab,
} from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
// import { setLanguage } from 'redux-i18n';
import { getAvatarPath } from '../../utils/userUtil';
import Picture from '../../components/AvatarMini';
import DefaultAvatar from '../../images/characters/04-character.png';
import './Header.scss';
// import headerImage from '../../images/sandbox/top-right.png';
// import heroTopRight from '../../images/sandbox/top-right.png';
// import heroTopSmallRight from '../../images/sandbox/top-small-right.png';
// import heroCenter from '../../images/sandbox/center.png';
// import heroCenterB from '../../images/sandbox/center-b.png';
// import heroBottomLeft from '../../images/sandbox/bottom-left.png';
import rocket from '../../images/individual-result/rocket.png';
// import spFlag from '../../images/sp-flag.png';
// import usFlag from '../../images/us-flag.png';

// const flags = {
//   es: spFlag,
//   en: usFlag,
// };

class Header extends Component {
  constructor(props) {
    super(props);

    this.getHeader = this.getHeader.bind(this);
  }

  getHeader(route) {
    const { user, history } = this.props;

    switch (route) {
      case '/sandbox':
        return (
          <Grid className="sandbox-header" container alignItems="center">
            <Grid item md={12} className="titles-wrapper">
              <div>
                <Typography component="h1" variant="h3" gutterBottom>
                  {this.context.t('assess-learn-evolve')}
                </Typography>
                <Typography component="h5" variant="h5" paragraph>
                  {this.context.t('discover-your-soft-skills')}
                </Typography>
              </div>
            </Grid>
          </Grid>
        );

      case '/science':
        return (
          <Grid className="sandbox-header" container alignItems="center">
            <Grid item md={12} className="titles-wrapper">
              <div>
                <Typography component="h1" variant="h3" gutterBottom>
                  {this.context.t('assess-learn-evolve')}
                </Typography>
                <Typography component="h5" variant="h5" paragraph>
                  {this.context.t('discover-your-soft-skills')}
                </Typography>
              </div>
            </Grid>
          </Grid>
        );

      case '/res':
        return (
          <Grid
            className="individual-result-header"
            container
            justify="center"
            alignItems="center"
          >
            <div className="bg-fragments">
              <div className="half-r-frag-left" />
              <div className="half-t-frag-left" />
              <div className="rect-r-frag-left" />
              <div className="half-l-frag-left" />
              <div className="triangle-b-frag-left" />
              <div className="circle-frag-left" />
              <div className="triangle-t-frag-right" />
              <div className="rect-l-t-frag-right" />
              <div className="circle-frag-right" />
              <div className="rect-r-frag-right" />
              <div className="half-b-frag-right" />
              <div className="rect-l-frag-right" />
            </div>
            <Grid xs={12} className="rocket-img">
              <img src={rocket} alt="rocket" />
            </Grid>
            <Grid className="hero-text" xs={12}>
              <div>
                <Typography component="h1" variant="h3" gutterBottom>
                  {this.context.t('{name}-pam-beesly-youre-going-places', {
                    name: user.firstname,
                  })}
                </Typography>
                <Typography component="h5" variant="h5" paragraph>
                  {this.context.t('discover-nuggets-about-your-soft-skills')}
                </Typography>
              </div>
            </Grid>
            <Fab
              className="btn-back"
              aria-label="Back"
              elevation={0}
              size="small"
              onClick={() => history.goBack()}
            >
              <ArrowBack />
            </Fab>
          </Grid>
        );
    }
  }

  render() {
    const { user, history, i18nState } = this.props;
    return (
      <Grid>
        <AppBar className="AppBar" color="default" position="static">
          <Toolbar eventkey={0} isopen={user} className="navbarItem">
            <IconButton
              href="/"
              className="brand"
              color="inherit"
              aria-label="Logo"
            />
            <div className="nav__icons">
              {/* <div className="lang-selection">
                <Select
                  className="lang-select"
                  value={i18nState.lang}
                  onChange={event =>
                    this.props.dispatch(setLanguage(event.target.value))
                  }
                  renderValue={value => (
                    <Grid container alignItems="center" justify="center">
                      <img src={flags[value]} alt={value} /> &nbsp;&nbsp;
                      {value.toUpperCase()}
                    </Grid>
                  )}
                  input={<OutlinedInput />}
                >
                  <MenuItem value="es">ES</MenuItem>
                  <MenuItem value="en">EN</MenuItem>
                </Select>
              </div> */}
              {user && (
                <div className="profile__but" eventkey={6}>
                  <Button href="/setting" className="btn-name">
                    <Picture src={getAvatarPath(user.image) || DefaultAvatar} />
                    &nbsp; &nbsp;
                    <Typography noWrap>
                      <strong>
                        {this.context.t('hi-{name}', { name: user.firstname })}
                      </strong>
                    </Typography>
                    !
                  </Button>
                </div>
              )}
              {!user && (
                <Link to="/">
                  <Button className="register_but" eventkey={6}>
                    {this.context.t('register-login')}
                  </Button>
                </Link>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Grid container className="app-hero">
          {this.getHeader(history.location.pathname)}
        </Grid>
      </Grid>
    );
  }
}

Header.contextTypes = {
  t: PropTypes.func,
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  i18nState: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.authReducer.isLoggedIn,
  user: state.authReducer.user,
  i18nState: state.i18nState,
});

export default withRouter(
  connect(
    mapStateToProps,
    null,
  )(Header),
);
