import React, { Component } from 'react';
import { Prompt, withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  withStyles,
  Grid,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Tabs,
  Tab,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Badge from '@material-ui/core/Badge';
import { arrayMove } from 'react-sortable-hoc';
import Tour from 'reactour';
import detectBrowserLanguage from 'detect-browser-language';

import PreviewModal from '../../components/Modals/InformModal';
import QuestionModal from '../../components/Modals/QuestionModal';
// import { OrderedSet } from 'immutable';
import Faq from '../Faq';
import { tourConfig } from './TourSteps';
import {
  EditorState,
  ContentState,
  RichUtils,
  SelectionState,
  convertFromHTML,
  Modifier as DraftModifier,
} from 'draft-js';
import axios from 'axios';
import { getHeaders } from '../../utils/authUtil';
import { getEndpoint } from '../../utils/urlHelper';

import challengeActions from '../../redux/challenge/actions';
import resultActions from '../../redux/result/actions';
import candidateActions from '../../redux/candidate/actions';
import { RichEditor } from '../../components/RichEditor/RichEditor';
import * as TimeSpentEvent from '../../helpers/EventHelpers/TimeSpentEvent';
import * as DragEvent from '../../helpers/EventHelpers/DragEvent';
import * as SectionWordsEvent from '../../helpers/EventHelpers/SectionWordsEvent';
import * as CardTimerEvent from '../../helpers/EventHelpers/CardTimerEvent';
import * as KeywordEvent from '../../helpers/EventHelpers/KeywordEvent';
import * as TransitionEvent from '../../helpers/EventHelpers/TransitionEvent';
import * as FirstTypingEvent from '../../helpers/EventHelpers/FirstTypingEvent';
import * as SectionDataEvent from '../../helpers/EventHelpers/SectionDataEvent';
import * as AnalysisEvent from '../../helpers/EventHelpers/AnalysisEvent';
import * as RevisionEvent from '../../helpers/EventHelpers/RevisionEvent';
import * as CalcTimerEvent from '../../helpers/EventHelpers/CalcTimerEvent';
import * as HelpViewEvent from '../../helpers/EventHelpers/HelpViewEvent';
import * as WildCardEvent from '../../helpers/EventHelpers/WildCardEvent';

import StartTest from '../../components/Modals/StartTest';
import Timer from '../../components/Timer/Timer';
import {
  testdata,
  loremIpsum,
  pitchIdea,
  communicateValue,
  dataScientist,
  b2b,
  marketing,
  strategy,
  engineer,
  consulting,
  crisisManagement,
} from './data';
import ConfirmModal from '../../components/Modals/ConfirmModal';
import './TakeTest.scss';

const { getChallenge } = challengeActions;
const { addResult, sendEvent, storeTestData } = resultActions;
const { createCandidate } = candidateActions;
// const IS_PROBLEM_SECTION = 0;
// const IS_COLLECT_SECTION = 1;
// const IS_ENGENDER_SECTION = 2;
// const IS_RECOMMEND_SECTION = 3;

const dummyKeywords = [
  'Payments',
  'Cards',
  'Technology',
  'Google',
  'Digital',
  'Voice',
]; // dummy Keyword

const regex = {
  letterAndnumber: /^[a-z0-9]+$/i,
  wordSplitter: /\s+/gi,
};

const tabClasses = theme => ({
  tabsRoot: {
    borderBottom: '1px solid #e8e8e8',
  },
  tabsIndicator: {
    backgroundColor: '#dd628f',
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    fontWeight: 'light',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#dd628f',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#dd628f',
      fontWeight: 'bold',
    },
    '&:focus': {
      color: '#dd628f',
    },
  },
});

class TakeTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTitle: '',
      newContent: '',
      editorStates: [],
      sections: [],
      currentEditor: null,
      paneSwitch: false,
      showNewSection: false,
      showStartModal: false,
      openDeleteModal: false,
      openTimerModal: false,
      openLeaveModal: false,
      openFinishModal: false,
      openRunoutModal: false,
      openPreviewModal: false,
      openQuestionModal: false,
      openFourthPanel: false,
      badgeMode: true,
      previewMode: false,
      lastLocation: null,
      confirmedNavigation: false,
      testStarted: false,
      startTestError: null,
      curCard: 0,
      curSection: 0,
      sectionExpanded: { 0: false },
      overviewExpanded: false,
      dndStatus: 0, // for dnd tour
      isTourOpen: false,
      tourStep: 0,
      showFaq: false,
      faqType: 0,
      timerMinutes: 0,
      timerSeconds: 0,
      blinkStyle: '',
      fullTime: 20 * 60,
    };

    this.dummyState = {
      newTitle: '',
      newContent: '',
      editorStates: [],
      sections: [],
      currentEditor: null,
      paneSwitch: false,
    };

    // event tracking variables

    this.firstTyping = [];
    this.firstKeywordTyping = [];
    this.firstKeywordFound = [];
    this.deletePressed = []; // status when delete pressed
    this.forcusReturned = []; // time from focus out to focus in

    this.wordWithin30s = {};
    this.writeWithin3s = false;
    this.startedWriting = false;
    this.countFromDelete = {}; // instance of timer after delete
    this.timerLimit = 20 * 1000; // 30 seconds

    this.dndTourStep = 4; // drag and drop tour step start in x
    this.isTestFinished = false;
  }

  componentDidMount = () => {
    window.addEventListener('beforeunload', this.handleExitTab);

    const { getChallenge } = this.props;
    const { challengeId } = this.props.match.params;
    getChallenge(challengeId);

    this.createNewSection(this.context.t('problem'));
    this.createNewSection(this.context.t('collect-information-title'));
    this.createNewSection(this.context.t('ideas'));
    this.createNewSection(this.context.t('solution'));
    this.setState(state => ({
      ...state,
      newTitle: this.dummyState.newTitle,
      newContent: this.dummyState.newContent,
      editorStates: this.dummyState.editorStates,
      sections: this.dummyState.sections,
      currentEditor: this.dummyState.currentEditor,
      paneSwitch: this.dummyState.paneSwitch,
    }));
    this.openTour();
  };

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleExitTab);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.result === null && this.props.result) {
      this.setState({
        testStarted: true,
        showStartModal: false,
      });
      // setTimeout(this.handelQuestionModal, 1000 * 10);
    }
  }

  handelQuestionModal = event => {
    if (!this.state.openQuestionModal) {
      this.setState({
        openQuestionModal: true,
        //openFourthPanel: true,
      });
    }
  };

  handelResource = event => {
    this.setState({
      openFourthPanel: true,
    });
  };

  handleExitTab = event => {
    event.returnValue = `Are you sure you want to leave?`;
  };

  closeTour = () => {
    this.setState({
      isTourOpen: false,
    });
    this.handleOpenPreviewModal();
  };

  openTour = () => {
    this.setState({ isTourOpen: true });
  };

  handleNextTourStep = () => {
    const { tourStep } = this.state;

    if (tourStep === 3) {
      this.setState({
        curCard: 1,
      });
      this.selectText('tour-selection');
      setTimeout(() => {
        this.setState({
          tourStep: tourStep + 1,
        });
      }, 300);
    } else if (tourStep === 4) {
      this.setState({
        curSection: 1,
        sectionExpanded: {
          ...this.state.sectionExpanded,
          1: true,
        },
      });
      setTimeout(() => {
        this.setState({
          tourStep: tourStep + 1,
        });
      }, 300);
    } else if (tourStep === 5) {
      window.getSelection().removeAllRanges();
      this.setState({
        curCard: 0,
        curSection: 0,
        sectionExpanded: {
          ...this.state.sectionExpanded,
          1: false,
        },
      });

      this.setState({
        tourStep: tourStep + 1,
      });
    } else {
      this.setState({
        tourStep: tourStep + 1,
      });
    }
  };

  handlePrevTourStep = () => {
    const { tourStep } = this.state;

    if (tourStep === 6) {
      this.setState({
        curCard: 1,
        curSection: 1,
        sectionExpanded: {
          ...this.state.sectionExpanded,
          1: true,
        },
      });
      this.selectText('tour-selection');
      setTimeout(() => {
        this.setState({
          tourStep: tourStep - 1,
        });
      }, 500);
    } else if (tourStep === 5) {
      this.setState({
        curSection: 0,
        sectionExpanded: {
          ...this.state.sectionExpanded,
          1: false,
        },
      });

      this.setState({
        tourStep: tourStep - 1,
      });
    } else if (tourStep === 4) {
      this.setState({
        curCard: 0,
      });
      window.getSelection().removeAllRanges();

      setTimeout(() => {
        this.setState({
          tourStep: tourStep - 1,
        });
      }, 300);
    } else {
      this.setState({
        tourStep: tourStep - 1,
      });
    }
  };

  handleCurrentStep = tourStep => {
    this.setState({
      tourStep,
    });
  };

  selectText = containerid => {
    if (document.selection) {
      // IE
      let range = document.body.createTextRange();
      range.moveToElementText(document.getElementById(containerid));
      range.select();
    } else if (window.getSelection) {
      let range = document.createRange();
      range.selectNode(document.getElementById(containerid));
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
    }
  };

  // Timer Modal

  confirmCloseTimerModel = () => {
    this.setState({
      openTimerModal: false,
    });
  };

  openTimerModal = () => {
    this.setState({
      openTimerModal: true,
    });

    const seconds = 10 * 1000;
    // close timer modal after n - seconds
    setTimeout(() => {
      this.setState({
        openTimerModal: false,
      });
    }, seconds);
  };

  getTimerModalContent = () => {
    const { timerMinutes, timerSeconds } = this.state;

    return `You have ${timerMinutes}:${timerSeconds} remaining`;
  };

  showModal = location => {
    if (this.state.testStarted) {
      this.setState({
        openLeaveModal: true,
        lastLocation: location,
      });
      return false;
    }
    return true;
  };

  closeModal = callback =>
    this.setState(
      {
        openLeaveModal: false,
      },
      callback,
    );

  handleConfirmNavigationClick = () =>
    this.closeModal(() => {
      const { navigate } = this.props;
      const { lastLocation } = this.state;
      if (lastLocation) {
        this.setState(
          {
            confirmedNavigation: true,
          },
          () => {
            // Navigate to the previous blocked location with your navigate function
            this.props.history.push(lastLocation.pathname);
          },
        );
      }
    });

  handleBlockedNavigation = nextLocation => {
    const { confirmedNavigation } = this.state;
    if (!confirmedNavigation && !this.isTestFinished) {
      return this.showModal(nextLocation);
    }

    return true;
  };

  // Faq functions

  showFaqOverlay = () => {
    this.setState({
      showFaq: true,
    });

    HelpViewEvent.onViewHelp();
  };

  hideFaqOverlay = () => {
    this.setState({
      showFaq: false,
    });
  };

  onChangeFaqType = (event, value) => {
    this.setState({
      faqType: value,
    });
  };

  handleChangeState = field => event => {
    this.setState({
      [field]: event.target.value,
    });
  };

  handleChangeEditor = index => (event, expanded) => {
    this.setState({
      curSection: index,
      sectionExpanded: {
        ...this.state.sectionExpanded,
        [index]: expanded,
      },
    });
  };

  handleClickSection = index => () => {
    const sectionId = this.getSectionId(index);

    RevisionEvent.clickSection(sectionId);
  };

  handleRunEvents = () => {
    // CardTimerEvent.onFocusAccordion(1);
  };

  handleFinishTest = () => {
    this.setState({
      openRunoutModal: true,
    });

    setTimeout(() => {
      this.setState({
        openRunoutModal: false,
      });
      this.handleTestsubmit();
    }, 8000);
  };

  handleClickFinish = () => {
    this.setState({
      openFinishModal: true,
    });
  };

  handleConfirmFinish = () => {
    this.handleTestsubmit();
  };

  handleResumeChallenge = () => {
    this.setState({
      openFinishModal: false,
    });
  };

  handleStartPreviewMode = () => {
    this.setState({
      previewMode: true,
      openPreviewModal: false,
    });
  };

  handleOpenPreviewModal = () => {
    this.setState({
      openPreviewModal: true,
    });
  };

  handleClosePreviewModal = () => {
    this.setState({
      openPreviewModal: false,
    });
  };

  handleEndPreview = () => {
    this.setState({
      previewMode: false,
      showStartModal: true,
    });
  };

  handleStartQuestionMode = value => {
    const engineerDesc = 'software-engineering-challenge-description';
    const consultingDesc = 'consulting-description';
    if (value === '') {
      this.setState({
        openQuestionModal: false,
      });
    } else {
      let minusTime;
      minusTime = 0;
      if (value.value === '1') {
        minusTime = 180;
      } else if (value.value === '2') {
        console.log(this.props.challenge.test_desc);
        if (this.props.challenge.test_desc === engineerDesc) minusTime = 90;
        else if (this.props.challenge.test_desc === consultingDesc)
          minusTime = 60;
      }
      let leftTime;
      leftTime =
        parseInt(this.state.timerMinutes) * 60 +
        parseInt(this.state.timerSeconds) -
        minusTime;
      if (leftTime < 0) leftTime = 0;
      console.log(
        leftTime,
        this.state.timerMinutes,
        this.state.timerSeconds,
        value,
        minusTime,
      );
      this.setState({
        fullTime: leftTime,
        isSubtracted: true,
      });
      console.log(value);
      WildCardEvent.onResultHelp(value);
    }
  };

  handleCloseQuestionMode = () => {};

  // sortable hoc
  onSortEnd = ({ oldIndex, newIndex }) => {
    const { sections, editorStates } = this.state;

    this.setState({
      sections: arrayMove(sections, oldIndex, newIndex),
      editorStates: arrayMove(editorStates, oldIndex, newIndex),
      currentEditor: newIndex,
    });
  };

  toggleInlineStyle = inlineStyle => {
    const { editorStates, currentEditor } = this.state;

    const currentState = editorStates[currentEditor];
    this.onChange(
      currentEditor,
      RichUtils.toggleInlineStyle(currentState, inlineStyle),
    );
  };

  toggleBlockType = blockType => {
    const { editorStates, currentEditor } = this.state;

    const currentState = editorStates[currentEditor];
    if (RichUtils.getCurrentBlockType(currentState) !== blockType) {
      this.onChange(
        currentEditor,
        RichUtils.toggleBlockType(currentState, blockType),
      );
    }
  };

  toggleStyle = (style, type) => {
    if (type === 'inline') {
      this.toggleInlineStyle(style);
    }
    if (type === 'block') {
      this.toggleBlockType(style);
    }
  };

  produceHTMLfromText = str => {
    let newHTML = '';
    str.split(/\r?\n/).map(line => {
      newHTML += `<p>${line}</p>`;
      return '';
    });
    return newHTML;
  };

  handleCancelTest = () => {
    this.setState({
      showStartModal: false,
      isTourOpen: true,
      tourStep: 0,
    });

    // const { challengeId, pipelineId } = this.props.match.params;
    // this.props.history.push(`/enter/${challengeId}/${pipelineId}`);
  };

  handleStartTest = () => {
    const {
      match: {
        params: { challengeId, pipelineId },
      },
    } = this.props;
    const { curCandidate } = this.props;

    if (curCandidate === null) {
      const URL = `/enter/${challengeId}/${pipelineId}`;
      this.props.history.push(URL);
      return;
    }

    window.getSelection().removeAllRanges();
    this.setState({
      testStarted: true,
      showStartModal: false,
    });
    const engineerDesc = 'software-engineering-challenge-description';
    const consultingDesc = 'consulting-description';
    const crisisDesc = 'crisis-description';
    if (this.props.challenge.test_desc === engineerDesc) {
      setTimeout(this.handelQuestionModal, engineer.wildcard_time * 1000);
      setTimeout(this.handelResource, engineer.res_time * 1000);
    } else if (this.props.challenge.test_desc === consultingDesc) {
      setTimeout(this.handelQuestionModal, consulting.wildcard_time * 1000);
      setTimeout(this.handelResource, consulting.res_time * 1000);
    } else if (this.props.challenge.test_desc === crisisDesc) {
      setTimeout(
        this.handelQuestionModal,
        crisisManagement.wildcard_time * 1000,
      );
      setTimeout(this.handelResource, crisisManagement.res_time * 1000);
    }
    if (
      this.props.challenge.hasOwnProperty('timer') &&
      this.props.challenge.timer !== 0
    ) {
      this.setState({
        fullTime: this.props.challenge.timer * 60,
      });
    }
    this.handleRunEvents();
    this.blinkInstruction();
  };

  blinkInstruction = () => {
    this.blinkCount = 6;
    this.occurBlink();
  };

  occurBlink = () => {
    if (this.blinkCount !== 0) {
      if (this.blinkCount % 2 === 0) {
        this.setState({
          blinkStyle: 'blink-style',
        });
      } else {
        this.setState({
          blinkStyle: '',
        });
      }
      this.blinkCount--;
      setTimeout(this.occurBlink, 500);
    }
  };

  addResultToPipeline = async () => {
    const {
      match: {
        params: { challengeId, pipelineId },
      },
    } = this.props;
    const { curCandidate } = this.props;

    if (curCandidate === null) {
      const URL = `/enter/${challengeId}/${pipelineId}`;
      this.props.history.push(URL);
      return;
    }
    const { firstname, role, email } = curCandidate;

    const candidateData = {
      data: curCandidate,
      challengeId,
      pipelineId,
    };
    try {
      // save test related data for thankyou page.
      await this.createCandidateRequest(candidateData);
      return await this.addResultRequest({
        challengeId,
        pipelineId,
        user_email: email,
        data: {
          firstname,
          role,
          email,
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  storeTestDataRequest = async () => {
    const {
      match: {
        params: { challengeId, pipelineId },
      },
      curCandidate: { email },
      storeTestData,
    } = this.props;

    const totalWords = SectionWordsEvent.getTotalWords();
    const minutes = this.fullTime / 60 - this.minutes;
    const paceOfWriting = totalWords / minutes;
    const headStart = FirstTypingEvent.getHeadStart();
    const quickFix = RevisionEvent.getQuickFix();
    const runOn = AnalysisEvent.getRunOn();

    let wholeText = '';
    wholeText = this.getWholeSectionText();

    storeTestData({
      challengeId,
      pipelineId,
      email,
      paceOfWriting,
      headStart,
      quickFix,
      runOn,
      wholeText,
    });
  };

  getWholeSectionText = () => {
    const { editorStates } = this.state;

    let text = '';
    editorStates.map((val, index) => {
      text += val.getCurrentContent().getPlainText() + ' \n';
    });
    return text;
  };

  addResultRequest = async payload => {
    const { challengeId, pipelineId, user_email, data } = payload;
    const params = {
      url: getEndpoint(`challenge/${challengeId}/${pipelineId}/${user_email}`),
      method: 'post',
      headers: getHeaders(),
      data,
    };

    return await axios.request(params);
  };

  createCandidateRequest = async payload => {
    const { challengeId, pipelineId, data } = payload;
    const { createCandidate } = this.props;
    createCandidate(payload);
    // const params = {
    //   url: getEndpoint(`challenge/${challengeId}/${pipelineId}`),
    //   method: 'post',
    //   headers: getHeaders(),
    //   data,
    // };

    // return await axios.request(params);
  };

  handleNewSection = () => {
    const { sections, editorStates } = this.state;
    const newSectionTitle = `section`;

    const newState = EditorState.createEmpty();

    this.setState({
      editorStates: [...editorStates, newState],
      sections: [...sections, newSectionTitle],
      editingTitle: true,
      sectionExpanded: {
        ...this.state.sectionExpanded,
        [sections.length]: true,
      },
    });
  };

  createNewSection = (newTitle, newContent) => {
    const { sections } = this.dummyState;
    if (newTitle === '') {
      return;
    }

    const newState = EditorState.createEmpty();
    const { editorStates } = this.dummyState;
    this.dummyState = {
      editorStates: [...editorStates, newState],
      sections: [...sections, newTitle],
    };
  };

  handleRecord = event => {
    event.preventDefault();
    alert('please turn on the microphone');
  };

  handleSelectSection = curSection => {
    this.setState({ currentEditor: curSection });
  };

  handleDeleteSection = curSection => event => {
    event.stopPropagation();
    this.curSectionToDelete = curSection;
    this.setState({
      openDeleteModal: true,
    });
  };

  deleteSelectedSection = () => {
    if (this.curSectionToDelete) {
      const prevStates = this.state.editorStates;
      const prevSections = this.state.sections;
      prevStates.splice(this.curSectionToDelete, 1);
      prevSections.splice(this.curSectionToDelete, 1);
      this.setState({
        currentEditor: -1,
        editorStates: prevStates,
        sections: prevSections,
      });
    }
  };

  confirmDelete = () => {
    this.deleteSelectedSection();
    this.setState({
      openDeleteModal: false,
    });
  };

  handleSwitchPane = () => {
    this.setState({ paneSwitch: !this.state.paneSwitch });
  };

  handleTestsubmit = async () => {
    const {
      history: { push },
    } = this.props;
    const { challengeId, pipelineId } = this.props.match.params;
    const {
      curCandidate: { email },
    } = this.props;

    // add result to pipeline
    const res = await this.addResultToPipeline();

    if (res) {
      const { challengeResult } = res.data;
      this.eventId = challengeResult.event_id;

      this.handleCalculateSectionWords();
      this.analyzeSectionContents();
      // store test data for thankyou page
      await this.storeTestDataRequest();

      // events
      this.handleSendEventsOnSubmit();

      // mark test is finished
      this.isTestFinished = true;
      this.props.history.replace(
        `/candidatelogin/${challengeId}/${pipelineId}/${email}`,
      );
    } else {
      this.props.history.push(`/enter/${challengeId}/${pipelineId}`);
    }
  };

  handleChangeAccordion = key => (event, expanded) => {
    console.log(key);
    if (key !== 0 && expanded) {
      this.setState({
        curCard: key,
      });
      CardTimerEvent.onFocusAccordion(key);
    }
    if (key === 1) {
      this.setState({
        badgeMode: false,
      });
    }
  };

  handleCountTimer = (fullTime, minutes, seconds) => {
    this.fullTime = fullTime;
    this.minutes = minutes;
    this.seconds = seconds;
    this.setState({
      timerMinutes: minutes,
      timerSeconds: seconds,
    });
  };

  calculateTime = () => {
    const fullTime = this.fullTime;
    const minutes = this.minutes;
    const seconds = this.seconds;

    const criteria = 80 / 100;
    if (minutes * 60 + seconds <= (1 - criteria) * fullTime) {
      return true;
    }
    return false;
  };

  getCurrentTimer = () => {
    const fullTime = this.fullTime;
    const minutes = this.minutes;
    const seconds = this.seconds;
    return fullTime - minutes * 60 - seconds;
  };

  getSectionId = index => {
    const { sections } = this.state;
    if (sections[index]) {
      return `${sections[index]}-${index}`;
    }
  };

  getWordCount = text => {
    if (!text) {
      return 0;
    }
    return text
      .trim()
      .replace(regex.wordSplitter, ' ')
      .split(' ').length;
  };

  getSectionWordCount = index => {
    const { editorStates } = this.state;
    if (editorStates[index]) {
      return this.getWordCount(
        editorStates[index].getCurrentContent().getPlainText(),
      );
    }
    return 0;
  };

  // Test Event Handlers

  // Time Maximization - Did candidate utilize 80% of the time (Yes/No)
  handleTestTime = () => {
    return CalcTimerEvent.sendCalcEvent(
      this.eventId,
      this.calculateTime(),
      this.sendEvent,
    );
  };

  onChange(index, editorState) {
    if (!this.state.testStarted) {
      return;
    }

    const { editorStates } = this.state;
    const newState = editorStates;
    if (newState[index]) {
      newState[index] = editorState;
    }
    this.setState({
      editorStates: newState,
      currentEditor: index,
    });
  }

  onSetSectionTitle = index => event => {
    const { sections } = this.state;

    const newSections = sections;
    newSections[index] = event.target.value;

    this.setState({
      sections: newSections,
      editingTitle: false,
    });
  };

  handleSendEventsOnSubmit = async () => {
    if (!this.state.testStarted) {
      return;
    }

    // this.handleSendEventsOnInterval();
    const event_id = this.eventId;
    const sendEvent = this.sendEvent;

    await TimeSpentEvent.onSendTimeSpent(event_id, sendEvent);
    await DragEvent.onSendDragEvent(event_id, sendEvent);
    await CardTimerEvent.onSendTimeSpent(event_id, sendEvent);
    await TransitionEvent.onTransitionEvent(event_id, sendEvent);
    await HelpViewEvent.sendHelpViewEvent(event_id, sendEvent);
    await WildCardEvent.sendResultEvent(event_id, sendEvent);

    await this.handleCountSectionWords();
    await this.handleCountKeywords();
    await KeywordEvent.onTotalKeywordsEvent(event_id, sendEvent);
    await this.handleTestTime();
    await this.handleSendFirstKeyEvent();
    await this.handleSendFirstKeywordEvent();
    await this.handleRevisionEvent();
    await this.handleAnalyzeSections();

    const sectionData = this.getSendSectionDataEvent();
    const wholeText = this.getWholeSectionText();

    // send merged whole text
    const browserLang = detectBrowserLanguage();
    const data = {
      event_type: 'section_data_event',
      data: {
        text: wholeText,
        lang: browserLang.split('-')[0],
      },
    };
    console.log('section_data: ', data);

    await sendEvent({
      event_id,
      data,
    });
  };

  sendEvent = ({ event_id, data }) => {
    const params = {
      url: getEndpoint(`event/${event_id}`),
      method: 'post',
      headers: getHeaders(),
      data,
    };

    return axios.request(params);
  };

  analyzeSectionContents = () => {
    const { editorStates } = this.state;

    editorStates.map((val, index) => {
      const sectionText = val.getCurrentContent().getPlainText();
      const sectionId = this.getSectionId(index);

      AnalysisEvent.analyzeContent(sectionId, sectionText);
    });
  };

  handleAnalyzeSections = () => {
    if (!this.state.testStarted) {
      return;
    }

    return AnalysisEvent.onSendAnalysisEvent(this.eventId, this.sendEvent);
  };

  handleSendEventsOnInterval = () => {
    const event_id = this.eventId;
    TimeSpentEvent.onSendTimeSpent(event_id, this.sendEvent);
    DragEvent.onSendDragEvent(event_id, this.sendEvent);
    CardTimerEvent.onSendTimeSpent(event_id, this.sendEvent);
    TransitionEvent.onTransitionEvent(event_id, this.sendEvent);
  };

  handleSectionFocus = (index, event) => {
    if (!this.state.testStarted) {
      return;
    }

    const sectionId = this.getSectionId(index);

    TimeSpentEvent.onFocusSection(sectionId, Date.now());
    if (index < 4) {
      TransitionEvent.onFocusSection(sectionId);
    }
    RevisionEvent.sectionFocused(sectionId);
  };

  handleSectionBlur = (index, event) => {
    if (!this.state.testStarted) {
      return;
    }

    const sectionId = this.getSectionId(index);

    TimeSpentEvent.onBlurSection(sectionId, Date.now());
    RevisionEvent.sectionBlurred(sectionId);
  };

  getBlockSelection = (block, start, end) => {
    const blockKey = block.getKey();
    return new SelectionState({
      anchorKey: blockKey,
      anchorOffset: start,
      focusKey: blockKey,
      focusOffset: end,
    });
  };

  removeEditorStyles = editorState => {
    let newEditorState = editorState;
    let newContent = editorState.getCurrentContent();
    const blocks = newContent.getBlocksAsArray();
    for (let block of blocks) {
      block.findStyleRanges(
        () => true,
        (start, end) => {
          newContent = DraftModifier.removeInlineStyle(
            newContent,
            this.getBlockSelection(block, start, end),
            block.getInlineStyleAt(start),
          );
        },
      );
      newEditorState = EditorState.push(
        newEditorState,
        newContent,
        'change-inline-style',
      );
    }

    return newEditorState;
  };

  handlePasteText = index => (text, styles, editorState) => {
    if (!this.state.testStarted) {
      return;
    }
    const { editorStates, currentEditor } = this.state;
    if (currentEditor !== null) {
      setTimeout(() => {
        this.toggleBlockType('blockquote');
        if (index === 1) {
          const sectionId = this.getSectionId(index);
          let selection = editorStates[index].getSelection();

          // const start = selection.getStartOffset();
          // const end = selection.getEndOffset();
          const anchorKey = selection.getAnchorKey();
          const currentContent = editorStates[index].getCurrentContent();
          const currentBlock = currentContent.getBlockForKey(anchorKey);
          // console.log('pasted: ', currentBlock.getText());
          DragEvent.onDropped(sectionId, currentBlock.getText());
        }
      }, 10);
    }
  };

  handleDropped = (index, selectionState, dataTrasfer, dragType) => {
    if (!this.state.testStarted) {
      return;
    }
    const { editorStates, currentEditor } = this.state;
    if (currentEditor !== null) {
      setTimeout(() => {
        this.toggleBlockType('blockquote');
        if (index === 1) {
          const sectionId = this.getSectionId(index);
          let selection = editorStates[index].getSelection();

          const start = selection.getStartOffset();
          const end = selection.getEndOffset();
          const anchorKey = selection.getAnchorKey();
          const currentContent = editorStates[index].getCurrentContent();
          const currentBlock = currentContent.getBlockForKey(anchorKey);
          console.log('dragged: ', currentBlock.getText());
          DragEvent.onDropped(sectionId, currentBlock.getText());
        }
      }, 100);
    }
  };

  handleDropText = index => text => {
    let { editorStates } = this.state;
    // const selection = currentState.getSelection();
    // const currentContent = currentState.getCurrentContent();

    // const entityBr = DraftModifier.insertText(currentContent, selection, '\n\n', null);
    // editorStates[index] = EditorState.push(editorStates[index], entityBr, 'insert-characters');

    const currentState = editorStates[index];
    const currentContentText = currentState.getCurrentContent().getPlainText();
    const appendText = currentContentText
      ? `<blockquote>${text}</blockquote>`
      : `<blockquote>${text}</blockquote>`;

    this.appendBlocksFromHtml(index, `${appendText}`);
    if (index === 1) {
      const sectionId = this.getSectionId(index);
      console.log('dragged: ', text);
      DragEvent.onDropped(sectionId, text);
    }

    // const nextSelection = editorStates[index].getSelection();
    // const nextCurrentContent = editorStates[index].getCurrentContent();

    // const insertEntity = DraftModifier.insertText(
    //   nextCurrentContent,
    //   nextSelection,
    //   appendText,
    //   null,
    // );

    // editorStates[index] = EditorState.push(
    //   editorStates[index],
    //   insertEntity,
    //   'insert-characters',
    // );

    // this.setState({
    //   editorStates,
    //   currentEditor: index,
    // });
  };

  appendBlocksFromHtml(index, htmlString) {
    let { editorStates } = this.state;

    const editorState = editorStates[index];
    const newBlockMap = convertFromHTML(htmlString);
    const contentState = editorState.getCurrentContent();
    const blockMap = contentState.getBlocksAsArray();

    newBlockMap.contentBlocks = blockMap.concat(newBlockMap.contentBlocks);

    const newContentState = ContentState.createFromBlockArray(
      newBlockMap,
      newBlockMap.entityMap,
    );
    const newEditorState = EditorState.createWithContent(newContentState);

    editorStates[index] = newEditorState;
    this.setState({
      editorStates,
      currentEditor: index,
    });
  }

  insertBlocksFromHtmlToSelection(index, htmlString) {
    let { editorStates } = this.state;

    const editorState = editorStates[index];

    const newBlockMap = convertFromHTML(htmlString);
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const key = selectionState.getAnchorKey();
    const blocksAfter = contentState
      .getBlockMap()
      .skipUntil(function(_, k) {
        return k === key;
      })
      .skip(1)
      .toArray();
    const blocksBefore = contentState
      .getBlockMap()
      .takeUntil(function(_, k) {
        return k === key;
      })
      .toArray();

    newBlockMap.contentBlocks = blocksBefore
      .concat(blocksAfter)
      .concat(newBlockMap.contentBlocks)
      .concat([contentState.getBlockForKey(key)]);

    const newContentState = ContentState.createFromBlockArray(
      newBlockMap,
      newBlockMap.entityMap,
    );
    const newEditorState = EditorState.createWithContent(newContentState);

    editorStates[index] = newEditorState;

    this.setState({
      editorStates,
      currentEditor: index,
    });
  }

  handleCountSectionWords = () => {
    if (!this.state.testStarted) {
      return;
    }

    return SectionWordsEvent.onSectionWordsEvent(this.eventId, this.sendEvent);
  };

  handleCalculateSectionWords = () => {
    const { editorStates } = this.state;

    editorStates.map((val, index) => {
      const sectionId = this.getSectionId(index);
      SectionWordsEvent.addWordCount(
        sectionId,
        val.getCurrentContent().getPlainText(),
      );
    });
  };

  handleCountKeywords = () => {
    if (!this.state.testStarted) {
      return;
    }
    const { challenge } = this.props;
    const { editorStates } = this.state;
    const keywords = challenge.card_keywords || [];
    keywords.map(keyword => {
      editorStates.map((val, index) => {
        const sectionId = this.getSectionId(index);
        KeywordEvent.addKeywordCount(
          keyword,
          val.getCurrentContent().getPlainText(),
          sectionId,
        );
      });
      KeywordEvent.addKeyword(keyword);
    });
    return KeywordEvent.onKeywordsEvent(this.eventId, this.sendEvent);
  };

  handleKeyBinding = (index, event) => {
    if (!this.state.testStarted) {
      return;
    }

    const key = event.key;
    const { editorStates } = this.state;
    const sectionId = this.getSectionId(index);

    // catch first word writing time

    if (this.firstTyping[index] === undefined) {
      const duration = this.getCurrentTimer();
      this.firstTyping[index] = duration;
      // console.log('firsttypingevent : ', duration);
      FirstTypingEvent.onSetFirstWord(sectionId, duration);
    }

    // catch first Keyword writing time

    if (this.firstKeywordFound[index] === undefined) {
      dummyKeywords.map(val => {
        if (
          editorStates[index]
            .getCurrentContent()
            .getPlainText()
            .includes(val)
        ) {
          const duration = this.getCurrentTimer();

          this.firstKeywordTyping[index] = duration;
          FirstTypingEvent.onSetFirstKeyWord(sectionId, duration);
          this.firstKeywordFound[index] = true;
        }
      });
    }

    // Revision - Number of deleted strokes

    const curWordCount = this.getSectionWordCount(index);
    // console.log('curwordcount : ', curWordCount);

    if (key === 'Backspace' || key === 'Delete') {
      RevisionEvent.addDeletedCount(sectionId);
      this.startedWriting = false;

      if (this.deletePressed[sectionId] === undefined) {
        this.deletePressed[sectionId] = {
          startedAt: Date.now(),
          wordCount: curWordCount,
        };
      } else if (
        !this.writeWithin3s &&
        this.deletePressed[sectionId] &&
        this.deletePressed[sectionId].wordCount
      ) {
        RevisionEvent.calcAverageWroteAfter3s(
          sectionId,
          curWordCount - this.deletePressed[sectionId].wordCount,
        );
        this.deletePressed[sectionId] = undefined;
      }

      // track words within 30s

      if (this.countFromDelete[sectionId] === undefined) {
        this.wordWithin30s[sectionId] = { start: curWordCount };
        this.countFromDelete[sectionId] = setTimeout(() => {
          RevisionEvent.calcMaxWordsWithin30s(
            sectionId,
            curWordCount - this.wordWithin30s[sectionId].start,
          );
          this.wordWithin30s[sectionId] = {};
          this.countFromDelete[sectionId] = null;
        }, this.timerLimit);
      } else {
        clearTimeout(this.countFromDelete[sectionId]);
        RevisionEvent.calcMaxWordsWithin30s(
          sectionId,
          curWordCount - this.wordWithin30s[sectionId].start,
        );
        this.wordWithin30s[sectionId] = {};
        this.countFromDelete[sectionId] = null;
      }
    }

    if (
      key.match(regex.letterAndnumber) &&
      !this.startedWriting &&
      this.deletePressed[sectionId] &&
      this.deletePressed[sectionId].startedAt !== undefined
    ) {
      const duration = Date.now() - this.deletePressed[sectionId].startedAt;

      if (duration < 3000) {
        RevisionEvent.addWriteWithin3s(sectionId);
        this.writeWithin3s = true;
      } else {
        this.writeWithin3s = false;
      }
      RevisionEvent.calcAverageWaiting(sectionId, duration);

      this.startedWriting = true;
    }

    // Revision - number of time of writing happening within 3s of deleting
  };

  handleSendFirstKeyEvent = () => {
    if (!this.state.testStarted) {
      return;
    }

    return FirstTypingEvent.onSendFirstWord(this.eventId, this.sendEvent);
  };

  handleSendFirstKeywordEvent = () => {
    if (!this.state.testStarted) {
      return;
    }

    return FirstTypingEvent.onSendFirstKeyWord(this.eventId, this.sendEvent);
  };

  getSendSectionDataEvent = () => {
    if (!this.state.testStarted) {
      return;
    }

    const { editorStates } = this.state;

    editorStates.map((val, index) => {
      SectionDataEvent.addSectionData(
        index,
        val.getCurrentContent().getPlainText(),
        this.getSectionId(index),
      );
    });
    return SectionDataEvent.getSectionDataEvent();
  };

  handleRevisionEvent = () => {
    if (!this.state.testStarted) {
      return;
    }

    return RevisionEvent.onSendRevisionEvent(this.eventId, this.sendEvent);
  };

  // Event Handlers End

  renderTable = () => {
    return (
      <table className="card-table">
        <thead>
          <th />
          <th>Prop 1</th>
          <th>Prop 2</th>
          <th>Prop 3</th>
          <th>Prop 4</th>
          <th>Prop 5</th>
          <th>Prop 6</th>
        </thead>
        <tbody>
          <tr>
            <td>Price</td>
            <td>$1,199,000</td>
            <td>$629,000</td>
            <td>$869,000</td>
            <td>$649,000</td>
            <td>$934,000</td>
            <td>$998,000</td>
          </tr>
          <tr>
            <td>Property Type</td>
            <td>Freehold- Detached</td>
            <td>Condominium</td>
            <td>Freehold- Townhome</td>
            <td>Condominium</td>
            <td>Condominium</td>
            <td>Freehold- Townhome </td>
          </tr>
          <tr>
            <td>Occupancy</td>
            <td>Owner</td>
            <td>Owner</td>
            <td>Owner</td>
            <td>Owner</td>
            <td>Owner</td>
            <td>Vacant</td>
          </tr>
          <tr>
            <td>Size/Room Detail</td>
            <td>1501 to 2000 square foot range</td>
            <td>
              Bedroom: 3.83m x 2.63 Living room: 6.42m x 3.47 Kitchen: 4.95m x
              2.43 Master bedroom: 5.01m x 3.09 Breakfast: 4.95m x 2.43
            </td>
            <td>
              Bedroom: 3.18m x 2.39 Dining room: 3.66m x 1.83 Living room: 3.58m
              x 3.51 Kitchen: 3.25m x 2.72 Master bedroom: 4.14m x 2.57 Family
              room: 5.84m x 2.97
            </td>
            <td>
              Den: 2.48m x 1.82 Dining room: 4.5m x 3.75 Living room: 4.5m x
              3.75 Kitchen: 4.5m x 2.33 Master bedroom: 3.5 x 2.65
            </td>
            <td>
              Dining room: 3.38m x 2.13 Living room: 2.95m x 2.13 Kitchen: 3.86m
              x 2.26 Master bedroom: 3.45 x 4.57 Foyer: 2.51m x 2.97
            </td>
            <td>
              Bedroom: 3.81m x 3.48 Bedroom: 3.81m x 2.71 Living room: 6.93m x
              3.25 Kitchen: 2.84m x 2.49 Master bedroom: 4.52m x 3.07
            </td>
          </tr>
          <tr>
            <td>Stories</td>
            <td>2</td>
            <td>14</td>
            <td>2</td>
            <td>2</td>
            <td>5</td>
            <td>2</td>
          </tr>
          <tr>
            <td>Community features</td>
            <td>Grocery stores, public transit, park, library</td>
            <td>
              Public transit, indoor pool, park, games room, exercise room,
              visitor parking, tennis court, security guard
            </td>
            <td>Grocery stores, public transit, park</td>
            <td>
              Park, public transit, gym, library, exercise room, ravine,
              concierge, bike storage{' '}
            </td>
            <td>
              Beach, clear view, arts centre, library, security system, party
              room, school, BBQs allowed, public transit{' '}
            </td>
            <td>
              Public transit, museum, school, parkette, community centre,{' '}
            </td>
          </tr>
          <tr>
            <td>Parking </td>
            <td>Garage, double wide private driveway</td>
            <td>Underground - owned</td>
            <td>None</td>
            <td>Underground - rented</td>
            <td>Underground - owned</td>
            <td>None</td>
          </tr>
          <tr>
            <td>Area</td>
            <td>Vaughan</td>
            <td>North York</td>
            <td>Bloor West</td>
            <td>Bloor West</td>
            <td>Lakeshore East</td>
            <td>North York</td>
          </tr>
        </tbody>
      </table>
    );
  };

  render() {
    const {
      match: {
        params: { challengeId, pipelineId },
      },
      // user,
      // result,
      challenge,
      classes,
      i18nState,
    } = this.props;
    if (challenge === null) {
      return '';
    }

    const sectionPlaceholders = [
      this.context.t('identify-the-problem'),
      this.context.t('highlight-key-sentences'),
      this.context.t('brainstorm-viable'),
      this.context.t('use-your-creativity'),
    ];

    const questionModalOpts = [
      {
        label: this.context.t('dont-pick'),
        value: '0',
        description: 'You will lose 00:00 minutes',
        content: this.context.t('nothing-for-you'),
        time: '00:00',
      },
      {
        label: this.context.t('take-the-call'),
        value: '1',
        description: 'You will lose 03:00 minutes',
        content: this.context.t('the-client-tells-you-03'),
        time: '03:00',
      },
      {
        label: this.context.t('take-the-call-later'),
        value: '2',
        description: 'You will lose 01:30 minutes',
        content: this.context.t('the-client-tells-you-1-30'),
        time: '01:30',
      },
    ];

    const consultingModalOpts = [
      {
        label: this.context.t('consult-card-desc-1'),
        value: '0',
        description: 'You will lose 00:00 minutes',
        content: this.context.t('consult-card-desc-1'),
        time: '00:00',
      },
      {
        label: this.context.t('consult-card-desc-2'),
        value: '1',
        description: 'You will lose 03:00 minutes',
        content: this.context.t('consult-card-desc-2'),
        time: '03:00',
      },
      {
        label: this.context.t('consult-card-desc-3'),
        value: '2',
        description: 'You will lose 01:00 minutes',
        content: this.context.t('consult-card-desc-3'),
        time: '01:00',
      },
    ];

    const pitchDesc = 'blue-sky-music-proposal-description';
    const communicateDesc = 'help-a-first-time-homebuyer-description';
    const dataScientistDesc = 'data-science-description';
    const b2bDesc = 'business-to-business-sales-description';
    const marketingDesc = 'marketing-description';
    const strategyDesc = 'business-strategy-proposal-description';
    const engineerDesc = 'software-engineering-challenge-description';
    const consultingDesc = 'consulting-description';
    const crisisDesc = 'crisis-description';

    let dummyCards;
    let dummyDetails;
    if (challenge.test_desc === pitchDesc) {
      dummyDetails = {
        testName: pitchIdea.title,
        testDesc: pitchIdea.desc,
      };
      dummyCards = [dummyDetails, ...pitchIdea.res];
    } else if (challenge.test_desc === communicateDesc) {
      dummyDetails = {
        testName: communicateValue.title,
        testDesc: communicateValue.desc,
      };
      dummyCards = [dummyDetails, ...communicateValue.res];
    } else if (challenge.test_desc === dataScientistDesc) {
      dummyDetails = {
        testName: dataScientist.title,
        testDesc: dataScientist.desc,
      };
      dummyCards = [dummyDetails, ...dataScientist.res];
    } else if (challenge.test_desc === b2bDesc) {
      dummyDetails = {
        testName: b2b.title,
        testDesc: b2b.desc,
      };
      dummyCards = [dummyDetails, ...b2b.res];
    } else if (challenge.test_desc === marketingDesc) {
      dummyDetails = {
        testName: marketing.title,
        testDesc: marketing.desc,
      };
      dummyCards = [dummyDetails, ...marketing.res];
    } else if (challenge.test_desc === strategyDesc) {
      dummyDetails = {
        testName: strategy.title,
        testDesc: strategy.desc,
      };
      dummyCards = [dummyDetails, ...strategy.res];
    } else if (challenge.test_desc === engineerDesc) {
      dummyDetails = {
        testName: engineer.title,
        testDesc: engineer.desc,
      };
      dummyCards = [dummyDetails, ...engineer.res];
    } else if (challenge.test_desc === consultingDesc) {
      dummyDetails = {
        testName: consulting.title,
        testDesc: consulting.desc,
      };
      dummyCards = [dummyDetails, ...consulting.res];
    } else if (challenge.test_desc === crisisDesc) {
      dummyDetails = {
        testName: crisisManagement.title,
        testDesc: crisisManagement.desc,
      };
      dummyCards = [dummyDetails, ...crisisManagement.res];
    } else {
      dummyDetails = {
        testName: testdata.title,
        testDesc: testdata.desc,
      };
      dummyCards = [dummyDetails, ...testdata.res];
    }

    const {
      editorStates,
      // currentEditor,
      paneSwitch,
      startTestError,
      sections,
      previewMode,
    } = this.state;

    // const currentState = editorStates[currentEditor]
    //   ? editorStates[currentEditor]
    //   : EditorState.createEmpty();

    let leftPane = 4;
    let rightPane = 8;
    if (paneSwitch) {
      leftPane = 5;
      rightPane = 7;
    }

    const tourConfigSets = tourConfig.map((tc, index) => ({
      ...tc,
      content: ({ goTo, inDOM }) => (
        <div>
          <div className="tourHeader">
            <Typography component="div" className="tourHeader-step">
              Tutorials {index + 1} of {tourConfig.length}{' '}
            </Typography>
            <Button
              variant="text"
              className="tourHeader-skip"
              onClick={this.closeTour}
            >
              Skip
            </Button>
          </div>
          <br />
          {this.context.t(tc.content)}
        </div>
      ),
    }));

    return (
      <React.Fragment>
        <Grid container>
          <Grid item xs={12}>
            <div
              className={`headerContainer ${
                this.state.showFaq ? 'faq-header' : ''
              }`}
            >
              <Grid container>
                <Grid item md={6} xs={6}>
                  <div className="logo__img" />
                </Grid>
                <div className="header-right-section">
                  {(this.state.testStarted || this.state.isTourOpen) && (
                    <div className="tour-step-6 header-right-items">
                      <Button
                        className="submit__button"
                        variant="outlined"
                        color="primary"
                        onClick={this.handleClickFinish}
                      >
                        {this.context.t('finish')}
                      </Button>
                      <Timer
                        fullTime={this.state.fullTime}
                        isSubtracted={this.state.isSubtracted}
                        onFinish={this.handleFinishTest}
                        onRender={this.handleCountTimer}
                        fire={[300, 120, 30]}
                        onFire={this.openTimerModal}
                        timerStarted={this.state.testStarted}
                        key={this.state.fullTime}
                      />
                    </div>
                  )}
                  {this.state.previewMode && (
                    <div className="tour-step-6 header-right-items">
                      <Button
                        className="submit__button_skip"
                        variant="outlined"
                        color="primary"
                        onClick={this.handleEndPreview}
                      >
                        {this.context.t('skip')}
                      </Button>
                      <div className="preview-timer">
                        <Timer
                          fullTime={2 * 60} // 2 min
                          prefix={this.context.t('preview-mode')}
                          timerStarted={this.state.previewMode}
                          onFinish={this.handleEndPreview}
                          key={this.state.previewMode}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Grid>
              {this.state.showFaq && (
                <Grid container>
                  <Grid item md={12} xs={12}>
                    <div className="faq-text">
                      <h2>{this.context.t('how-can-we-help')}</h2>
                      <p>{this.context.t('how-can-we-help-explain')}</p>
                    </div>
                    <div className="faq-button-container">
                      <Tabs
                        classes={{
                          root: classes.tabsRoot,
                          indicator: classes.tabsIndicator,
                        }}
                        className="faq-tab-container"
                        value={this.state.faqType}
                        onChange={this.onChangeFaqType}
                      >
                        <Tab
                          className="faq-tab-item"
                          classes={{
                            root: classes.tabRoot,
                            selected: classes.tabSelected,
                          }}
                          label={this.context.t('general')}
                        />
                        <Tab
                          className="faq-tab-item"
                          classes={{
                            root: classes.tabRoot,
                            selected: classes.tabSelected,
                          }}
                          label={this.context.t('application')}
                        />
                        <Tab
                          className="faq-tab-item"
                          classes={{
                            root: classes.tabRoot,
                            selected: classes.tabSelected,
                          }}
                          label={this.context.t('other')}
                        />
                      </Tabs>
                    </div>
                  </Grid>
                </Grid>
              )}
            </div>
          </Grid>
          {this.state.showFaq && (
            <Faq onClose={this.hideFaqOverlay} faqType={this.state.faqType} />
          )}
          {!this.state.showFaq && (
            <>
              <Grid item xs={12}>
                <div className="overview-section">
                  <ExpansionPanel
                    className={`tour-step-0 card-container first-card ${
                      this.state.blinkStyle
                    }`}
                    expanded={this.state.overviewExpanded}
                    onChange={(event, expanded) => {
                      this.setState({
                        overviewExpanded: expanded,
                      });
                      this.handleChangeAccordion(0)();
                    }}
                    key={0}
                  >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <p className="card-header">
                        {this.state.isTourOpen &&
                          this.context.t('challenge-instructions')}
                        {!this.state.isTourOpen &&
                          (this.context.t(dummyDetails.testName) ||
                            'Test name not found')}
                        <span
                          className="accordion__arrow"
                          role="presentation"
                        />
                      </p>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <div className="card-body">
                        {this.state.isTourOpen && loremIpsum}
                        {(!this.state.isTourOpen &&
                          this.context.t(dummyDetails.testDesc)) ||
                          'No Desc Provided'}
                      </div>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </div>
              </Grid>
              <Grid item xs={12}>
                <Grid container className="main__panel">
                  <Grid item md={leftPane} xs={leftPane}>
                    <div className="cardContainer ">
                      <div className="tour-step-1">
                        {dummyCards.map((card, ind) => {
                          if (ind === 0) {
                            return '';
                          } else if (
                            card.visible === true &&
                            !this.state.openFourthPanel &&
                            (challenge.test_desc === engineerDesc ||
                              challenge.test_desc === consultingDesc ||
                              challenge.test_desc === crisisDesc)
                          ) {
                            return '';
                          }
                          return (
                            <>
                              {card.visible === true && this.state.badgeMode && (
                                <Badge
                                  color="error"
                                  variant="dot"
                                  style={{
                                    float: 'right',
                                    backgroundColor: '#dd628f',
                                  }}
                                  className="badge-style"
                                />
                              )}
                              <ExpansionPanel
                                className={`card-container ${
                                  ind === 2 ? 'tour-step-4' : ''
                                }`}
                                expanded={ind === this.state.curCard}
                                onChange={this.handleChangeAccordion(ind)}
                                key={ind}
                              >
                                <ExpansionPanelSummary
                                  expandIcon={<ExpandMoreIcon />}
                                >
                                  <p className="card-header">
                                    {this.state.isTourOpen &&
                                      `${this.context.t('resource')} ${ind}`}
                                    {!this.state.isTourOpen &&
                                      (this.context.t(card.name) ||
                                        this.context.t('no-card-name'))}
                                    <span
                                      className="accordion__arrow"
                                      role="presentation"
                                    />
                                  </p>
                                </ExpansionPanelSummary>

                                <ExpansionPanelDetails>
                                  <div
                                    className={`card-body`}
                                    id={
                                      this.state.isTourOpen && ind === 1
                                        ? 'tour-selections'
                                        : ''
                                    }
                                  >
                                    {card.desc &&
                                      card.desc === 'table' &&
                                      card.type &&
                                      card.type === 'dom' &&
                                      this.renderTable()}
                                    {card.desc &&
                                      card.type === 'dom' &&
                                      card.desc !== 'table' &&
                                      card.desc(i18nState.lang, this)}
                                    {!card.type &&
                                      card.desc &&
                                      card.desc
                                        .split('\n')
                                        .map((val, index) => {
                                          return <p key={index}>{val}</p>;
                                        })}
                                  </div>
                                </ExpansionPanelDetails>
                              </ExpansionPanel>
                            </>
                          );
                        })}
                      </div>
                    </div>
                    <div className="paneSwitcher">
                      <div
                        className="paneSwitch"
                        onClick={this.handleSwitchPane}
                      />
                    </div>
                  </Grid>

                  <Grid item md={rightPane} xs={rightPane}>
                    <div className="editContainer">
                      <div className="tour-step-3">
                        {editorStates.map((editorState, index) => {
                          if (index < 4) {
                            return (
                              <ExpansionPanel
                                onClick={this.handleClickSection(index)}
                                onChange={this.handleChangeEditor(index)}
                                className={`section-container ${
                                  index === 1 ? 'tour-step-5' : ''
                                }`}
                                expanded={
                                  this.state.sectionExpanded[index] ||
                                  (this.state.isTourOpen &&
                                    index === 1 &&
                                    this.state.curSection === 1)
                                    ? true
                                    : false
                                }
                                key={index}
                              >
                                <ExpansionPanelSummary
                                  expandIcon={
                                    <>
                                      <ExpandMoreIcon />
                                      <DeleteOutlinedIcon
                                        onClick={this.handleDeleteSection(
                                          index,
                                        )}
                                        className={`section-delete-icon ${
                                          index > 3
                                            ? 'section-delete-icon-show'
                                            : ''
                                        }`}
                                      />
                                    </>
                                  }
                                  IconButtonProps={{
                                    className: 'section-expand-more-icon',
                                    disableRipple: true,
                                  }}
                                >
                                  <span className="section-header">
                                    {sections[index]}
                                  </span>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails
                                  className={`expansion-panel-details`}
                                >
                                  <RichEditor
                                    className="draftEditor"
                                    editorState={editorState}
                                    placeholder={
                                      sectionPlaceholders[index] || ''
                                    }
                                    onChange={this.onChange.bind(this, index)}
                                    handlePasteText={this.handlePasteText(
                                      index,
                                    )}
                                    onFocus={this.handleSectionFocus.bind(
                                      this,
                                      index,
                                    )}
                                    onBlur={this.handleSectionBlur.bind(
                                      this,
                                      index,
                                    )}
                                    handleDropped={this.handleDropped.bind(
                                      this,
                                      index,
                                    )}
                                    handleKeyBinding={this.handleKeyBinding.bind(
                                      this,
                                      index,
                                    )}
                                    onDropText={this.handleDropText(index)}
                                    showDndStatus={
                                      this.state.isTourOpen &&
                                      index === 1 &&
                                      this.state.curSection === 1
                                    }
                                    key={index}
                                  />
                                  <div className="section-word-counter">
                                    {this.getSectionWordCount(index)}
                                  </div>
                                </ExpansionPanelDetails>
                              </ExpansionPanel>
                            );
                          }
                          return (
                            <ExpansionPanel
                              onChange={this.handleChangeEditor(index)}
                              className={`section-container ${index === 0 &&
                                'tour-step-3'}`}
                              expanded={
                                this.state.sectionExpanded[index] ? true : false
                              }
                              key={index}
                            >
                              <ExpansionPanelSummary
                                expandIcon={
                                  <>
                                    <ExpandMoreIcon />
                                    <DeleteOutlinedIcon
                                      onClick={this.handleDeleteSection(index)}
                                      className={`section-delete-icon ${
                                        index > 3
                                          ? 'section-delete-icon-show'
                                          : ''
                                      }`}
                                    />
                                  </>
                                }
                                IconButtonProps={{
                                  className: 'section-expand-more-icon',
                                  disableRipple: true,
                                }}
                              >
                                {this.state.editingTitle && (
                                  <input
                                    className="newCardTitle"
                                    type="text"
                                    placeholder={this.context.t('title')}
                                    onClick={evt => evt.stopPropagation()}
                                    required
                                  />
                                )}
                                {!this.state.editingTitle && (
                                  <span className="section-header">
                                    {sections[index]}
                                  </span>
                                )}
                              </ExpansionPanelSummary>
                              <ExpansionPanelDetails className="expansion-panel-details">
                                <RichEditor
                                  className="draftEditor"
                                  editorState={editorState}
                                  placeholder={
                                    sectionPlaceholders[index] ||
                                    this.context.t('type-away-what')
                                  }
                                  onChange={this.onChange.bind(this, index)}
                                  handlePasteText={this.handlePasteText(index)}
                                  onFocus={this.handleSectionFocus.bind(
                                    this,
                                    index,
                                  )}
                                  onBlur={this.handleSectionBlur.bind(
                                    this,
                                    index,
                                  )}
                                  handleDropped={this.handleDropped.bind(
                                    this,
                                    index,
                                  )}
                                  handleKeyBinding={this.handleKeyBinding.bind(
                                    this,
                                    index,
                                  )}
                                  onDropText={this.handleDropText(index)}
                                  key={index}
                                />
                                <div className="section-word-counter">
                                  {this.getSectionWordCount(index)}
                                </div>
                              </ExpansionPanelDetails>
                            </ExpansionPanel>
                          );
                        })}
                        {!previewMode && (
                          <div
                            className="addNew"
                            onClick={this.handleNewSection}
                          >
                            <i className="fa fa-plus" />
                            <p>{this.context.t('add-new-section')}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
          {!this.state.showFaq && (
            <Button
              onClick={this.showFaqOverlay}
              className="help_but tour-step-2"
              variant="contained"
              color="primary"
            >
              {this.context.t('help')}
            </Button>
          )}
          <StartTest
            show={this.state.showStartModal}
            onHide={() => {
              this.setState({ showStartModal: true });
            }}
            onStart={this.handleStartTest}
            onCancel={this.handleCancelTest}
            startTestError={startTestError}
          />
          <ConfirmModal
            isOpened={this.state.openDeleteModal}
            onConfirm={this.confirmDelete}
            onCancel={() => this.setState({ openDeleteModal: false })}
            title="Are you sure you want to delete this?"
            content="Once you delete this card, you won't be able to get it back."
            confirmText="Delete"
          />
          <ConfirmModal
            isOpened={this.state.openTimerModal}
            onConfirm={this.confirmCloseTimerModel}
            onCancel={() => this.setState({ openTimerModal: false })}
            title="Almost there..."
            content={this.getTimerModalContent()}
            confirmText="OK"
          />
          <ConfirmModal
            isOpened={this.state.openLeaveModal}
            onConfirm={this.closeModal}
            onCancel={this.handleConfirmNavigationClick}
            title={this.context.t('are-you-sure')}
            content={this.context.t('content-exit-challenge')}
            confirmText={this.context.t('continue-the-challenge')}
            cancelText={this.context.t('exit')}
          />
          <ConfirmModal
            isOpened={this.state.openFinishModal}
            onConfirm={this.handleConfirmFinish}
            onCancel={this.handleResumeChallenge}
            title={this.context.t('are-you-sure')}
            content={this.context.t('content-finish-challenge')}
            confirmText={this.context.t('finish')}
            cancelText={this.context.t('continue-the-challenge')}
          />
          <ConfirmModal
            isOpened={this.state.openRunoutModal}
            title={this.context.t('time-up')}
            content={this.context.t('hard-part-over')}
          />
        </Grid>
        <PreviewModal
          isOpened={this.state.openPreviewModal}
          onConfirm={this.handleStartPreviewMode}
          onClose={this.handleClosePreviewModal}
        />
        <QuestionModal
          isOpened={
            this.state.openQuestionModal && challenge.test_desc === engineerDesc
          }
          title={this.context.t('wild-card')}
          titleDesc={this.context.t('wild-card-header-description')}
          contentDesc={this.context.t('you-just-noticed')}
          options={questionModalOpts}
          onConfirm={this.handleStartQuestionMode}
          onClose={this.handleCloseQuestionModal}
        />
        <QuestionModal
          isOpened={
            this.state.openQuestionModal &&
            (challenge.test_desc === consultingDesc ||
              challenge.test_desc === crisisDesc)
          }
          title={this.context.t('wild-card')}
          contentDesc={this.context.t('consulting-card-header-description')}
          options={consultingModalOpts}
          onConfirm={this.handleStartQuestionMode}
          onClose={this.handleCloseQuestionModal}
        />
        <Tour
          onRequestClose={this.closeTour}
          steps={tourConfigSets}
          isOpen={this.state.isTourOpen}
          goToStep={this.state.tourStep}
          nextStep={this.handleNextTourStep}
          prevStep={this.handlePrevTourStep}
          getCurrentStep={this.handleCurrentStep}
          showCloseButton={false}
          closeWithMask={false}
          maskClassName="mask"
          className="helper"
          rounded={15}
          showNavigation={false}
          showNumber={false}
          accentColor={'#46415e'}
          disableInteraction
          prevButton={
            <Button
              style={{
                borderRadius: '20px',
              }}
              variant="outlined"
              color="primary"
            >
              {this.context.t('prev')}
            </Button>
          }
          nextButton={
            <Button
              style={{
                borderRadius: '20px',
              }}
              variant="contained"
              color="primary"
            >
              {this.context.t('next')}
            </Button>
          }
          lastStepNextButton={
            <Button
              style={{
                borderRadius: '20px',
              }}
              variant="contained"
              color="primary"
            >
              {this.context.t('next')}
            </Button>
          }
        />
        <Prompt message={this.handleBlockedNavigation} />
      </React.Fragment>
    );
  }
}

TakeTest.contextTypes = {
  t: PropTypes.func,
};

TakeTest.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  match: PropTypes.shape({
    params: {
      challengeId: PropTypes.string.isRequired,
      pipelineId: PropTypes.string.isRequired,
    },
  }),
  user: PropTypes.object.isRequired,
  result: PropTypes.object.isRequired,
  challenge: PropTypes.object.isRequired,
  getChallenge: PropTypes.func.isRequired,
  addResult: PropTypes.func.isRequired,
  sendEvent: PropTypes.func.isRequired,
  curCandidate: PropTypes.object,
  classes: PropTypes.object.isRequired,
  storeTestData: PropTypes.func.isRequired,
  createCandidate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.authReducer.user,
  result: state.resultReducer.result,
  challenge: state.challengeReducer.curChallenge,
  curCandidate: state.candidateReducer.curCandidate,
  i18nState: state.i18nState,
});

const mapDispatchToProps = {
  getChallenge,
  createCandidate,
  addResult,
  sendEvent,
  storeTestData,
};

export default withRouter(
  withStyles(tabClasses)(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(TakeTest),
  ),
);
