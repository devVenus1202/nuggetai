import React, { Component } from 'react';
import { Image, Grid, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import challengeActions from '../../redux/challenge/actions';
import StepIndicator from '../../components/StepIndicator';
import { items } from './Steps/data';
import { Step1, Step2, Step2_1, Step3, Step4, Step5, StepFinal } from './Steps';
import clouds from '../../images/clouds.png';
import './CreateTest.scss';

const { createChallenge } = challengeActions;

const PRE_BUILT = false;
const CREATE_OWN = true;

class CreateTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      type: false,
      selection: 0,
      cards: [{ details: '', cardtype: 1 }],
      keywords: [],
      testName: '',
      testDesc: '',
      role: '',
      position: '',
      timer: 0,
      image: null,
    };

    this.final = false;
  }

  componentDidMount() {
  }

  setType = type => {
    this.setState({
      step: 1,
      type,
    });
  };

  setRoleAndPosition = ({role, position}) => {
    this.setState({
      role,
      position,
    });
  }

  handleNext = () => {
    if (this.state.step === 3) {
      return;
    }
    this.setState({ step: this.state.step + 1 });
  };

  handlePrev = () => {
    if (this.state.step === 0) {
      return;
    }
    this.setState({ step: this.state.step - 1 });
  };

  gotoStep = step => {
    this.setState({ step });
  };

  handleChange = selection => {
    const curItem = items[selection];
    this.setState({
      testName: curItem.title,
      testDesc: curItem.description,
      cards: curItem.cards,
      selection,
      image: curItem.imgSrc,
    });
  };

  handleSetTestInfo = (testName, testDesc, timer, image) => {
    this.setState({ testName, testDesc, timer, image });
  };

  handleSetKeywords = keywords => {
    this.setState({ keywords });
  }

  handleSetTest = (cards, tags) => {
    this.setState({ cards, keywords: tags }, () => {
      this.handleLaunch();
    });
  };

  handleLaunch = () => {
    const { createChallenge } = this.props;
    const {
      testName: test_name,
      testDesc: test_desc,
      cards,
      role,
      position,
      timer,
      keywords,
      image,
    } = this.state;
    let challenge = new FormData();

    challenge.append('test_name', test_name);
    challenge.append('test_desc', test_desc);
    challenge.append('role', role);
    challenge.append('position', position);
    challenge.append('timer', timer);
    challenge.append('cards', JSON.stringify(cards));
    challenge.append('keywords', JSON.stringify(keywords));
    if (typeof image === 'string') {
      challenge.append('image', image);
    }
    else if (image.length) {
      challenge.append('image', image[0]);
    }

    createChallenge(challenge);
  };

  handleFinish = route => {
    console.log('finish ', route)
    this.props.history.push(route);
  }

  render() {
    const { curChallenge, isLoading } = this.props;
    const { step, type } = this.state;

    if (!isLoading && curChallenge && !this.final) {
      this.final = true;
      this.handleNext();
    }
    return (
      <div className="createTest container">
        <Grid>
          <Row>
            <StepIndicator current={step} count={4} />
          </Row>
          <Row>
            {step === 0 && <Step1 setType={this.setType} />}

            {step === 1 &&
              type === PRE_BUILT && (
                <Step2
                  handlePrev={this.handlePrev}
                  handleNext={this.handleNext}
                  setKeywords={this.handleSetKeywords}
                  setRoleAndPosition={this.setRoleAndPosition}
                />
              )}

            {step === 1 &&
              type === CREATE_OWN && (
                <Step2_1
                  handlePrev={this.handlePrev}
                  handleNext={this.handleNext}
                  onSetTestInfo={this.handleSetTestInfo}
                />
              )}

            {step === 2 &&
              type === PRE_BUILT && (
                <Step3
                  handlePrev={this.handlePrev}
                  handleNext={this.handleLaunch}
                  handleChange={this.handleChange}
                />
              )}

            {step === 2 &&
              type === CREATE_OWN && (
                <Step4
                  gotoStep={this.gotoStep}
                  onSetTest={this.handleSetTest}
                />
              )}

            {step === 3 &&
              type === PRE_BUILT && (
                <Step5
                  testId={curChallenge && curChallenge._id}
                  handlePrev={this.handlePrev}
                  handleLaunch={this.handleFinish}
                />
              )}

            {step === 3 &&
              type === CREATE_OWN && (
                <StepFinal
                  testId={curChallenge && curChallenge._id}
                  handlePrev={this.handlePrev}
                  handleLaunch={this.handleFinish}
                />
              )}
          </Row>

          <Image className="cloudImage" src={clouds} />
        </Grid>
      </div>
    );
  }
}

CreateTest.contextTypes = {
  t: PropTypes.func,
};


CreateTest.propTypes = {
  user: PropTypes.object.isRequired,
  curChallenge: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  createChallenge: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.authReducer.user,
  curChallenge: state.challengeReducer.curChallenge,
  isLoading: state.challengeReducer.isLoading,
});

const mapDispatchToProps = {
  createChallenge,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateTest));
