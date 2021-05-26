import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Prompt, withRouter } from 'react-router';
import { connect } from 'react-redux';
import {
  withStyles,
  Grid,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Tabs,
  Tab,
} from '@material-ui/core';

import Timer from '../../components/Timer/Timer';

import challengeActions from '../../redux/challenge/actions';
import resultActions from '../../redux/result/actions';

import './Preview.scss';

const { getChallenge } = challengeActions;
const { addResult, sendEvent, storeTestData } = resultActions;

const tabClasses = theme => ({
  tabsRoot: {
    borderBottom: '1px solid #e8e8e8',
  },
  tabsIndicator: {
    backgroundColor: '#dd628f',
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    fontWeight: 'light',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#dd628f',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#dd628f',
      fontWeight: 'bold',
    },
    '&:focus': {
      color: '#dd628f',
    },
  },
});

class Preview extends Component {
  static propTypes = {
    prop: PropTypes,
  };
  constructor(props) {
    super(props);
    this.state = {
      testStarted: true,
    };
  }

  handleCountTimer = (fullTime, minutes, seconds) => {
    this.fullTime = fullTime;
    this.minutes = minutes;
    this.seconds = seconds;
    this.setState({
      timerMinutes: minutes,
      timerSeconds: seconds,
    });
  };

  render() {
    let fullTime = 20;
    return (
      <div>
        <React.Fragment>
          <Grid container>
            <Grid item xs={12}>
              <div className={`previewHeaderContainer`}>
                <Grid container>
                  <Grid item md={6} xs={6}>
                    <div className="logo__img" />
                  </Grid>
                  <div className="header-right-section">
                    <div className="tour-step-6 header-right-items">
                      <Button
                        className="submit__button"
                        variant="outlined"
                        color="primary"
                        onClick={this.handleClickFinish}
                      >
                        {this.context.t('skip')}
                      </Button>
                      <Button
                        className="submit__button"
                        variant="contained"
                        color="primary"
                        onClick={this.handleClickFinish}
                      >
                        <span className="timer-caption"> {this.context.t('preview-mode')}</span>

                        <Timer
                          fullTime={fullTime}
                          onFinish={this.handleFinishTest}
                          onRender={this.handleCountTimer}
                          fire={[300, 120, 30]}
                          onFire={this.openTimerModal}
                          timerStarted={this.state.testStarted}
                          key={this.state.testStarted}
                        />
                      </Button>
                    </div>
                  </div>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </React.Fragment>
      </div>
    );
  }
}

Preview.contextTypes = {
  t: PropTypes.func,
};

const mapStateToProps = state => ({
  user: state.authReducer.user,
  result: state.resultReducer.result,
  challenge: state.challengeReducer.curChallenge,
  curCandidate: state.candidateReducer.curCandidate,
  i18nState: state.i18nState,
});

const mapDispatchToProps = {
  getChallenge,
  addResult,
  sendEvent,
  storeTestData,
};

export default withRouter(
  withStyles(tabClasses)(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(Preview),
  ),
);
