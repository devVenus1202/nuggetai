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
} from '@material-ui/core';

import candidateActions from '../../redux/candidate/actions';
import './CEnterInfo.scss';

const { updateCandidate } = candidateActions;

const invalidMsg = [
  'Age field is required!',
  'Gender field is required!',
  'Ethnicity field is required!',
  'Martial field is required!',
  'Degree field is required!',
  'Employment field is required!',
];

class CEnterInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: 0,
      age: '',
      gender: '',
      ethnicity: '',
      marital: '',
      degree: '',
      employment: '',
    };
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    const { curCandidate } = nextProps;
    if (curCandidate) {
      const {
        age,
        gender,
        ethnicity,
        marital,
        degree,
        employment,
      } = curCandidate;
      this.setState({ age, gender, ethnicity, marital, degree, employment });
    }
  }
  handleChangeInfo = name => event => {
    this.setState({
      [name]: event.target.value,
      // valid: 0,
    });
  };

  handleNext = () => {
    // const valid = this.validate();

    // if (!valid) {
    //   return;
    // }

    this.handleUpdate();
  };

  validate = () => {
    const { age, gender, ethnicity, marital, degree, employment } = this.state;

    if (!age) {
      this.setState({ valid: 1 });
      return false;
    } else if (!gender) {
      this.setState({ valid: 2 });
      return false;
    } else if (!ethnicity) {
      this.setState({ valid: 3 });
      return false;
    } else if (!marital) {
      this.setState({ valid: 4 });
      return false;
    } else if (!degree) {
      this.setState({ valid: 5 });
      return false;
    } else if (!employment) {
      this.setState({ valid: 6 });
      return false;
    }

    return true;
  };

  handleUpdate = () => {
    const { challengeId, pipelineId, userId } = this.props.match.params;
    const { updateCandidate } = this.props;
    const { age, gender, ethnicity, marital, degree, employment } = this.state;

    const data = {
      age,
      gender,
      ethnicity,
      marital,
      degree,
      employment,
    };

    updateCandidate({
      challengeId,
      pipelineId,
      userId,
      data,
    });

    this.props.history.push(`/survey/${challengeId}/${pipelineId}/${userId}`);
  };

  backToChallenge = event => {
    this.props.history.push(`/login`);
  };

  render() {
    // const { valid } = this.state;
    // const validationStyle = valid === 0 ? 'validationTrue' : 'validationFalse';
    const { curCandidate = {} } = this.props;
    console.log(curCandidate);
    return (
      <div className="candidate-info-container">
        <div className="candidate-header-container">
          <div className="info-logo-image" />
        </div>

        <div className="login_form">
          <React.Fragment>
            <Typography className="login_form_header" component="div">
              {this.context.t('tell-us-about-yourself')}
            </Typography>
            <Typography className="login_form_description" component="div">
              {this.context.t('tell-us-about-yourself-description')}
            </Typography>
          </React.Fragment>

          <React.Fragment>
            <FormControl variant="outlined" className="text_field">
              <Typography component="div" className="form-control-label">
                {this.context.t('age')}
              </Typography>
              <OutlinedInput
                className="text_field"
                value={this.state.age}
                onChange={this.handleChangeInfo('age')}
                name="age"
                id="age-customized-select"
                variant="outlined"
                type="number"
                defaultValue={curCandidate ? curCandidate.age : ''}
              />
            </FormControl>

            <FormControl variant="outlined" className="text_field">
              <Typography component="div" className="form-control-label">
                {this.context.t('gender')}
              </Typography>
              <Select
                className="text_field"
                value={this.state.gender}
                onChange={this.handleChangeInfo('gender')}
                input={
                  <OutlinedInput
                    name="gender"
                    placeholder="Gender"
                    id="age-customized-select"
                  />
                }
              >
                <MenuItem value={'male'}>{this.context.t('male')}</MenuItem>
                <MenuItem value={'female'}>{this.context.t('female')}</MenuItem>
                <MenuItem value={'not'}>
                  {this.context.t('prefer-not-to-say')}
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="outlined" className="text_field">
              <Typography component="div" className="form-control-label">
                {this.context.t('what-ethnicity-cultural-group')}
              </Typography>
              <Select
                className="text_field"
                value={this.state.ethnicity}
                onChange={this.handleChangeInfo('ethnicity')}
                input={
                  <OutlinedInput
                    name="ethnicity"
                    placeholder="ethnicity"
                    id="ethnicity-customized-select"
                  />
                }
              >
                <MenuItem value={'Caucasian'}>
                  {this.context.t('caucasian')}
                </MenuItem>
                <MenuItem value={'Latin American'}>
                  {this.context.t('latin-american')}
                </MenuItem>
                <MenuItem value={'African'}>
                  {this.context.t('african')}
                </MenuItem>
                <MenuItem value={'Caribbean'}>
                  {this.context.t('caribbean')}
                </MenuItem>
                <MenuItem value={'Middle Eastern'}>
                  {this.context.t('middle-east')}
                </MenuItem>
                <MenuItem value={'South Asian'}>
                  {this.context.t('south-asian')}
                </MenuItem>
                <MenuItem value={'Southeast Asian'}>
                  {this.context.t('southeast-asian')}
                </MenuItem>
                <MenuItem value={'West Asian'}>
                  {this.context.t('west-asian')}
                </MenuItem>
                <MenuItem value={'Aboriginal'}>
                  {this.context.t('aboriginal')}
                </MenuItem>
                <MenuItem value={'Other'}>{this.context.t('other')}</MenuItem>
                <MenuItem value={'Mixed'}>{this.context.t('mixed')}</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="outlined" className="text_field">
              <Typography component="div" className="form-control-label">
                {this.context.t('what-is-your-marital')}
              </Typography>
              <Select
                className="text_field"
                value={this.state.marital}
                onChange={this.handleChangeInfo('marital')}
                input={
                  <OutlinedInput
                    name="marital"
                    placeholder="marital"
                    id="marital-customized-select"
                  />
                }
              >
                <MenuItem value={'Single'}>
                  {this.context.t('single-never-married')}
                </MenuItem>
                <MenuItem value={'Widowed'}>
                  {this.context.t('widowed')}
                </MenuItem>
                <MenuItem value={'Separated'}>
                  {this.context.t('separated')}
                </MenuItem>
                <MenuItem value={'Divorced'}>
                  {this.context.t('divorced')}
                </MenuItem>
                <MenuItem value={'Married'}>
                  {this.context.t('married')}
                </MenuItem>
                <MenuItem value={'Living common-law'}>
                  {this.context.t('living-common-law')}
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="outlined" className="text_field">
              <Typography component="div" className="form-control-label">
                {this.context.t('what-is-the-highest-degree')}
              </Typography>
              <Select
                className="text_field"
                value={this.state.degree}
                onChange={this.handleChangeInfo('degree')}
                input={
                  <OutlinedInput
                    name="degree"
                    placeholder="degree"
                    id="degree-customized-select"
                  />
                }
              >
                <MenuItem value={'Less than high school diploma'}>
                  {this.context.t('less-than-high-school-diploma')}
                </MenuItem>
                <MenuItem
                  value={'High school degree or equivalent (e.g., GED)'}
                >
                  {this.context.t('high-school-degree-or-equivalent')}
                </MenuItem>
                <MenuItem value={'Some college, no degree'}>
                  {this.context.t('some-scollege-no-degree')}
                </MenuItem>
                <MenuItem value={'Associate degree'}>
                  {this.context.t('associate-degree')}
                </MenuItem>
                <MenuItem value={'Bachelor’s degree (e.g., BA, BS)'}>
                  {this.context.t('bachelors-degree')}
                </MenuItem>
                <MenuItem value={'Master’s degree (e.g., MA, MS)'}>
                  {this.context.t('masters-degree')}
                </MenuItem>
                <MenuItem value={'Professional degree (e.g., MD, DDS)'}>
                  {this.context.t('professional-degree')}
                </MenuItem>
                <MenuItem value={'Doctorate (e.g., PhD, EdD)'}>
                  {this.context.t('doctorate')}
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="outlined" className="text_field">
              <Typography component="div" className="form-control-label">
                {this.context.t('what-is-your-current-employment-status')}
              </Typography>
              <Select
                className="text_field"
                value={this.state.employment}
                onChange={this.handleChangeInfo('employment')}
                input={
                  <OutlinedInput
                    name="employment"
                    placeholder="employment"
                    id="employment-customized-select"
                  />
                }
              >
                <MenuItem value={'full time'}>
                  {this.context.t('employed-full-time-40')}
                </MenuItem>
                <MenuItem value={'part time'}>
                  {this.context.t('employed-part-time-39')}
                </MenuItem>
                <MenuItem value={'Unemployed and currently looking for work'}>
                  {this.context.t('unemployed-and-currently-looking')}
                </MenuItem>
                <MenuItem
                  value={'Unemployed and currently not looking for work'}
                >
                  {this.context.t('Unemployed-and-currently-not-looking')}
                </MenuItem>
                <MenuItem value={'Student'}>
                  {this.context.t('student')}
                </MenuItem>
                <MenuItem value={'Retired'}>
                  {this.context.t('retired')}
                </MenuItem>
                <MenuItem value={'Self-employed'}>
                  {this.context.t('self-employed')}
                </MenuItem>
                <MenuItem value={'Unable to work'}>
                  {this.context.t('unable-to-work')}
                </MenuItem>
              </Select>
            </FormControl>
            {/* {
              <div className={validationStyle}>
                <i className="fa fa-exclamation-triangle valid__icon" />
                <p className="valid__text">
                  &nbsp;
                  {valid !== 0 && invalidMsg[valid - 1]}
                </p>
              </div>
            } */}
            <Button
              className="continue-btn"
              variant="contained"
              color="secondary"
              onClick={this.handleNext}
            >
              {this.context.t('next')}
            </Button>
            {/* <Button
              className="continue-btn back-to-end-btn"
              variant="link"
              color="primary"
              onClick={this.backToChallenge}
            >
              {this.context.t('login')}
            </Button> */}
          </React.Fragment>
        </div>
      </div>
    );
  }
}

CEnterInfo.contextTypes = {
  t: PropTypes.func,
};

CEnterInfo.propTypes = {
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

const mapStateToProps = state => ({
  curCandidate: state.candidateReducer.curCandidate,
});

const mapDispatchToProps = {
  updateCandidate,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(CEnterInfo),
);
