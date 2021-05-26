import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
  Grid, 
  Button, 
} from "@material-ui/core";
import CopyInput from '../../../../components/CopyInput';
import './StepFinal.scss';

export default class StepFinal extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  handleChangeTimer = event => {
    this.setState({ timer: event.target.value });
  }

  render() {
    const { testId } = this.props;
    const URL = `${window.location.host}/enter/${testId}`;
    const route = `results/${testId}`;
    return (
      <Grid container justify="center" className="stepCard">
        <Grid item xs={8}>
          <h2>{this.context.t('customize-your-assessment')}</h2>
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

StepFinal.propTypes = {
  testId: PropTypes.number.isRequired,
  handlePrev: PropTypes.func.isRequired,
  handleLaunch: PropTypes.func.isRequired,
  routeParams: PropTypes.object.isRequired,
};
