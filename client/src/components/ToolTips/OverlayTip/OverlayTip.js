import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import styles from './OverlayTip.scss';

class OverlayTip extends Component {
  render() {
    const { text, direction } = this.props;
    const tooltip = (
      <Tooltip id="tooltip">
        {text}
      </Tooltip>
    );

    return (
      <div className={styles.tip__container}>
        <OverlayTrigger placement={direction} overlay={tooltip}>
          <i className="fa fa-question-circle fa-0.5x" />
        </OverlayTrigger>
      </div>
    );
  }
}

OverlayTip.propTypes = {
  text: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
};

export default OverlayTip;
