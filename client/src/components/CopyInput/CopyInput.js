import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';
import copy from 'copy-to-clipboard';
import './CopyInput.scss';

class CopyInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      copied: false
    };
  }

  handleCopy = () => {
    copy(this.props.content);
    this.setState({ copied: true });
  }

  render() {
    const { copied } = this.state;
    const successStyle = copied === false ? 'validationTrue' : 'validationFalse';
    
    return (
      <div className='CopyInput'>
        <TextField
          value={this.props.content}
          id="bootstrap-input"
          InputProps={{
            disableUnderline: true,
            classes: {
              root: 'bootstrapRoot',
              input: 'bootstrapInput',
            },
          }}
          disabled
        />
        <Button 
          className="copy__button"
          onClick={this.handleCopy}
        >
          <i className="fa fa-copy"/>
        </Button>
        {
          <div className={successStyle}>
            <i className="fa fa-check-circle"></i>
          </div>
        }
      </div>
    );
  }
}

CopyInput.propTypes = {
  content: PropTypes.string,
  classes: PropTypes.object,
};

export default CopyInput;
