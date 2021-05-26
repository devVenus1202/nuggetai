import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import moment from 'moment';

import { Add, ArrowBack } from '@material-ui/icons';
import Fab from '@material-ui/core/Fab';

import { connect } from 'react-redux';
import copy from 'copy-to-clipboard';

import { candidateList } from '../../airtable/candidate';
import { digitalList } from '../../airtable/digital';
import { bubbleData, getSkillCategories } from '../../airtable/general';
import { ScatterPlot } from '../Charts/Charts';
import { BubbleChart } from '../Charts/BubbleChart';
import {
  Grid,
  Typography,
  Snackbar,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  withStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  InputBase,
} from '@material-ui/core';

import challengeActions from '../../redux/challenge/actions';
import pipelineActions from '../../redux/pipeline/actions';
import candidateActions from '../../redux/candidate/actions';
import SliderPane from '../../components/SliderPane';
import AddPipelineModal from '../../components/Modals/AddPipelineModal';
import ChartDetailModal from '../../components/Modals/ChartDetailModal';
import TestCardDeleteModal from '../../components/Modals/TestCardDeleteModal/TestCardDeleteModal';

import ConfirmModal from '../../components/Modals/ConfirmModal';
import PipeLine from '../../components/PipeLine';
import InfoCard from '../../components/InfoCard';
import TableDataSetting from '../../components/Modals/TableDataSetting';
import Footer from '../../components/Footer/Footer';

import getDummyProfiles from './dummyProfiles';
import ProgressStepper from './ProgressStepper';
import SettingMenu from './SettingMenu';
// import { items } from '../CreateTest/Steps/data';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './Results.scss';
import WaitingImage from '../../images/results/waiting.png';

// import RankTable from './RankTable';
// import PipelineSelector from './PipelineSelector';
// import DataTable from '../../components/DataTable';
// import TalentRelationship from './TalentRelationship';
// import TreeGraph from './TreeGraph/TreeGraph';
// import CharacterTabs from './Tabs/CharacterTabs';
// import { clone } from 'lodash';

import TalentFunnel from './TalentFunnel';
import TeamDynamic from './TeamDynamic';
import NotFound from '../NotFound/NotFound';

const { getChallenge, updateChallenge, deleteChallenge } = challengeActions;
const { createPipeline, deletePipeline, updatePipeline } = pipelineActions;
const { updateCandidate } = candidateActions;

const DUMMY_RESULTS = '123456';
// const activeChallenges = items.filter(i => i.active);

// const pipelinesData = [
//   { id: 0, title: 'Digital Team', color: '#552c84', value: 'digital' },
//   { id: 1, title: 'External Candidates', color: '#fc8e7f', value: 'external' },
// ];
// const polarData = [
//   {
//     name: 'Digital Team',
//     data: [43000, 19000, 60000, 45000, 40000],
//     pointPlacement: 'on',
//     color: '#552c84',
//   },
//   {
//     name: 'External Candidates',
//     data: [50000, 39000, 42000, 31000, 40000],
//     pointPlacement: 'on',
//     color: '#fc8e7f',
//   },
// ];

// const simulted = {
//   name: 'Simulated - Digital Team',
//   type: 'area',
//   data: [20000, 30000, 40000, 30000, 55000],
//   pointPlacement: 'on',
//   fillOpacity: 0.8,
//   color: '#0066FF',
// };

// const pipelinePolarDat = {
//   'Digital Team': {
//     name: 'Current - Digital Team',
//     data: [43000, 19000, 60000, 45000, 40000],
//     pointPlacement: 'on',
//     color: '#552c84',
//   },
//   'External Candidates': {
//     name: 'Current - External Candidates',
//     data: [50000, 39000, 42000, 31000, 7000],
//     pointPlacement: 'on',
//     color: '#fc8e7f',
//   },
// };

// const bubbleChartDummyData = [
//   {
//     label: 'Attention to Detail',
//     value: 35.3,
//     description:
//       'Creativity is donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.',
//     positions: [
//       { name: 'Business Analyst', rank: 1 },
//       { name: 'Product Manager', rank: 1 },
//       { name: 'Sales Associate', rank: 1 },
//     ],
//     color: '#5eb290',
//   },
//   {
//     label: 'Speed',
//     value: 25.3,
//     description:
//       'Creativity is donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.',
//     positions: [
//       { name: 'Business Analyst', rank: 1 },
//       { name: 'Product Manager', rank: 1 },
//       { name: 'Sales Associate', rank: 1 },
//     ],
//     color: '#fbb5c0',
//   },
//   {
//     label: 'Clarity',
//     value: 14.3,
//     description:
//       'Creativity is donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.',
//     positions: [
//       { name: 'Business Analyst', rank: 1 },
//       { name: 'Product Manager', rank: 1 },
//       { name: 'Sales Associate', rank: 1 },
//     ],
//     color: '#fc8e7f',
//   },
//   {
//     label: 'Neutrality',
//     value: 10.3,
//     description:
//       'Creativity is donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.',
//     positions: [
//       { name: 'Business Analyst', rank: 1 },
//       { name: 'Product Manager', rank: 1 },
//       { name: 'Sales Associate', rank: 1 },
//     ],
//     color: '#618bb2',
//   },
//   {
//     label: 'Planning',
//     value: 4.3,
//     description:
//       'Creativity is donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.',
//     positions: [
//       { name: 'Business Analyst', rank: 1 },
//       { name: 'Product Manager', rank: 1 },
//       { name: 'Sales Associate', rank: 1 },
//     ],
//     color: '#1890ff',
//   },
// ];

const PageTabs = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '20px',
    minHeight: '40px',
    width: 'max-content',
    margin: '0 20px',
  },
  indicator: {
    height: '100%',
    borderRadius: '20px',
    backgroundColor: '#8c92f7',
    zIndex: 1,
  },
}))(Tabs);
const PageTab = withStyles(theme => ({
  root: {
    backgroundColor: 'transparent',
    borderRadius: '20px',
    minHeight: '40px',
    minWidth: '140px',
    zIndex: 2,
  },
  selected: {
    color: 'white !important ',
    border: 'none',
    backgroundColor: '#transparent',
    '&$label': {
      fontSize: '15px',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
    },
  },
  textColorPrimary: {
    color: '#333333',
  },
}))(Tab);
// const PurpleInput = withStyles(theme => ({
//   root: {
//     'label + &': {
//       marginTop: theme.spacing.unit * 3,
//     },
//   },
//   input: {
//     borderRadius: 22.5,
//     position: 'relative',
//     backgroundColor: theme.palette.background.paper,
//     border: '1px solid #8c92f7',
//     fontSize: 15,
//     width: 'auto',
//     padding: '10px 26px 10px 12px',
//     color: '#8c92f7',
//     '&:focus': {
//       borderRadius: 22.5,
//     },
//   },
// }))(InputBase);
class Results extends Component {
  constructor(props) {
    super(props);

    let challenge = null;

    const { challengeId } = props.match.params;
    let pipelines = [],
      externalCandidates,
      candidates,
      digitalCandidates;

    if (challengeId !== DUMMY_RESULTS) {
      pipelines = null;
    }
    if (challengeId === DUMMY_RESULTS) {
      challenge = {
        test_name: 'Example Challenge',
      };
      externalCandidates = []; //getDummyProfiles(228, 1);
      digitalCandidates = []; //getDummyProfiles(50, 0);
      candidates = externalCandidates;
    } else {
      candidates = pipelines;
    }

    this.state = {
      selected: 0,
      challengeDesc: '',
      isPaneOpen: false,
      stepvalue: 1,
      open: false,
      showPipModal: false,
      showBubbleDetailModal: false,
      showSettingModal: false,
      snackBarOpen: false,
      snackBarMessageInfo: {},
      currentBenchmark: 0,
      hasGraph: false,
      filterValue: '',
      suggestions: [],
      currentPipeline: 0,
      userRange: 0,
      digitalCandidates,
      challengeId,
      candidates,
      talentCandidates: candidates,
      externalCandidates,
      challenge,
      pipelines,
      scatterAxis: { x: { title: '' }, y: { title: '' } },
      selectedUsers: [],
      currentBubble: {},
      showDeleteConfirmModal: false,
      currentPipelineId: 0,
      dummyPipelineTitles: ['Digital Team', 'External Candidates'],
      bubbleChartData: [],
      skillCategories: [],
      skillCategoriesData: [],
      pipelineAverageData: {},
      simulatedPipelineIndex: 0,
      simulatedData: [],
      progressStep: 1,
      showCardDeleteModal: false,
      isChangedUserState: false,
    };
    this.tableData = {
      fullname: '',
      score: 0,
    };
    this.snackBarQueue = [];
  }

  componentDidMount = async () => {
    Modal.setAppElement(this.el);
    const { challengeId } = this.props.match.params;
    const { getChallenge } = this.props;

    if (challengeId !== DUMMY_RESULTS) {
      getChallenge(challengeId);
    }
    if (challengeId === DUMMY_RESULTS) {
      this.initData();
    }
    // digitalCandidates = getDummyProfiles(50, 0);
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { challengeId } = this.props.match.params;
    console.log(this.state.isChangedUserState);
    console.log(prevState.isChangedUserState);
    if (
      challengeId !== DUMMY_RESULTS &&
      (prevProps.curChallenge !== this.props.curChallenge ||
        this.state.isChangedUserState !== prevState.isChangedUserState)
    ) {
      if (!this.props.curChallenge || !this.props.curChallenge['pipelines']) {
        return;
      }
      // if (this.props.curChallenge['status'] === 'deleted') {
      //   return;
      // }
      const { pipelines } = this.props.curChallenge;
      const candidates = pipelines.map(pipeline => pipeline.users);

      this.setState({
        challenge: this.props.curChallenge,
        pipelines,
        candidates: candidates[0],
        filteredCandidates: candidates[0],
        talentCandidates: candidates,
      });
    } else {
      //this.initData();
    }
  };

  async initData() {
    const externalCandidates = await candidateList({ pageSize: 100 }); //getDummyProfiles(228, 1);
    const digitalCandidates = await digitalList({ pageSize: 100 });
    const bubbleChartData = await bubbleData({});
    const skillCategoriesData = await getSkillCategories();
    const skillCategories = [];
    skillCategoriesData.forEach(item => skillCategories.push(item.label));
    let candidateScores = [0, 0, 0, 0];
    externalCandidates.forEach(item => {
      candidateScores.forEach((score, key) => {
        candidateScores[key] += Number(item[`skill_${key + 1}`]);
      });
    });
    let digitalScores = [0, 0, 0, 0];
    digitalCandidates.forEach(item => {
      digitalScores.forEach((score, key) => {
        digitalScores[key] += Number(item[`skill_${key + 1}`] || 0);
      });
    });

    const pipelines = [
      {
        _id: 0,
        color: '#552c84',
        users: externalCandidates,
        title: 'External Candidates',
      },
      {
        _id: 1,
        color: '#fc8e7f',
        users: digitalCandidates,
        title: 'Digital Team',
      },
    ];
    this.setState({
      externalCandidates,
      digitalCandidates,
      bubbleChartData,
      candidates: externalCandidates,
      filteredCandidates: externalCandidates,
      talentCandidates: externalCandidates,
      candidateScores,
      digitalScores,
      skillCategories,
      skillCategoriesData,
      pipelines,
    });
  }
  handleChangeChallengeDesc = event => {
    this.setState({
      challengeDesc: event.target.value,
    });
  };

  handleStepChange = event => {
    event.preventDefault();
    this.setState({ stepvalue: Math.random() });
  };

  handleChangeTab = value => {
    this.setState({ tabValue: value });
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  };

  handleClickAddPipeline = () => {
    this.setState({ showPipModal: true });
  };

  handleAddPipeline = (title, benchmark, color) => {
    this.setState({ showPipModal: false });
    const { challengeId: challenge_id } = this.props.match.params;
    const { challengeDesc: pipeline_desc } = this.state;
    const { createPipeline } = this.props;

    createPipeline({
      challenge_id,
      data: {
        title,
        pipeline_desc,
        benchmark,
        color,
      },
    });
  };

  removePipeline = () => {
    const { challengeId: challenge_id } = this.props.match.params;
    const { deletePipeline } = this.props;
    const { currentPipelineId } = this.state;
    deletePipeline({
      challenge_id,
      pipeline_id: currentPipelineId,
    });
    this.setState({
      showDeleteConfirmModal: false,
    });
  };
  handleRemovePipeline = pipeline_id => () => {
    this.setState({
      currentPipelineId: pipeline_id,
      showDeleteConfirmModal: true,
    });
    // const { challengeId: challenge_id } = this.props.match.params;
    // const { deletePipeline } = this.props;

    // deletePipeline({
    //   challenge_id,
    //   pipeline_id,
    // });
  };

  showSlidePane = (hasGraph, users) => (name, rank, score) => {
    this.tableData = { fullname: name, rank, score };

    this.setState({
      isPaneOpen: true,
      hasGraph,
      suggestions: users,
      tableData: { fullname: name, rank, score },
    });
  };

  handleClickPlot = (name, rank) => {
    this.tableData = { fullname: name, rank: rank };
    this.setState({
      isPaneOpen: true,
      hasGraph: true,
      suggestions: getDummyProfiles(60, 1),
      tableData: { fullname: name, rank: rank },
    });
  };

  openSnackBarWithObject = message => {
    this.snackBarQueue.push({
      message: message.title,
      feedback: message.feedback,
      key: new Date().getTime(),
    });
    if (this.state.snackBarOpen) {
      this.setState({ snackBarOpen: false });
    } else {
      this.processQueue();
    }
  };
  openSnackBar = title => {
    // push snackbar message to queue
    this.snackBarQueue.push({
      message: title,
      key: new Date().getTime(),
    });
    if (this.state.snackBarOpen) {
      this.setState({ snackBarOpen: false });
    } else {
      this.processQueue();
    }
  };

  processQueue = () => {
    if (this.snackBarQueue.length > 0) {
      this.setState({
        snackBarMessageInfo: this.snackBarQueue.shift(),
        snackBarOpen: true,
      });
    }
  };

  handleSnackBarClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackBarOpen: false });
  };

  handleChangeBenchmark = pid => {
    const { curChallenge, updatePipeline } = this.props;
    this.setState({ currentBenchmark: pid });
    console.log(pid);
    updatePipeline({
      challenge_id: curChallenge._id,
      pipeline_id: pid,
      data: {
        benchmark: true,
      },
    });
  };

  handleSettings = selected => {
    this.setState({ showSettingModal: true });
  };

  handleCopyLink = pipeline_id => () => {
    const { challengeId } = this.props.match.params;
    const link = `${window.location.host}/enter/${challengeId}/${pipeline_id}`;
    copy(link);
  };

  handleClickTitle = event => {
    event.stopPropagation();
  };

  handleTrackChange = event => {
    const { curChallenge, updateChallenge } = this.props;
    if (curChallenge) {
      const title = curChallenge.test_name;
      const curTitle = event.target.value;

      if (title !== curTitle) {
        updateChallenge({
          challengeId: curChallenge._id,
          data: {
            test_name: curTitle,
          },
        });
      }
    }
  };

  handleBlurDesc = event => {
    const { curChallenge, updateChallenge } = this.props;

    if (curChallenge) {
      const desc = curChallenge.test_desc;
      const newDesc = event.target.value;

      if (desc !== newDesc) {
        updateChallenge({
          challengeId: curChallenge._id,
          data: {
            test_desc: newDesc,
          },
        });
      }
    }
  };

  handleUpdatePipelineTitle = (pipeline_id, isDummy) => event => {
    if (isDummy) {
      let newTitles = this.state.dummyPipelineTitles;

      newTitles[pipeline_id] = event.target.value;

      this.setState({
        dummyPipelineTitles: newTitles,
      });

      return;
    }
    const { curChallenge, updatePipeline } = this.props;
    const curTitle = event.target.value;
    if (!curChallenge) {
      return;
    }

    updatePipeline({
      challenge_id: curChallenge._id,
      pipeline_id,
      data: {
        title: curTitle,
      },
    });
  };

  handleChangeFilterValue = filterValue => {
    this.setState({ filterValue });
  };

  handleChangePageTab = (event, value) => {
    this.setState({ selected: value });
  };

  // handleChangeSecondPipeline = pipeLine => {
  //   const { pipelineAverageData } = this.state;
  //   console.log(pipeLine);
  //   console.log(pipelineAverageData);
  //   const simulatedData = [];

  //   simulatedData.push(clone(pipelineAverageData[pipeLine.id]));
  //   console.log(pipelineAverageData[pipeLine.id].data);
  //   simulatedData[0].data = clone(pipelineAverageData[pipeLine.id].data);
  //   // this.setState({
  //   //   simulatedData: [pipelineAverageData[0], pipelineAverageData[1]],
  //   // });
  // };

  // handleChangeFilterPipeline = pipeline => {
  //   const { challengeId, digitalCandidates, externalCandidates } = this.state;
  //   if (challengeId === DUMMY_RESULTS) {
  //     if (pipeline.value === 'digital') {
  //       this.setState({ candidates: externalCandidates });
  //     } else {
  //       this.setState({ candidates: digitalCandidates });
  //     }
  //   } else {
  //     this.setState({ candidates: pipeline.users });
  //   }
  // };

  // handleChangeFunnelPipeline = pipeline => {
  //   const { challengeId, digitalCandidates, externalCandidates } = this.state;
  //   if (challengeId === DUMMY_RESULTS) {
  //     if (pipeline.value === 'digital') {
  //       this.setState({ talentCandidates: externalCandidates });
  //       this.setState({ filteredCandidates: externalCandidates });
  //     } else {
  //       this.setState({ talentCandidates: externalCandidates });
  //       this.setState({ filteredCandidates: digitalCandidates });
  //     }
  //   } else {
  //     this.setState({ talentCandidates: pipeline.users });
  //     this.setState({ filteredCandidates: pipeline.users });
  //   }
  // };

  handleSelectPipeline = pipeline => {
    this.handleChangePageTab(null, 0);
  };

  getFilteredCandidates = candidates => {
    const { filterValue } = this.state;
    return candidates.filter(
      user =>
        user.firstname.toLowerCase().includes(filterValue.toLowerCase()) ||
        user.lastname.toLowerCase().includes(filterValue.toLowerCase()),
    );
  };

  // setUserRange = range => {
  //   const filteredCandidates = [];
  //   const { talentCandidates, userRange } = this.state;
  //   if (userRange === range) {
  //     return;
  //   }
  //   talentCandidates.forEach(item => {
  //     if (item.rank <= range) {
  //       filteredCandidates.push(item);
  //     }
  //   });
  //   this.setState({ userRange: range, filteredCandidates });
  // };

  changeSelectedUser = user => {
    const { selectedUsers } = this.state;
    const existUser = selectedUsers.findIndex(item => item.id === user.id);
    if (existUser >= 0 && !user.isChecked) {
      selectedUsers.splice(existUser, 1);
    } else if (existUser < 0 && user.isChecked) {
      selectedUsers.push(user);
    }
    this.setState({ selectedUsers });
  };

  unSelectedUser = user => {
    const { selectedUsers } = this.state;
    const existUser = selectedUsers.findIndex(item => item.id === user.id);
    selectedUsers.splice(existUser, 1);
    this.setState({ selectedUsers });
  };

  /**
   * Select bubble and set data to detail modal
   */
  selectBubble = point => {
    this.setState({
      currentBubble: point,
      showBubbleDetailModal: true,
    });
  };

  onDelete = event => {
    const { curChallenge } = this.props;
    console.log('curChallenge', curChallenge);
    this.setState({ showCardDeleteModal: true, curChallenge });
  };

  hideTestCardDeleteModal = () => {
    this.setState({ showCardDeleteModal: false });
  };

  handleConfirmDelete = () => {
    this.setState({ showCardDeleteModal: false });
    const { deleteChallenge } = this.props;
    const { challengeId } = this.state;
    deleteChallenge(challengeId);
    this.props.history.push(`/dashboard`);
  };
  handleClickIcon = pid => (cId, type) => {
    const { updateCandidate, getChallenge } = this.props;
    const { challengeId } = this.state;

    console.log('XXXXXXXXxxxxxx§', challengeId);
    if (challengeId !== DUMMY_RESULTS) {
      console.log(123123123123123123123123123123123123);
      updateCandidate({
        challengeId,
        pipelineId: pid,
        userId: cId,
        data: {
          state: type,
        },
      });
      getChallenge(challengeId);
    } else {
    }
    this.setState(prevState => ({
      isChangedUserState: !prevState.isChangedUserState,
    }));
  };

  render() {
    console.log('21313123123123123131');
    Modal.setAppElement(this.el);
    const { curChallenge } = this.props;
    const {
      // challengeDesc,
      hasGraph,
      digitalCandidates,
      externalCandidates,
      pipelines,
      // candidates,
      challengeId,
      challenge,
      // selectedUsers,
      // c,
    } = this.state;
    // let pipelines = [];
    // if (curChallenge) {
    //   pipelines = curChallenge.pipelines;
    // }

    if (challenge === null && challengeId !== DUMMY_RESULTS) {
      return '';
    }

    const isFullScreenPipeline = true;

    const PIPELINE_LIMIT = 50;

    let isEmpty =
      challengeId !== DUMMY_RESULTS && pipelines.length <= PIPELINE_LIMIT;
    if (challenge.status === 'deleted') {
      return <NotFound />;
    }

    let progressStep = 1;
    pipelines.forEach(item => {
      if (progressStep === 2) {
        return;
      }
      if (item.users.length >= 50) {
        progressStep = 2;
      }
    });
    return (
      <Fragment>
        <Grid container className="result_wrapper">
          <Grid container spacing={32}>
            <Grid item xs={12}>
              <div className="navigation">
                <div className="pageTab">
                  <Fab
                    color="primary"
                    className="backButton"
                    aria-label="Back"
                    size="small"
                    onClick={() => this.props.history.push(`/dashboard`)}
                  >
                    <ArrowBack />
                  </Fab>
                  <PageTabs
                    value={this.state.selected}
                    onChange={this.handleChangePageTab}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="off"
                  >
                    <PageTab label="Talent" />
                    <PageTab label="Insight" />
                  </PageTabs>
                </div>
                <SettingMenu onDelete={this.onDelete} />
              </div>
              <hr />
            </Grid>
            <Grid className="challenge" item xs={6}>
              <TextField
                className="challenge_title"
                onClick={this.handleClickTitle}
                onBlur={this.handleTrackChange}
                defaultValue={this.context.t(challenge.test_name)}
                InputProps={{
                  className: 'challenge_input',
                  endAdornment: <InputAdornment position="end" />,
                }}
                variant="outlined"
                underline={false}
              />
              <Typography className="challenge_timestamp" component="p">
                Created{' '}
                {challenge.createdAt
                  ? moment(challenge.createdAt).format('MMM Do YY')
                  : 'July 10, 2018'}
              </Typography>
            </Grid>
            <Grid className="challenge" item xs={6}>
              <Typography component="div" className="talent-title">
                Your Talent Pipelines
              </Typography>
              {/* <TextField
                className="challenge_title"
                onClick={this.handleClickTitle}
                onBlur={this.handleTrackChange}
                defaultValue="Your Talent Pipelines"
                InputProps={{
                  className: 'challenge_input',
                  endAdornment: <InputAdornment position="end" />,
                }}
                underline={false}
                disabled={true}
                variant="outlined"
              /> */}
            </Grid>
            <Grid className="challenge" item xs={12} md={6}>
              <textarea
                className="challenge_desc"
                // defaultValue={(curChallenge && curChallenge.test_desc) || ''}
                onBlur={this.handleBlurDesc}
                disabled={challengeId === DUMMY_RESULTS}
                placeholder="This is your notepad, feel free to take notes!"
              />
            </Grid>
            <Grid className="pipelines-info" item xs={12} md={6}>
              <Grid container spacing={16}>
                {challengeId === DUMMY_RESULTS && (
                  <>
                    <Grid item xs={4}>
                      <InfoCard
                        headerColor="#552c84"
                        pipeline={{
                          users: externalCandidates,
                          title: this.state.dummyPipelineTitles[0],
                        }}
                        onRemove={this.handleRemovePipeline(0)}
                        changeBenchmark={this.handleChangeBenchmark}
                        openSnackBar={this.openSnackBar}
                        handleSettings={this.handleSettings}
                        benchmark={this.state.currentBenchmark === 0}
                        isFullScreenPipeline={isFullScreenPipeline}
                        copyLink={this.handleCopyLink('test')}
                        pid={0}
                        onSelectPipleLine={this.handleSelectPipeline}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <InfoCard
                        headerColor="#fc8e7f"
                        pipeline={{
                          users: digitalCandidates,
                          title: this.state.dummyPipelineTitles[1],
                        }}
                        onRemove={this.handleRemovePipeline(1)}
                        changeBenchmark={this.handleChangeBenchmark}
                        openSnackBar={this.openSnackBar}
                        handleSettings={this.handleSettings}
                        benchmark={this.state.currentBenchmark === 1}
                        isFullScreenPipeline={isFullScreenPipeline}
                        copyLink={this.handleCopyLink('test')}
                        pid={1}
                        onSelectPipleLine={this.handleSelectPipeline}
                      />
                    </Grid>
                  </>
                )}
                {challengeId !== DUMMY_RESULTS &&
                  pipelines.map((pipeline, index) => {
                    const { users } = pipeline;

                    return (
                      <Grid item xs={4} key={index}>
                        <InfoCard
                          headerColor={pipeline.color}
                          pipeline={pipeline}
                          onRemove={this.handleRemovePipeline(pipeline._id)}
                          changeBenchmark={this.handleChangeBenchmark}
                          openSnackBar={this.openSnackBar}
                          handleSettings={this.handleSettings}
                          benchmark={pipeline.benchmark}
                          isFullScreenPipeline={isFullScreenPipeline}
                          copyLink={this.handleCopyLink(pipeline._id)}
                          pid={index}
                          onSelectPipleLine={this.handleSelectPipeline}
                        />
                      </Grid>
                    );
                  })}
                <Grid item xs={4}>
                  <InfoCard headerColor="white" renderChild={true}>
                    <div className="addIcon">
                      <Fab
                        color="primary"
                        className="addButton"
                        aria-label="Add"
                        size="small"
                        onClick={this.handleClickAddPipeline}
                      >
                        <Add />
                      </Fab>
                    </div>
                  </InfoCard>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {this.state.selected === 1 && !isEmpty && (
            <>
              <Grid container spacing={40}>
                <Grid item xs={12}>
                  <div className="bubble-chart-container">
                    <BubbleChart
                      data={this.state.bubbleChartData}
                      onSelectBubble={this.selectBubble}
                    />
                  </div>
                  {/* <CharacterTabs /> */}
                </Grid>
              </Grid>
              <Grid className="relations_wrapper" container spacing={40}>
                <Grid item xs={12}>
                  <ExpansionPanel
                    className="panel-wrapper"
                    elevation={0}
                    defaultExpanded={true}
                  >
                    <ExpansionPanelSummary
                      classes={{
                        content: 'panel-summary-content',
                        expandIcon: 'panel-summary-icon',
                      }}
                      className="panel-summary"
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography className="title" component="p">
                        Talent Relationships
                      </Typography>
                      <Typography className="sub-title" component="p">
                        Uncover hidden relationships between your talent pool.
                        Drag the skill to the axis to see how your talent
                        compares
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <ScatterPlot
                        onClickPlot={this.handleClickPlot}
                        stepvalue={1}
                        isDummyData={challengeId === DUMMY_RESULTS}
                        data={this.state.pipelines}
                        categories={this.state.skillCategoriesData}
                      />

                      {/* <TalentRelationship
                        pipelines={this.state.pipelines}
                        skillCategories={this.state.skillCategoriesData}
                      /> */}
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </Grid>
                <Grid item xs={12}>
                  <ExpansionPanel
                    className="panel-wrapper"
                    elevation={0}
                    defaultExpanded={true}
                  >
                    <ExpansionPanelSummary
                      classes={{
                        content: 'panel-summary-content',
                        expandIcon: 'panel-summary-icon',
                      }}
                      className="panel-summary"
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography className="title" component="p">
                        Talent Funnel
                      </Typography>
                      <Typography className="sub-title" component="p">
                        Discover your talent ranked on the challenge. Select a
                        category to see the results
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <TalentFunnel
                        pipelines={this.state.pipelines}
                        benchmark={this.state.currentBenchmark}
                        showSlide={this.showSlidePane(true, digitalCandidates)}
                        onClickIcon={this.handleClickIcon()}
                      />
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </Grid>
                <Grid item xs={12}>
                  <ExpansionPanel
                    className="panel-wrapper"
                    elevation={0}
                    defaultExpanded={true}
                  >
                    <ExpansionPanelSummary
                      classes={{
                        content: 'panel-summary-content',
                        expandIcon: 'panel-summary-icon',
                      }}
                      className="panel-summary"
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography className="title" component="p">
                        Team Dynamic
                      </Typography>
                      <Typography className="sub-title" component="p">
                        Enhance your team performance by simulating how
                        individuals from other pipelines contribute to your
                        team. Mix and match to optimize for performance
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <TeamDynamic
                        pipelines={this.state.pipelines}
                        skillCategories={this.state.skillCategories}
                        benchmark={this.state.currentBenchmark}
                        showSlide={this.showSlidePane(true, digitalCandidates)}
                        onClickIcon={this.handleClickIcon()}
                      />
                      {/* <Grid container spacing={32}>
                        <Grid item xs={12} md={6}>
                          <div className="pipeline-selector-container">
                            <PipelineSelector
                              data={pipelines}
                              onChange={value =>
                                this.handleChangeFilterPipeline(value)
                              }
                            />
                            <Typography component="div">in</Typography>
                            <PipelineSelector
                              data={pipelines}
                              onChange={value =>
                                this.handleChangeSecondPipeline(value)
                              }
                            />
                          </div>
                          <DataTable
                            data={candidates}
                            expanded={true}
                            type={2}
                            isFullScreenPipeline={false}
                            onShowSlidePane={() => {}}
                            handleSettings={this.handleSettings}
                            showCheckbox={true}
                            selectedUsers={selectedUsers}
                            onSelectUser={user => this.changeSelectedUser(user)}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Grid item xs={12}>
                            <PolarSpiderChart
                              series={this.state.simulatedData}
                              categories={this.state.skillCategories}
                              labels={selectedUsers.map(item => {
                                return {
                                  id: item.id,
                                  title:
                                    item.fullname ||
                                    item.firstname + item.lastname,
                                };
                              })}
                              onDelete={item => this.unSelectedUser(item)}
                              className={'polarchart'}
                            />
                          </Grid>
                        </Grid>
                      </Grid> */}
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </Grid>
              </Grid>
            </>
          )}
          {/* {this.state.selected === 0 &&
            isEmpty &&
            (progressStep == 1 ? (
              <div className="waiting">
                <img src={WaitingImage} />
                <h2>Almost there.</h2>
                Results will appear once you have at least 50 users in a
                pipeline
              </div>
            ) : (
              ''
            ))} */}
          {this.state.selected === 1 &&
            isEmpty &&
            (challengeId !== DUMMY_RESULTS && (
              <div className="progressStepperWrapper">
                <span>Progress</span>
                <ProgressStepper activeStep={progressStep} />
              </div>
            ))}
          {this.state.selected === 0 && (
            <>
              <Grid className="pipeline_wrapper" container spacing={40}>
                {challengeId === DUMMY_RESULTS && (
                  <React.Fragment>
                    <Grid item xs={12} sm={6}>
                      <PipeLine
                        title="Digital Team"
                        width={12}
                        userData={digitalCandidates}
                        showSlide={this.showSlidePane(true, digitalCandidates)}
                        onRemove={this.handleRemovePipeline(0)}
                        changeBenchmark={this.handleChangeBenchmark}
                        openSnackBar={this.openSnackBar}
                        handleSettings={this.handleSettings}
                        benchmark={this.state.currentBenchmark === 0}
                        handleUpdateTitle={this.handleUpdatePipelineTitle(
                          0,
                          true,
                        )}
                        isFullScreenPipeline={isFullScreenPipeline}
                        copyLink={this.handleCopyLink('test')}
                        pid={0}
                        key={0}
                        expanded
                        showCheckbox={false}
                        color="#552c84"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <PipeLine
                        title="External Candidates"
                        width={12}
                        userData={externalCandidates}
                        showSlide={this.showSlidePane(true, externalCandidates)}
                        onRemove={this.handleRemovePipeline(1)}
                        changeBenchmark={this.handleChangeBenchmark}
                        openSnackBar={this.openSnackBar}
                        handleSettings={this.handleSettings}
                        benchmark={this.state.currentBenchmark === 1}
                        isFullScreenPipeline={isFullScreenPipeline}
                        handleUpdateTitle={this.handleUpdatePipelineTitle(
                          1,
                          true,
                        )}
                        copyLink={this.handleCopyLink('test')}
                        pid={1}
                        key={0}
                        expanded
                        color="#fc8e7f"
                      />
                    </Grid>
                  </React.Fragment>
                )}

                {challengeId !== DUMMY_RESULTS &&
                  pipelines.map((pipeline, index) => {
                    const { users } = pipeline;
                    console.log('123123123123123123123', users);
                    let width = 6;
                    if (index === pipelines.length && index % 2 !== 0) {
                      width = 12;
                    }
                    return (
                      <Grid item xs={12} md={6} key={index}>
                        <PipeLine
                          title={pipeline.title}
                          userData={users}
                          width={12}
                          color={pipeline.color}
                          showSlide={this.showSlidePane(false, users)}
                          onRemove={this.handleRemovePipeline(pipeline._id)}
                          changeBenchmark={() => {
                            this.handleChangeBenchmark(pipeline._id);
                          }}
                          openSnackBar={this.openSnackBar}
                          handleSettings={this.handleSettings}
                          handleUpdateTitle={this.handleUpdatePipelineTitle(
                            pipeline._id,
                          )}
                          benchmark={pipeline.benchmark}
                          isFullScreenPipeline={isFullScreenPipeline}
                          copyLink={this.handleCopyLink(pipeline._id)}
                          pid={index}
                          expanded
                          onClickIcon={this.handleClickIcon(pipeline._id)}
                        />
                      </Grid>
                    );
                  })}
              </Grid>
            </>
          )}
        </Grid>
        <Footer />
        {pipelines.length > 0 ? (
          <SliderPane
            isOpen={this.state.isPaneOpen}
            title=""
            subtitle=""
            onSearch={this.handleChangeFilterValue}
            paneType={false}
            suggestions={this.state.suggestions}
            tableData={this.state.tableData}
            onClose={() => {
              this.setState({ isPaneOpen: false }); // eslint-disable-line
            }}
            hasGraph={hasGraph}
            chartData={this.state.pipelineAverageData}
            skillCategories={this.state.skillCategories}
            pipelines={this.state.pipelines}
            openSnackBar={this.openSnackBarWithObject}
          />
        ) : (
          ''
        )}
        <AddPipelineModal
          show={this.state.showPipModal}
          onAdd={this.handleAddPipeline}
          onCancel={() => this.setState({ showPipModal: false })}
        />

        <ChartDetailModal
          data={this.state.currentBubble}
          isShow={this.state.showBubbleDetailModal}
          onClose={() => {
            this.setState({ showBubbleDetailModal: false });
          }}
        />
        <TestCardDeleteModal
          testId={this.state.testId}
          show={this.state.showCardDeleteModal}
          onHide={this.hideTestCardDeleteModal}
          deleteTest={this.handleConfirmDelete}
        />
        <ConfirmModal
          data={this.state.currentBubble}
          onConfirm={this.removePipeline}
          title={'Delete Pipeline'}
          content={'Are you sure?'}
          isOpened={this.state.showDeleteConfirmModal}
          onCancel={() => {
            this.setState({ showDeleteConfirmModal: false });
          }}
        />
        <TableDataSetting
          show={this.state.showSettingModal}
          pipelines={pipelines}
          onCancel={() => this.setState({ showSettingModal: false })}
        />

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          autoHideDuration={6000}
          open={this.state.snackBarOpen}
          onExited={this.processQueue}
          onClose={this.handleSnackBarClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={
            <span id="message-id">
              {!this.state.snackBarMessageInfo.feedback
                ? 'Successfully copied invite link to '
                : ''}

              <b> {this.state.snackBarMessageInfo.message}</b>
            </span>
          }
        />
      </Fragment>
    );
  }
}

Results.contextTypes = {
  t: PropTypes.func,
};

Results.propTypes = {
  getChallenge: PropTypes.func.isRequired,
  createPipeline: PropTypes.func.isRequired,
  deletePipeline: PropTypes.func.isRequired,
  updateChallenge: PropTypes.func.isRequired,
  updatePipeline: PropTypes.func.isRequired,
  updateCandidate: PropTypes.func.isRequired,
  curChallenge: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  deleteChallenge: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.authReducer.user,
  curChallenge: state.challengeReducer.curChallenge,
  isLoading: state.challengeReducer.isLoading,
});

const mapDispatchToProps = {
  getChallenge,
  updateChallenge,
  createPipeline,
  deletePipeline,
  updatePipeline,
  deleteChallenge,
  updateCandidate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Results);
