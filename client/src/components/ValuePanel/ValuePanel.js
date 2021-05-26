import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ValuePanel.scss';

export default class ValuePanel extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    value: PropTypes.oneOfType(PropTypes.number, PropTypes.string),
  };

  render() {
    const {
      title,
      description,
      value,
    } = this.props;

    return (
      <div className="value-panel-wrapper">
        <div className="value-panel-info">
          <h3>{title}</h3>
          <span>{description}</span>
        </div>
        <div className="value-panel-data">
          <span>{value}</span>
        </div>
      </div>
    );
  }
}
