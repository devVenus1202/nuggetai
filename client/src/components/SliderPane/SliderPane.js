import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Avatar,
  Chip,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Select,
  MenuItem,
  Grid,
  InputBase,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import './SliderPane.scss';
import AutoSuggest from '../AutoSuggest';
import ProgressbarAccordion from '../ProgressbarAccordion';
import { withStyles } from '@material-ui/core/styles';
import { PolarSpiderChart } from '../../containers/Charts/Charts';
import { items } from '../../containers/CreateTest/Steps/data';
import { valueFields } from '../../containers/CSignIn/valueFields';
import ValuePanel from '../ValuePanel';
import LabelChip from '../Chip';

// const IS_EMPLOYER = false;
// const IS_CANDIDATE = true;
const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max - 20)) + 20;
};
const PurpleInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  input: {
    borderRadius: 22.5,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #8c92f7',
    fontSize: 15,
    width: 'auto',
    padding: '10px 26px 10px 12px',
    color: '#8c92f7',
    '&:focus': {
      borderRadius: 22.5,
    },
  },
}))(InputBase);
const polarData = [
  {
    name: 'Simulated',
    type: 'area',
    data: [20000, 30000, 40000, 35000, 40000],
    pointPlacement: 'on',
    fillOpacity: 0.8,
    color: '#0066FF',
  },
  {
    name: 'Digital Team',
    data: [93000, 48000, 102000, 66000, 47000],
    pointPlacement: 'on',
    color: '#502c01',
  },
];

// const pipelines = [
//   { title: 'All', color: '#502c01', value: 'all' },
//   { title: 'Digital Team', color: '#552c84', value: 'digital' },
//   { title: 'External Candidates', color: '#fc8e7f', value: 'external' },
// ];
const pipelinePolarDat = {
  All: {
    name: 'Digital Team',
    data: [93000, 48000, 102000, 66000, 47000],
    pointPlacement: 'on',
    color: '#502c01',
  },
  'Digital Team': {
    name: 'Digital Team',
    data: [43000, 19000, 60000, 35000, 40000],
    pointPlacement: 'on',
    color: '#552c84',
  },
  'External Candidates': {
    name: 'External Candidates',
    data: [50000, 39000, 42000, 31000, 7000],
    pointPlacement: 'on',
    color: '#fc8e7f',
  },
};

// const activeChallenges = items.filter(i => i.active);
class SliderPane extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      userType: 1,
      fullname: '',
      score: 0,
      challengeSelected: props.pipelines[0],
    };
  }
  data1 = [
    {
      label: this.context.t('speed'),
      value: getRandomInt(100),
    },
    {
      label: this.context.t('meticulousness-assertiveness'),
      value: getRandomInt(100),
    },
    {
      label: this.context.t('attention-to-detail'),
      value: getRandomInt(100),
    },
    {
      label: this.context.t('clarity-reasoning'),
      value: getRandomInt(100),
    },
  ];
  data2 = [
    {
      label: this.context.t('speed'),
      value: getRandomInt(100),
    },
    {
      label: this.context.t('meticulousness-assertiveness'),
      value: getRandomInt(100),
    },
    {
      label: this.context.t('attention-to-detail'),
      value: getRandomInt(100),
    },
    {
      label: this.context.t('clarity-reasoning'),
      value: getRandomInt(100),
    },
  ];
  data3 = [
    {
      label: this.context.t('speed'),
      value: getRandomInt(100),
    },
    {
      label: this.context.t('meticulousness-assertiveness'),
      value: getRandomInt(100),
    },
    {
      label: this.context.t('attention-to-detail'),
      value: getRandomInt(100),
    },
    {
      label: this.context.t('clarity-reasoning'),
      value: getRandomInt(100),
    },
  ];
  componentDidUpdate(prevProps) {
    if (
      prevProps.tableData.fullname !== this.props.tableData.fullname ||
      prevProps.tableData.rank !== this.props.tableData.rank
    ) {
      this.setState({
        fullname: this.props.tableData.fullname,
        score: this.props.tableData.rank,
      });
    }
  }

  handleChangeUserType = event => {
    this.setState({ userType: event.target.value });
  };

  handleSearch = event => {
    const { onSearch } = this.props;
    onSearch(event.target.value);
  };

  handleSelectUser = user => {
    this.setState({
      fullname: user.fullname || `${user.firstname} ${user.lastname}`,
      score: user.rank,
    });
  };
  changeChallenge(event) {
    polarData[1] = pipelinePolarDat[event.target.value];
    this.setState({
      challengeSelected: this.props.pipelines.filter(
        c => c.title === event.target.value,
      )[0],
    });
  }
  renderValues = () => {
    return valueFields.map((data, index) => {
      const { title, description, field } = data;
      return (
        <ValuePanel
          title={this.context.t(title)}
          description={this.context.t(description)}
          value={getRandomInt(100)}
          key={index}
        />
      );
    });
  };
  calcuteAvg = (skillCategories, users) => {
    let scoreAvg = [];
    users.forEach(item => {
      skillCategories.forEach((score, key) => {
        if (!scoreAvg[key]) {
          scoreAvg[key] = 0;
        }
        scoreAvg[key] += Math.abs(Number(item[`skill_${key + 1}`] || 0));
      });
    });
    scoreAvg.forEach((item, key) => {
      scoreAvg[key] = Math.abs(scoreAvg[key]) / users.length;
    });
    return scoreAvg;
  };

  render() {
    const {
      title,
      subtitle,
      isOpen,
      onClose,
      tableData,
      // paneType,
      // hasGraph,
      suggestions,
      pipelines,
      skillCategories,
    } = this.props;
    const { fullname, challengeSelected } = this.state;
    let level = suggestions.reduce((total, user, currentIndex, arr) => {
      return total + (tableData.rank >= user.rank ? 1 : 0);
    }, 0);
    if ((level / suggestions.length) * 100 < 5) {
      level = 5;
    } else if ((level / suggestions.length) * 100 < 10) {
      level = 10;
    } else if ((level / suggestions.length) * 100 < 20) {
      level = 20;
    } else {
      level = 0;
    }
    polarData[0].name = fullname;
    const userScore = [];
    if (this.props.tableData.score) {
      this.props.tableData.score.forEach(item => {
        userScore.push(Math.abs(item));
      });
    }

    const chartData = [
      {
        name: `${challengeSelected.title}`,
        data: this.calcuteAvg(skillCategories, challengeSelected.users),
        pointPlacement: 'on',
        color: challengeSelected.color,
      },
      {
        name: `User-${this.props.tableData.fullname}`,
        data: userScore,
        pointPlacement: 'on',
        color: '#00F',
      },
    ];
    return (
      <SlidingPane
        className={'SliderPane'}
        overlayClassName={'SliderOverlay'}
        isOpen={isOpen}
        title={title}
        subtitle={subtitle}
        onRequestClose={() => {
          onClose();
        }}
      >
        <div>
          <div className="SlidingPaneContent">
            <div className="SlideHeaderWrapper">
              <AutoSuggest
                onSelect={this.handleSelectUser}
                suggestions={suggestions}
                variant="outlined"
              />

              <div className="SlideHeader">
                <div className="candidate_info">
                  <Typography variant="title">{fullname}</Typography>
                  <Typography className="candidate_timestamp" component="p">
                    {/* Added July 10, 2018 */}
                    {level > 0 && (
                      <LabelChip
                        color="primary"
                        avatar={<Avatar>TOP</Avatar>}
                        classes={{
                          root: { width: '130px', backgroundColor: '#928ef3' },
                        }}
                        label={`${level}%`}
                      />
                    )}
                  </Typography>
                </div>
                {/* <div className="candidate_score">
                  <Avatar className="score__circle">{score}</Avatar>
                </div> */}
              </div>
              <br />
              <Typography component="p" class="feedTagPane-wrapper">
                <Chip
                  label="Blockchain"
                  component="a"
                  className="feedTagPane"
                />
                {''}
                <Chip label="Ethereum" className="feedTagPane" component="a" />
                {''}
                <Chip label="Bitcoin" className="feedTagPane" component="a" />
                {''}

                <Chip
                  label="Security Token"
                  component="a"
                  className="feedTagPane"
                />
                {''}
                <Chip
                  label="Cryptography"
                  className="feedTagPane"
                  component="a"
                />
                {''}
                <Chip
                  label="Blockchain business network"
                  className="feedTagPane"
                  component="a"
                />
                {''}
              </Typography>
            </div>
            <br />
            {/* {hasGraph && (
              <div className="graph-vis-container">
                <GraphVis rank={score} />
              </div>
            )} */}
            {/* <Divider className="content_divider" /> */}
            <Grid
              className="values-wrapper"
              container
              xs={12}
              alignItems="center"
              justify="center"
              direction="column"
            >
              <div className="form-data">{this.renderValues()}</div>
            </Grid>
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
                  {this.context.t('performance-nugget')}
                </Typography>
                <Typography className="sub-title" component="p" />
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className="panel-details-wrapper">
                <Grid container>
                  <Grid
                    container
                    xs={12}
                    justify="flex-start"
                    alignItems="center"
                  >
                    <Grid item xs={12} sm={12}>
                      <Typography
                        className="sidepane-compare-title"
                        component="div"
                      >
                        {this.context.t('compare-to')}
                      </Typography>
                      <Select
                        className="slidepane-compare-select"
                        value={challengeSelected.title}
                        onChange={this.changeChallenge.bind(this)}
                        input={<PurpleInput />}
                      >
                        {pipelines.map(c => (
                          <MenuItem key={c.title} value={c.title}>
                            {this.context.t(c.title)}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  </Grid>
                  <Grid xs={12}>
                    <PolarSpiderChart
                      series={chartData}
                      categories={this.props.skillCategories}
                    />
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
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
                  {this.context.t('Role Recommendations')}
                </Typography>
                <Typography className="sub-title" component="p" />
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className="progress-expansion">
                <Typography className="progress-expansion-content">
                  <ProgressbarAccordion
                    mainInfo={{
                      title: this.context.t('financial-analyst'),
                      value: 40,
                    }}
                    onChangeCommend={this.props.openSnackBar}
                    detailInfo={this.data1}
                  />
                  <ProgressbarAccordion
                    mainInfo={{
                      title: this.context.t('project-coodinator'),
                      value: 65,
                    }}
                    onChangeCommend={this.props.openSnackBar}
                    detailInfo={this.data2}
                  />
                  <ProgressbarAccordion
                    mainInfo={{
                      title: this.context.t('project-manager'),
                      value: 56,
                    }}
                    onChangeCommend={this.props.openSnackBar}
                    detailInfo={this.data3}
                  />
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            {/* <FormControl className="usertype-selector">
              <FormLabel>{`Compare ${fullname} to `}</FormLabel>
              <Select
                className="usertype-select-style"
                value={this.state.userType}
                onChange={this.handleChangeUserType}
                inputProps={{
                  name: 'usertype',
                  id: 'usertype',
                }}
              >
                <MenuItem value={1}>Top performers</MenuItem>
                <MenuItem value={2}>All users</MenuItem>
              </Select>
            </FormControl>
            <Box type={userType} />
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  <strong>Problem</strong>
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  <div className="testdetail">
                    <p className="timespent">
                      <small>5:10</small>
                    </p>
                  </div>
                  <br />
                  <div>
                    As the global trend towards purchasing via the Internet
                    leads towards a multitude of smaller shipments mostly posted
                    via international or express mail, the importance of a
                    strong Customs Program has never been so important. React
                    can assist you by having the right Customs Applications in
                    place as well as handling all seizure cases, including all
                    communication, sampling, and storage, recycling or
                    destruction.
                  </div>
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  <strong>Collecting Information</strong>
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  <div className="testdetail">
                    <p className="timespent">
                      <small>3:09</small>
                    </p>
                  </div>
                  <br />
                  - Its most basic functionality lets you "send messages, check
                  appointments and so on on your Android device" <br />
                  - Multiple Actions technology: the use of coordination
                  reduction "is probably what will power Google Assistant ahead
                  of rivals" <br />
                  - Pretty Please mode: is a good parenting tool since it can
                  "encourage [one's] kids to be polite" <br />- "GE Appliances'
                  closer integration with Google Assistant... could make GE home
                  appliances slightly easier to use [with Google Assistant] than
                  with Alexa"
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  <strong>Engendering Ideas</strong>
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  <div className="testdetail">
                    <p className="timespent">
                      <small>4:39</small>
                    </p>
                  </div>
                  <br />
                  -although Amazon's Alexa still is a leading product, the
                  market has seen increasing demand for connected gadget's like
                  GE's appliances <br />
                  -customers need to become familiar with the features of the
                  Google Assistant as it has only recently been introduced. It
                  is essential they they understand the benefits it has over
                  other devices. Namely, how it is able to understand context,
                  has no need to be directly called upon, is interconnected with
                  the Geneva Home Action and boasts a unique pretty please
                  function <br />
                  -tutorial videos to illustrate the process and highlight key
                  features
                  <br />
                  -'pretty please' as a way for parents to teach their children
                  the importance using the positive reinforcement of the device{' '}
                  <br />
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  <strong>Recommending a Solution</strong>
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  <div className="testdetail">
                    <p className="timespent">
                      <small>7:13</small>
                    </p>
                  </div>
                  <br />
                  Initially, we are going to have to blow up the popularity of
                  the product to make sure the competition (Alexa) is not in the
                  picture anymore. We'll concentrate google assistant campaigns
                  through our channels (google search engine, gmail youtube). We
                  will also target the wanted audience for the future (early
                  20s, mid 20s) by partnering with content creators on YouTube
                  and promoting the uses of the product through them. Both these
                  avenues will depict the population's curiosity and will create
                  potential consumers. That is when we have to make sure the
                  front line is ready to rightfully represent and sell the
                  product and we can put retail workers through a personalised
                  training regarding Google Assistant.
                  <br />
                  This way, when the interested get to the store already
                  interested, they will fall for the product even more.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <br /> */}
          </div>

          {/* <Divider className="content_divider" />

          {paneType === IS_EMPLOYER && (
            <div className="feedbackForm">
              <Typography className="content_header">
                <strong>Feeedback</strong>
              </Typography>
              <textarea
                placeholder="Add Feedback"
                className="form-control feedbackText"
              />
              <Button variant="contained" color="primary">
                <strong>Send</strong>
              </Button>
            </div>
          )}
          {paneType === IS_CANDIDATE && (
            <Paper className="feedbackWrapper" elevation={1}>
              <Typography variant="headline" component="h3">
                Feeedback
              </Typography>
              <Typography component="p">
                This candidate is familiar with our company and showed interest
                in learning more about our upcoming projects. Considering
                [Hiring manager’s] notes about the candidate’s performance on
                the assignment, I think [he/she] will be a very good fit for
                this role and the company in general.
              </Typography>
            </Paper>
          )} */}
        </div>
      </SlidingPane>
    );
  }
}

SliderPane.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};
SliderPane.defaultProps = {
  tableData: {},
};
SliderPane.contextTypes = {
  t: PropTypes.func,
};
export default SliderPane;
