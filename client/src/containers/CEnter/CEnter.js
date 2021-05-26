import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Grid,
  TextField,
  OutlinedInput,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import ArrowForward from '@material-ui/icons/ArrowForward';
import DialogModal from '../../components/Modals/DialogModal';
import StepIndicator from '../../components/StepIndicator';
import candidateActions from '../../redux/candidate/actions';
import challengeActions from '../../redux/challenge/actions';
import { email as validEmail } from '../../utils/validation';
import { getEndpoint } from '../../utils/urlHelper';
import { getHeaders } from '../../utils/authUtil';
import './CEnter.scss';
import NotFound from '../NotFound/NotFound';

const { getChallenge } = challengeActions;
const { storeCandidate } = candidateActions;

const invalidMsg = [
  'Name field is required!',
  'Email field is incorrect!',
  'Function field is required!',
  'Role Level field is required!',
  'Terms & Conditions are required!',
  'This mail is already registered!',
];

class CEnter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: 0,
      fname: '',
      firstname: '',
      lastname: '',
      email: '',
      roleLevel: '',
      roleFunction: '',
      step: 0,
      ethnicity: '',
      marital: '',
      degree: '',
      employment: '',
      isTermsAndCond: false,
      showTermsAndCond: false,
    };
  }

  componentDidMount() {
    const { getChallenge } = this.props;
    const { challengeId } = this.props.match.params;
    getChallenge(challengeId);
  }

  handleChangeInfo = name => event => {
    this.setState({ [name]: event.target.value, valid: 0 });
  };

  handleNext = async () => {
    const { step } = this.state;
    if (step === 0) {
      const valid = await this.validateForm();
      if (!valid) {
        return;
      }
    } else if (step === 1) {
      this.handleSignin();
      return;
    }
    this.setState(prevState => ({
      step: prevState.step + 1,
    }));
  };

  validateForm = async () => {
    const {
      fname,
      firstname,
      lastname,
      email,
      roleFunction,
      roleLevel,
      isTermsAndCond,
    } = this.state;
    if (!firstname || !lastname) {
      this.setState({ valid: 1 });
      return false;
    } else if (validEmail(email) !== undefined || email.length < 5) {
      this.setState({ valid: 2 });
      return false;
    } else if (!roleFunction) {
      this.setState({ valid: 3 });
      return false;
    } else if (!roleLevel) {
      this.setState({ valid: 4 });
      return false;
    } else if (!isTermsAndCond) {
      this.setState({ valid: 5 });
      return false;
    }

    const { challengeId, pipelineId } = this.props.match.params;
    const params = {
      url: getEndpoint(
        `challenge/validation/${challengeId}/${pipelineId}/${email}`,
      ),
      method: 'get',
      headers: getHeaders(),
    };
    try {
      const validateRes = await axios.request(params);
      console.log(validateRes);
      console.log(validateRes);
      if (validateRes && !validateRes.data.valid) {
        this.setState({ valid: 6 });
        return false;
      }
      return true;
    } catch (error) {
      this.setState({ valid: 6 });
      return false;
    }
  };

  handleSignin = () => {
    const {
      fname,
      firstname,
      lastname,
      email,
      roleLevel,
      roleFunction,
    } = this.state;

    const { challengeId, pipelineId } = this.props.match.params;
    const { storeCandidate } = this.props;

    storeCandidate({
      data: {
        firstname,
        lastname,
        email: email,
        roleFunction: roleFunction,
        roleLevel: roleLevel,
      },
      challengeId,
      pipelineId,
    });
    this.props.history.push(`/taketest/${challengeId}/${pipelineId}`);
  };

  handleCheck = name => event => {
    this.setState({ [name]: event.target.checked, valid: 0 });
  };

  handleShowTermsAndCond = event => {
    event.stopPropagation();
    event.preventDefault();
    this.setState({ showTermsAndCond: true });
  };

  handleCloseTermsAndCond = event => {
    this.setState({ showTermsAndCond: false });
  };

  handleAcceptTerms = event => {
    this.setState({ isTermsAndCond: true, showTermsAndCond: false });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.candidateAuth) {
      const { challengeId, pipelineId } = this.props.match.params;
      this.props.history.push(`/taketest/${challengeId}/${pipelineId}`);
    }
  }

  render() {
    const { valid, step, isTermsAndCond, showTermsAndCond } = this.state;
    const validationStyle = valid === 0 ? 'validationTrue' : 'validationFalse';
    const { challenge } = this.props;
    const defaultTimer = 20;
    const defaultCompany = 'company';
    const classname = `candidate-enter-container ${
      step === 0 ? 'bg-center-image' : ''
    }`;

    console.log('challenge', challenge);
    if (challenge && challenge.status === 'deleted') {
      window.location.href = '/error';
      // return <NotFound />;
    }

    return (
      <div className={classname}>
        <div className="candidate-header-container">
          <div className="logo-image" />
          <div className="topright-image" />
          <div className="center-image" />
          <div className="bottomleft-image" />
          <div className="step-wizard-container">
            <StepIndicator current={step} count={3} direction="vertical" />
          </div>
        </div>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className="login_wrapper"
        >
          <Grid item sm={6}>
            <div className="login_form">
              <h1>
                <strong>
                  {step === 0 && this.context.t('get-started')}
                  {step === 1 &&
                    `${this.context.t('welcome')} ${this.state.fname}`}
                </strong>
              </h1>

              {step === 0 && (
                <div className="login-form-wrapper">
                  <React.Fragment className="login-form-wrapper">
                    <Grid container justify="center" spacing={2}>
                      <Grid item xs={6} style={{ paddingRight: '10px' }}>
                        <TextField
                          id="fname"
                          label={this.context.t('firstname')}
                          className="text_field"
                          value={this.state.firstname}
                          onChange={this.handleChangeInfo('firstname')}
                          margin="normal"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={6} style={{ paddingLeft: '10px' }}>
                        <TextField
                          id="lname"
                          label={this.context.t('lastname')}
                          className="text_field"
                          value={this.state.lastname}
                          onChange={this.handleChangeInfo('lastname')}
                          margin="normal"
                          variant="outlined"
                          classes={{
                            root: { width: '100%', marginLeft: '10px' },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="email"
                          label={this.context.t('email')}
                          className="text_field"
                          value={this.state.email}
                          onChange={this.handleChangeInfo('email')}
                          margin="normal"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl
                          variant="outlined"
                          className="text_field selector"
                          color="primary"
                        >
                          <InputLabel
                            className="role-label"
                            ref={ref => {
                              this.InputLabelRef = ref;
                            }}
                            htmlFor="function-customized-select"
                          >
                            {this.context.t('function')}
                          </InputLabel>
                          <Select
                            className="text_field"
                            value={this.state.roleFunction}
                            onChange={this.handleChangeInfo('roleFunction')}
                            input={
                              <OutlinedInput
                                className="select-label-input"
                                labelWidth={60}
                                name="function"
                                placeholder="Function"
                                id="function-customized-select"
                              />
                            }
                          >
                            <MenuItem value={'consultant'}>
                              {this.context.t('consultant')}
                            </MenuItem>
                            <MenuItem value={'Finance & Accounting'}>
                              {this.context.t('finance-accounting')}
                            </MenuItem>
                            <MenuItem value={'Sales'}>
                              {this.context.t('sales')}
                            </MenuItem>
                            <MenuItem value={'Marketing'}>
                              {this.context.t('marketing')}
                            </MenuItem>
                            <MenuItem value={'General Management'}>
                              {this.context.t('general-management')}
                            </MenuItem>
                            <MenuItem value={'Human Resources'}>
                              {this.context.t('human-resources')}
                            </MenuItem>
                            <MenuItem value={'Information Technology'}>
                              {this.context.t('information-technology')}
                            </MenuItem>
                            <MenuItem value={'Operations'}>
                              {this.context.t('operations')}
                            </MenuItem>
                            <MenuItem value={'Strategy'}>
                              {this.context.t('strategy')}
                            </MenuItem>
                            <MenuItem value={'Other'}>
                              {this.context.t('other')}
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl
                          variant="outlined"
                          className="text_field selector"
                        >
                          <InputLabel
                            className="role-label"
                            ref={ref => {
                              this.InputLabelRef = ref;
                            }}
                            htmlFor="role-customized-select"
                          >
                            {this.context.t('rolelevel')}
                          </InputLabel>
                          <Select
                            className="text_field"
                            value={this.state.roleLevel}
                            onChange={this.handleChangeInfo('roleLevel')}
                            input={
                              <OutlinedInput
                                className="select-label-input"
                                name="role"
                                labelWidth={70}
                                placeholder="Role Level"
                                id="role-customized-select"
                              />
                            }
                          >
                            <MenuItem value={'Individual Contributor'}>
                              {this.context.t('individual-contributor')}
                            </MenuItem>
                            <MenuItem value={'Expert Individual Contributor'}>
                              {this.context.t('expert-individual-contributor')}
                            </MenuItem>
                            <MenuItem value={'Manager'}>
                              {this.context.t('manager')}
                            </MenuItem>
                            <MenuItem value={'Senior Manager'}>
                              {this.context.t('senior-manager')}
                            </MenuItem>
                            <MenuItem value={'Executive'}>
                              {this.context.t('executive')}
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl className="text_field check_field">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={isTermsAndCond}
                                onChange={this.handleCheck('isTermsAndCond')}
                                value="isTermsAndCond"
                                color="primary"
                              />
                            }
                            classes={{ label: 'check-label' }}
                            label={
                              <span>
                                {this.context.t('accept-the')}{' '}
                                <span
                                  className="terms-cond"
                                  onClick={this.handleShowTermsAndCond.bind(
                                    this,
                                  )}
                                >
                                  {this.context.t('terms-conditions')}
                                </span>
                              </span>
                            }
                          />
                        </FormControl>
                      </Grid>
                    </Grid>

                    {/* <TextField
                    id="fname"
                    label={this.context.t('name')}
                    className="text_field"
                    value={this.state.fname}
                    onChange={this.handleChangeInfo('fname')}
                    margin="normal"
                    variant="outlined"
                  /> */}
                  </React.Fragment>
                </div>
              )}

              {step === 1 && (
                <div className="intro-text">
                  <p>
                    <strong>
                      {(challenge.user && challenge.user.company) ||
                        this.context.t(defaultCompany)}
                    </strong>{' '}
                    {this.context.t('company-would-like')}
                  </p>
                  <p>{this.context.t('company-to-prepare')}</p>
                  <p>
                    {this.context.t('company-following-tutorial', {
                      n: challenge.timer || defaultTimer,
                    })}
                  </p>
                </div>
              )}

              <Button
                className="continue-btn"
                variant="contained"
                color="primary"
                onClick={this.handleNext}
              >
                {this.context.t('continue')}
                {step === 1 && ` ${this.context.t('to-tutorial')}`}
                <ArrowForward />
              </Button>

              {step === 1 && (
                <Typography className="warning-text" component="p">
                  {this.context.t(
                    'please-do-not-take-this-assessment-on-phone',
                  )}
                  .
                </Typography>
              )}
              {
                <div className={validationStyle}>
                  <i className="fa fa-exclamation-triangle valid__icon" />
                  <p className="valid__text">
                    &nbsp;
                    {valid !== 0 && invalidMsg[valid - 1]}
                  </p>
                </div>
              }
            </div>
          </Grid>
        </Grid>
        <DialogModal
          isOpen={showTermsAndCond}
          title={this.context.t('terms-conditions')}
          handleClose={this.handleCloseTermsAndCond.bind(this)}
          handleOk={this.handleAcceptTerms.bind(this)}
        >
          <div>{this.context.t('terms-and-condition')}</div>{' '}
        </DialogModal>
      </div>
    );
  }
}

CEnter.contextTypes = {
  t: PropTypes.func,
};

CEnter.propTypes = {
  storeCandidate: PropTypes.func.isRequired,
  candidateAuth: PropTypes.bool.isRequired,
  curCandidate: PropTypes.object,
  challenge: PropTypes.object.isRequired,
  getChallenge: PropTypes.func.isRequired,
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
  candidateAuth: state.candidateReducer.candidateAuth,
  curCandidate: state.candidateReducer.curCandidate,
  challenge: state.challengeReducer.curChallenge,
});

const mapDispatchToProps = {
  getChallenge,
  storeCandidate,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(CEnter),
);
