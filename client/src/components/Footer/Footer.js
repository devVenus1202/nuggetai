import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { Typography, Grid } from '@material-ui/core';
import logo from '../../images/logo-footer.png';
import './Footer.scss';

class Footer extends Component {
  render() {
    return (
      <footer>
        {/* <Grid
          container
          justify="center"
          xs={12}
          direction="row"
          alignItems="center"
        > */}
          {/* <a  href="/sandbox" className="science-link">SANDBOX</a> */}
          {/* <a href="/science" className="science-link">
            {this.context.t('our-science').toUpperCase()}
          </a>
          <Typography
            variant="subtitle1"
            align="center"
            component="p"
            className="assessment-count"
          >
            {this.context.t('{number}-assessments-take-so-far', {
              number: '1,500',
            })}
          </Typography>
        </Grid> */}
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          className="logo-footer"
          xs={12}
        >
          <a href="/">
            <img src={logo} alt="nugget.ai icon" />
          </a>
          <span>{this.context.t('built-with-love-in-toronto')}</span>
        </Grid>
      </footer>
    );
  }
}

Footer.contextTypes = {
  t: PropTypes.func,
};

export default Footer;
