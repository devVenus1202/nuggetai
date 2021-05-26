import React, { Component } from 'react';
import { range as _range } from 'lodash';
import PropTypes from 'prop-types';
import Steps, { Step } from 'rc-steps';
import './Stepindicator.scss';
export default class StepIndicator extends Component {
  render() {
    const { current, count, direction, contents } = this.props;

    return (
      <Steps current={current} direction={direction}>
        {_range(0, count).map(index => (
          <Step key={index} {...this.props} description={contents[index] || index + 1} />
        ))}
      </Steps>
    );
  }
}

StepIndicator.defaultProps = {
  direction: 'horizontal',
  contents: [],
};

StepIndicator.propTypes = {
  current: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  direction: PropTypes.string,
  contents: PropTypes.array,
};
