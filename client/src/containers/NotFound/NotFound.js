import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Footer from '../../components/Footer/Footer';
import './NotFound.scss';
import { Grid, Typography, Button } from '@material-ui/core';
import img from '../../images/404.png';

class NotFound extends React.Component {
  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Grid className="not-found" container spacing={40}>
          <Grid item xs={6}>
            <img src={img} alt="nugget.ai page not found" />
          </Grid>
          <Grid item sm={5} xs={6} className="text">
            <Typography component="h2" variant="h2" gutterBottom>
              {this.context.t('whoops')}
            </Typography>
            <Typography component="h7" variant="h7" gutterBottom>
              {this.context.t('404-message')}
            </Typography>
            <Button href={'/'} variant="contained" color="secondary">
              {this.context.t('take-me-home')}
            </Button>
          </Grid>
        </Grid>
        <Footer />
      </div>
    );
  }
}

NotFound.contextTypes = {
  t: PropTypes.func
};

NotFound.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.authReducer.isLoggedIn
});

export default connect(mapStateToProps)(NotFound);
