import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from '@material-ui/core';
import AssessmentCard from '../../../../components/AssessmentCard';
import { items } from '../data';
import { SERVER_URL } from '../../../../constants/config';
import './Step3.scss';

const activeItems = items.filter(i => i.active);

export default class Step3 extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      selection: -1,
      valid: true,
    };
  }

  handleClick(index) {
    this.setState({ selection: index, valid: true });
    this.props.handleChange(index);
  }
  
  handleCancel = () => {
    this.props.handlePrev();
  }

  handleNext = () => {
    const { selection } = this.state;
    if (selection === -1) {
      this.setState({ valid: false });
      return;
    }
    this.props.handleNext();
  }

  render() {
    const { selection, valid } = this.state;
    const validationStyle = valid ? 'validationTrue' : 'validationFalse';
    return (
      <Grid container justify="center" className="stepCard">
        <Grid item xs={8}>
          <h2>{this.context.t('select-an-assessment')}</h2>
          <p>{this.context.t('select-from-pre-built')}</p>
          <br/><br/>
        </Grid>
        <Grid
          xs={12} 
          className='items'
          container
          spacing={24}
        >
          { activeItems.map((item, index) => {
            const thumbnail = require(`../../../../images/challenges/${item.imgSrc}`);

            if (index === selection) {
              return (
                <Grid
                  item
                  xs={4}
                  key={index}
                >
                  <AssessmentCard
                    imgSrc={thumbnail}
                    title={this.context.t(item.title)}
                    description={this.context.t(item.description)}
                    handleClick={() => this.handleClick(index)}
                    selected                    
                  />
                </Grid>
              );
            }
            return (
              <Grid
                item
                xs={4}
                key={index}
              >
                <AssessmentCard
                  imgSrc={thumbnail}
                  title={this.context.t(item.title)}
                  description={this.context.t(item.description)}
                  handleClick={() => this.handleClick(index)}
                />
              </Grid>
            );
          })}
        </Grid>
        <br/><br/>
        <Grid item xs={8} className="alert__msg">
          {
            <div className={validationStyle}>
              <i className="fa fa-exclamation-triangle"></i>
              <span>&nbsp;{this.context.t('please-select-the-assessment')}</span>
            </div>
          }
        </Grid>
        <Grid item xs={8}>
            <Button 
              variant="contained"
              color="primary"
              onClick={this.handleNext}
            >
              {this.context.t('continue')}
            </Button>
            <Button 
              variant="contained"
              color="primary"
              onClick={this.handleCancel}
            >
               {this.context.t('cancel')}
            </Button>
        </Grid>
      </Grid>
    );
  }
}

Step3.contextTypes = {
  t: PropTypes.func,
};


Step3.propTypes = {
  handlePrev: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

