import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default class AssessmentCard extends Component {
  handleClick = (event) => {
    event.preventDefault();
    this.props.handleClick();
  }

  truncateDescription(text) {
    if (text.length >= 150) {
      return `${text.substring(0, 150)}...`;
    } 
    return text;
  }

  render() {
    const { imgSrc, title, description, selected } = this.props;
    const itemSel = selected ? 'item__selected' : 'item__nselected';
    const iconSel = `fa fa-check ${itemSel}`;
    return (
      <div className={`card ${itemSel}`} onClick={this.handleClick}>
        <div className="img-card" style={{ backgroundImage: `url(${imgSrc})`}}/>
        <i className={iconSel} />
        <p className='title'>
          {title}
        </p>
        <p className='description'>
          {this.truncateDescription(description)}
        </p>
      </div>
    );
  }
}

AssessmentCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  label: PropTypes.array,
  resources_title: PropTypes.string,
  resources_desc: PropTypes.string,
  url: PropTypes.string,
  sponsor: PropTypes.bool,
  status: PropTypes.bool,
  selected: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
};
