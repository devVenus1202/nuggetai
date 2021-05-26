import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Countdown from 'react-countdown-now';
import './Timer.scss';

export default class Timer extends Component {
  static propTypes = {
    timerStarted: PropTypes.bool.isRequired,
    fullTime: PropTypes.number.isRequired,
    prefix: PropTypes.string,
    onFinish: PropTypes.func.isRequired,
    onRender: PropTypes.func,
  };

  static defaultProps = {
    prefix: '',
    onRender: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      completed: false,
    };
    let { fullTime } = props;
    if (fullTime === undefined) {
      fullTime = 30 * 60;
    }
    this.fullTime = fullTime * 1000;
    this.remainingSeconds = this.fullTime;
    this.currentStatus = false;
  }

  componentDidMount() {}

  shouldComponentUpdate(nextProps, nextState) {
    if (this.currentStatus) {
      return false;
    }
    return true;
  }

  renderer = ({ minutes, seconds, completed }) => {
    const { fire, onFire } = this.props;

    if (fire && Array.isArray(fire)) {
      fire.forEach(fireTime => {
        const pastTime = Number(60 * minutes) + Number(seconds);

        if (pastTime === fireTime) {
          if (onFire) {
            onFire();
          }
        }
      });
    }

    if (completed || this.completed) {
      // Render a completed state
      this.props.onFinish();
      this.props.onRender(this.fullTime / 1000, 0, 0);
      return <span>Finished</span>;
    } else {
      // Render a countdown
      this.props.onRender(this.fullTime / 1000, minutes, seconds);
      return (
        <span>
          {minutes} : {seconds}
        </span>
      );
    }
  };

  render() {
    const { timerStarted, prefix, isSubtracted } = this.props;
    this.currentStatus = timerStarted || isSubtracted;
    return (
      <div className={`timer  ${isSubtracted ? 'notice' : ''}`}>
        <p className={``}>
          {<span className="prefix-text">{prefix}</span>}
          {!timerStarted && <span>00:00</span>}
          {timerStarted && (
            <Countdown
              date={Date.now() + this.remainingSeconds}
              renderer={this.renderer}
            />
          )}
        </p>
      </div>
    );
  }
}
