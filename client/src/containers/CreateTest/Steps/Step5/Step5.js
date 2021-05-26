import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from '@material-ui/core';
import CopyInput from '../../../../components/CopyInput';
import './Step5.scss';

export default class Step5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { testId } = this.props;
    const URL = `${window.location.host}/enter/${testId}`;
    const route = `results/${testId}`;
    return (
      <Grid container justify="center" className="stepCard">
        <Grid item xs={8}>
          <h2>{this.context.t('create-your-benchmark')}</h2>
          <p>{this.context.t('create-a-benchmark-by-sending')}. 
          <br/>{this.context.t('share-the-link-below')}.</p>
        </Grid>
        <Grid 
          item 
          xs={8} 
          className='form'
        >
          <div className="copylink__wrapper">
            <CopyInput content={URL} />
          </div>
        </Grid>
        <Grid item xs={8}>
          <Button 
            variant="contained"
            color="primary"
            onClick={() => { this.props.handleLaunch(route); }}
          >
            {this.context.t('launch')}
          </Button>
          <Button 
            variant="contained"
            color="primary"
            onClick={() => { this.props.handlePrev(); }}
          >
            {this.context.t('cancel')}
          </Button>
      </Grid>
    </Grid>
    );
  }
}

Step5.contextTypes = {
  t: PropTypes.func,
};


Step5.propTypes = {
  handleLaunch: PropTypes.func.isRequired,
  handlePrev: PropTypes.func.isRequired,
  testId: PropTypes.number.isRequired,
};
