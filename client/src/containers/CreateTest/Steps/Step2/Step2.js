import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tags from 'react-tagging-input';
import 'react-tagging-input/dist/styles.css';
import {
  Grid,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';
import './Step2.scss';

class Step2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: 0,
      tags: ['Google', 'Blockchain'],
      formerror: ' ',
      role: '',
      position: '',
    };
  }

  onTagAdded = tag => {
    this.setState({
      tags: [...this.state.tags, tag],
    });
  };

  onTagRemoved = (tag, index) => {
    this.setState({
      tags: this.state.tags.filter((tag, i) => i !== index) // eslint-disable-line
    });
  };

  handleContinue = () => {
    const { role, position, tags } = this.state;

    if (role === '') {
      this.setState({ valid: 1 });
      return;
    }

    if (position === '') {
      this.setState({ valid: 2 });
      return;
    }

    const { setRoleAndPosition, setKeywords, handleNext } = this.props;
    setRoleAndPosition({ role, position: position });
    setKeywords(tags);
    handleNext();
  };

  handleCancel = () => {
    this.props.handlePrev();
  };

  handleRoleSelect = event => {
    event.preventDefault();
    this.setState({ role: event.target.value });
  };

  handlePositionSelect = event => {
    event.preventDefault();
    this.setState({ position: event.target.value });
  };

  render() {
    const { valid } = this.state;
    const validationStyle = valid ? 'validationFalse' : 'validationTrue';
    const invalidMsg = [this.context.t('please-select-role-type'), this.context.t('please-select-position-type')];

    return (
      <Grid container justify="center" className="stepCard">
        <Grid item xs={8}>
          <h2>{this.context.t('what-are-you-hiring-for')}</h2>
          <p>{this.context.t('help-us-define-your-role')}.</p>
        </Grid>
        <Grid item xs={8} className="form">
          <div />
          <div>
            <FormControl className="selector__control">
              <InputLabel htmlFor="role-simple">{this.context.t('role-type')}</InputLabel>
              <Select
                value={this.state.role}
                onChange={this.handleRoleSelect}
                inputProps={{
                  name: 'role',
                  id: 'role-simple',
                }}
              >
                <MenuItem value="">
                  <em>{this.context.t('none')}</em>
                </MenuItem>
                <MenuItem value="1">{this.context.t('marketing')}</MenuItem>
                <MenuItem value="2">{this.context.t('customer-service')}</MenuItem>
                <MenuItem value="3">{this.context.t('sales')}</MenuItem>
                <MenuItem value="4">{this.context.t('product-management')}</MenuItem>
                <MenuItem value="5">{this.context.t('business-management')}</MenuItem>
                <MenuItem value="6">{this.context.t('business-strategy')}</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl className="selector__control">
              <InputLabel htmlFor="level-simple">{this.context.t('position-type')}</InputLabel>
              <Select
                value={this.state.position}
                onChange={this.handlePositionSelect}
                inputProps={{
                  name: 'level',
                  id: 'level-simple',
                }}
              >
                <MenuItem value="">
                <em>{this.context.t('none')}</em>
                </MenuItem>
                <MenuItem value={1}>{this.context.t('co-op-internship')}</MenuItem>
                <MenuItem value={2}>{this.context.t('entry-level')}</MenuItem>
                <MenuItem value={3}>{this.context.t('junior-manager')}</MenuItem>
                <MenuItem value={4}>{this.context.t('middle-manager')}</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="keyword__tag">
            <Tags
              tags={this.state.tags}
              placeholder={this.context.t('add-the-keywords')}
              onAdded={this.onTagAdded}
              onRemoved={this.onTagRemoved}
              uniqueTags
            />
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
            onClick={() => this.handleContinue()}
          >
            {this.context.t('continue')}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleCancel}
          >
            {this.context.t('cancel')}
          </Button>
        </Grid>
      </Grid>
    );
  }
}


Step2.contextTypes = {
  t: PropTypes.func,
};

Step2.propTypes = {
  handlePrev: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  setKeywords: PropTypes.func.isRequired,
  setRoleAndPosition: PropTypes.func.isRequired,
};

export default Step2;

