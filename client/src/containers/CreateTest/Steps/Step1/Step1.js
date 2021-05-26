import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from '@material-ui/core';
import './Step1.scss';
import academic from '../../../../images/academic.png';

export default class Step1 extends Component {
  handleSetPrebuilt = () => {
    this.props.setType(false);
  };

  handleSetCreate = () => {
    this.props.setType(true);
  };

  render() {
    return (
      <Grid container justify="center" className="stepCard">
        <Grid item xs={8}>
          <h2>{this.context.t('how-do-you-want-to-create')}</h2>
        </Grid>
        <Grid item xs={8}>
          <img className="image__content" src={academic} />
        </Grid>
        <Grid item xs={8}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSetPrebuilt}
          >
           {this.context.t('pre-built-assessment')}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSetCreate}
          >
            {this.context.t('create-your-own')}
          </Button>
        </Grid>
      </Grid>
    );
  }
}

Step1.contextTypes = {
  t: PropTypes.func,
};

Step1.propTypes = {
  setType: PropTypes.func.isRequired,
};
