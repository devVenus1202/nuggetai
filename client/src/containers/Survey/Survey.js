import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Button,
  OutlinedInput,
  Select,
  MenuItem,
  FormControl,
  Typography,
  Divider,
  Snackbar,
  Link,
} from '@material-ui/core';

import candidateActions from '../../redux/candidate/actions';

import './Survey.scss';

const { updateCandidate } = candidateActions;

const invalidMsg = [
  'How likely are you to recommend this assessment to a friend of colleague?',
  'What did you think of the content of this challenge?',
];

class Survey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // valid: 0,
      recommendScore: '',
      reasonRecommendScore: '',
      contentScore: '',
      reasonContentScore: '',
      feedback: '',
      emailAddress: '',
      snackBarOpen: false,
    };
    this.snackBarQueue = [];
  }

  handleChangeInfo = name => event => {
    this.setState({
      [name]: event.target.value,
      // valid: 0,
    });
  };

  handleSend = () => {
    //const valid = this.validateForm();
    // if (!valid) {
    //   return;
    // }

    const { challengeId, pipelineId, userId } = this.props.match.params;
    const { updateCandidate } = this.props;

    const {
      recommendScore,
      reasonRecommendScore,
      contentScore,
      reasonContentScore,
      feedback,
      emailAddress,
    } = this.state;

    const data = {
      recommendScore,
      reasonRecommendScore,
      contentScore,
      reasonContentScore,
      feedback,
      emailAddress,
    };
    this.setState({ snackBarOpen: true });

    updateCandidate({
      challengeId,
      pipelineId,
      userId,
      data,
    });

    // this.props.history.push(
    //   `/candidatelogin/${challengeId}/${pipelineId}/${userId}`,
    // );
  };

  handleGotoSandbox = () => {
    window.open(`https://sandbox.nuggetai.com`);
  };

  validateForm = () => {
    const { recommendScore, contentScore } = this.state;

    if (!recommendScore) {
      this.setState({ valid: 1 });
      return false;
    } else if (!contentScore) {
      this.setState({ valid: 2 });
      return false;
    }

    return true;
  };

  processQueue = () => {
    if (this.snackBarQueue.length > 0) {
      this.setState({
        snackBarMessageInfo: this.snackBarQueue.shift(),
        snackBarOpen: true,
      });
    }
  };

  handleSnackBarClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackBarOpen: false });
    // const { challengeId, pipelineId, userId } = this.props.match.params;
    // this.props.history.push(
    //   `/candidatelogin/${challengeId}/${pipelineId}/${userId}`,
    // );
  };

  handleReturnToBack = () => {
    const { challengeId, pipelineId, userId } = this.props.match.params;

    this.props.history.push(
      `/information/${challengeId}/${pipelineId}/${userId}`,
    );
  };

  render() {
    // const { valid } = this.state;
    // const validationStyle = valid === 0 ? 'validationTrue' : 'validationFalse';

    return (
      <div className="candidate-info-container">
        <div className="candidate-header-container">
          <div className="survey-logo-image" />
        </div>

        <div className="feedback_form">
          <React.Fragment>
            <Typography className="feedback_form_header" component="div">
              {this.context.t('tell-us-about-yourself')}
            </Typography>
            <Typography className="feedback_form_description" component="div">
              {this.context.t('tell-us-about-yourself-description')}
            </Typography>
            {/* <Typography className="feedback_form_note" component="div">
              {this.context.t('we-want-your-feedback-note')}
            </Typography> */}
          </React.Fragment>

          <React.Fragment>
            <div className="previous_link_form">
              <Link
                className="return_button"
                href="#"
                onClick={this.handleReturnToBack}
              >
                Back to previous section
              </Link>
            </div>
            <FormControl variant="outlined" className="text_field">
              <Typography component="div" className="form-control-label">
                {this.context.t('how-this-assessment-colleague')}
              </Typography>
              <Select
                className="text_field"
                value={this.state.recommendScore}
                onChange={this.handleChangeInfo('recommendScore')}
                input={
                  <OutlinedInput
                    name="recommend"
                    placeholder=""
                    id="recommend-customized-select"
                  />
                }
              >
                <MenuItem value={'1'}>1</MenuItem>
                <MenuItem value={'2'}>2</MenuItem>
                <MenuItem value={'3'}>3</MenuItem>
                <MenuItem value={'4'}>4</MenuItem>
                <MenuItem value={'5'}>5</MenuItem>
                <MenuItem value={'6'}>6</MenuItem>
                <MenuItem value={'7'}>7</MenuItem>
              </Select>
            </FormControl>
            <br />
            <FormControl variant="outlined" className="text_field">
              <Typography component="div" className="form-control-label">
                {this.context.t('above-score-reason')}
              </Typography>
              <OutlinedInput
                className="text_field"
                value={this.state.reasonRecommendScore}
                onChange={this.handleChangeInfo('reasonRecommendScore')}
                name="reasonRecommendScore"
                variant="outlined"
                type="text"
                placeholder="Please type here..."
              />
            </FormControl>
            <br />
            <FormControl variant="outlined" className="text_field">
              <Typography component="div" className="form-control-label">
                {this.context.t('what-think-content-of-challenge')}
              </Typography>
              <Select
                className="text_field"
                value={this.state.contentScore}
                onChange={this.handleChangeInfo('contentScore')}
                input={
                  <OutlinedInput
                    name="content-score"
                    placeholder=""
                    id="content-score-customized-select"
                  />
                }
              >
                <MenuItem value={'1'}>1</MenuItem>
                <MenuItem value={'2'}>2</MenuItem>
                <MenuItem value={'3'}>3</MenuItem>
                <MenuItem value={'4'}>4</MenuItem>
                <MenuItem value={'5'}>5</MenuItem>
                <MenuItem value={'6'}>6</MenuItem>
                <MenuItem value={'7'}>7</MenuItem>
              </Select>
            </FormControl>
            <br />
            <FormControl variant="outlined" className="text_field">
              <Typography component="div" className="form-control-label">
                {this.context.t('above-score-reason')}
              </Typography>
              <OutlinedInput
                className="text_field"
                value={this.state.reasonContentScore}
                onChange={this.handleChangeInfo('reasonContentScore')}
                name="reasonContentScore"
                variant="outlined"
                placeholder="Please type here..."
                type="text"
              />
            </FormControl>
            <br />
            <FormControl variant="outlined" className="text_field">
              <Typography component="div" className="form-control-label">
                {this.context.t('additional-feedback-to-product-team')}
              </Typography>
              <textarea
                className="feedback_area"
                value={this.state.feedback}
                onChange={this.handleChangeInfo('feedback')}
                placeholder="Please type here..."
              />
            </FormControl>
            {/* <FormControl variant="outlined" className="text_field">
              <Typography component="div" className="form-control-label">
                {this.context.t('enter-your-email-address')}
              </Typography>
              <OutlinedInput
                className="text_field"
                value={this.state.emailAddress}
                onChange={this.handleChangeInfo('emailAddress')}
                name="email"
                variant="outlined"
                type="email"
              />
            </FormControl> */}
            {/* <div className={validationStyle}>
              <i className="fa fa-exclamation-triangle valid__icon" />
              <p className="valid__text">
                &nbsp;
                {valid !== 0 && invalidMsg[valid - 1]}
              </p>
            </div> */}
            <Button
              className="continue-btn"
              variant="contained"
              color="secondary"
              onClick={this.handleSend}
            >
              {this.context.t('finish')}
            </Button>
            <hr className="line_break" />
            <Button
              className="continue-btn-sandbox"
              variant="contained"
              onClick={this.handleGotoSandbox}
            >
              {this.context.t('login to sandbox')}
            </Button>
          </React.Fragment>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          autoHideDuration={4000}
          open={this.state.snackBarOpen}
          onClose={this.handleSnackBarClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={
            <span id="message-id">{this.context.t('success-redirect')} </span>
          }
        />
      </div>
    );
  }
}

Survey.contextTypes = {
  t: PropTypes.func,
};

Survey.propTypes = {
  updateCandidate: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  match: PropTypes.shape({
    params: {
      challengeId: PropTypes.string.isRequired,
      pipelineId: PropTypes.string.isRequired,
    },
  }),
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  updateCandidate,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Survey),
);
