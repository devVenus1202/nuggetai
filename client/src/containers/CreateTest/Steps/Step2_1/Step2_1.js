import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, TextField } from '@material-ui/core';
import ImageUploader from 'react-images-upload';
import './Step2_1.scss';

const invalidMsg = [
  'Please type Assessent Name!',
  'Please type Assessment Description!',
  'Please type Valid timer!',
];

export default class Step2_1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: 0,
      testName: '',
      testDesc: '',
      timer: '',
      formerrors: {},
      image: null,
    };
  }

  handleContinue = () => {
    // form validation
    const errors = {};
    const { testName, testDesc, timer, image } = this.state;

    if (testName.length === 0) {
      this.setState({ valid: 1 });
      return;
    }

    if (testDesc.length === 0) {
      this.setState({ valid: 2 });
      return;
    }

    if (isNaN(timer)) {
      this.setState({ valid: 3 });
      return;
    }

    const timerValue = Number(timer);
    this.props.onSetTestInfo(testName, testDesc, timerValue, image);
    this.props.handleNext();
  };

  handleCancel = () => {
    this.props.handlePrev();
  };

  handleChangeTestInfo = name => event => {
    this.setState({ [name]: event.target.value, valid: 0 });
  };

  onDrop = image => {
    this.setState({ image });
  }

  render() {
    const { valid } = this.state;
    const validationStyle = valid ? 'validationFalse' : 'validationTrue';
    return (
      <Grid container justify="center" className="stepCard">
        <Grid item xs={8}>
          <h2>{this.context.t('customize-your-assessment')}</h2>
          <p>{this.context.t('control-assessment')}</p>
        </Grid>
        <Grid item xs={8} className="form">
          <div className="tabitem">
            <div className="testinfo">
              <TextField
                id="testname"
                label="{this.context.t('assessment-name')}"
                value={this.state.testName}
                onChange={this.handleChangeTestInfo('testName')}
                margin="normal"
              />
              <br />
              <TextField
                id="testdesc"
                className="test__desc"
                label="{this.context.t('assessment-description')}"
                value={this.state.testDesc}
                onChange={this.handleChangeTestInfo('testDesc')}
                margin="normal"
                multiline
              />
            </div>
            <div className="select_timer">
              <TextField
                id="timer"
                label="{this.context.t('input-timer')}"
                value={this.state.timer}
                onChange={this.handleChangeTestInfo('timer')}
                margin="normal"
              />
            </div>
            <div className="image-uploader">
              <ImageUploader
                withIcon={true}
                withPreview={true}
                label = "{this.context.t('upload-image-challenge')}!"
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={1000000}
                fileSizeError="file size is too big, limit is 1MB"
                singleImage
              />
            </div>
          </div>
          {
            <div className={validationStyle}>
              <i className="fa fa-exclamation-triangle valid__icon" />
              <p className="valid__text">
                &nbsp;
                {valid !== 0 && invalidMsg[valid - 1]}
              </p>
            </div>
          }
        </Grid>
        <Grid item xs={8}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleContinue}
          >
            Continue
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleCancel}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    );
  }
}

Step2_1.propTypes = {
  handlePrev: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  onSetTestInfo: PropTypes.func.isRequired,
};
