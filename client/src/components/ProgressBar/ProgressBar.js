import React from 'react';
import PropTypes from 'prop-types';

import './ProgressBar.scss';
class ProgressBar extends React.Component {
  render() {
    const { value, type, height } = this.props;
    return (
      <div
        className={`progress-bar ${type}`}
        style={{ height: `${height}px` || '30px' }}
      >
        <Filler type={type || 'striped'} percentage={value} />
        <Percentage type={type || 'striped'} value={value} />
      </div>
    );
  }
}

const Filler = props => {
  return (
    <div
      className={`filler-${props.type}`}
      style={{ width: `${props.percentage}%` }}
    />
  );
};
const Percentage = props => {
  const { type, value } = props;
  const style = {};
  if (type === 'solid') {
    if (value < 96) {
      style.right = `calc(${100 - value}% - 40px)`;
    } else {
      style.right = '0';
    }
  }
  return (
    <div className={`${type}-label`} style={style}>
      <div>{value}%</div>
    </div>
  );
};

ProgressBar.defaultProps = {
  type: 'striped',
  height: '30',
};

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
};

export default ProgressBar;
