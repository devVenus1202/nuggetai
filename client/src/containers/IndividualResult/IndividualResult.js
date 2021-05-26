import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Grid,
  Typography,
  Chip,
  Select,
  OutlinedInput,
  MenuItem,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  InputBase,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import ValuePanel from '../../components/ValuePanel';
import { valueFields } from '../CSignIn/valueFields';
import { items } from '../CreateTest/Steps/data';
import { PolarSpiderChart } from '../Charts/Charts';
import Footer from '../../components/Footer/Footer';
import ProgressbarAccordion from '../../components/ProgressbarAccordion';
import StepIndicator from '../../components/StepIndicator';

import './IndividualResult.scss';

const pipelines = [
  { title: 'All', value: 'all' },
  { title: 'Product', value: 'product' },
  { title: 'Marketing', value: 'marketing' },
  { title: 'Sales', value: 'sales' },
];
const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max - 20)) + 20;
};
const activeChallenges = items.filter(i => i.active);
const polarData = [
  {
    name: 'simulated',
    type: 'area',
    data: [20000, 30000, 20000, 35000, 50000],
    pointPlacement: 'between',
    fillOpacity: 0.8,
    color: '#0066FF',
  },
  {
    name: 'Product',
    data: [43000, 19000, 40000, 60000, 25000],
    pointPlacement: 'between',
    color: '#d09645',
  },
  {
    name: 'Marketing',
    type: 'area',
    data: [40000, 40000, 60500, 35000, 40000],
    pointPlacement: 'between',
    fillOpacity: 0.8,
    color: '#988888',
  },
  {
    name: 'Sales',
    data: [60000, 35000, 10000, 19000, 10000],
    pointPlacement: 'between',
    color: '#4983AC',
  },
];

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

class IndividualResult extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      challengeSelected: activeChallenges[0],
      pipelineSelected: pipelines[0],
      accordionExpanded: { panel1: true, panel2: true, panel3: true },
      polarChartData: polarData,
    };

    this.changeChallenge = this.changeChallenge.bind(this);
    this.changePipeline = this.changePipeline.bind(this);
  }

  accordionHandleChange = panel => (event, expanded) => {
    const { accordionExpanded } = this.state;
    accordionExpanded[panel] = !accordionExpanded[panel];
    this.setState({
      accordionExpanded: accordionExpanded,
    });
  };

  componentDidMount() {}

  renderValues = () => {
    return valueFields.map((data, index) => {
      const { title, description, value } = data;
      return (
        <ValuePanel
          title={this.context.t(title)}
          description={this.context.t(description)}
          value={value}
          key={index}
        />
      );
    });
  };

  changeChallenge(event) {
    this.setState({
      challengeSelected: activeChallenges.filter(
        c => c.title === event.target.value,
      )[0],
    });
  }

  changePipeline(event) {
    let polarChartData = [];
    if (event.target.value === 'Product') {
      polarChartData.push(polarData[0]);
      polarChartData.push(polarData[1]);
    }
    if (event.target.value === 'Marketing') {
      polarChartData.push(polarData[0]);
      polarChartData.push(polarData[2]);
    }
    if (event.target.value === 'Sales') {
      polarChartData.push(polarData[0]);
      polarChartData.push(polarData[3]);
    }
    if (event.target.value === 'All') {
      polarChartData = polarData;
    }
    this.setState({
      pipelineSelected: pipelines.filter(
        c => c.title === event.target.value,
      )[0],
      polarChartData,
    });
  }

  render() {
    // const { history, user } = this.props;

    const {
      challengeSelected,
      // accordionExpanded,
      pipelineSelected,
      polarChartData,
    } = this.state;

    const shareURL = `${window.location.protocol}//${window.location.hostname}`;

    // const polarCategories = [
    //   this.context.t('speed'),
    //   this.context.t('Attention to Detail'),
    //   this.context.t('clarity-reasoning'),
    //   this.context.t('meticulousness-assertiveness'),
    // ];

    return (
      <div>
        <Grid className="individual-result" container>
          <Grid container className="individual-result-wrapper">
            <Grid
              container
              className="challenges-wrapper"
              xs={12}
              alignItems="center"
              justify="center"
            >
              <Select
                value={challengeSelected.title}
                onChange={this.changeChallenge}
                classes={{
                  root: 'challenge-select',
                }}
                input={<OutlinedInput />}
              >
                {activeChallenges.map(c => (
                  <MenuItem key={c.title} value={c.title}>
                    {this.context.t(c.title)}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid
              className="keywords-wrapper"
              container
              xs={12}
              alignItems="center"
              justify="center"
              direction="row"
            >
              {challengeSelected.keywords.map(k => (
                <Chip
                  className="keyw-chip"
                  key={k}
                  label={k}
                  variant="outlined"
                />
              ))}
            </Grid>
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
            <Grid
              className="expansion-panels-wrapper"
              container
              xs={12}
              spacing={24}
              alignItems="flex-start"
              justify="center"
            >
              <Grid item sm={12} md={5}>
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
                    <Typography className="sub-title" component="p">
                      {this.context.t(
                        'mark-your-focus-and-find-your-gaps-to-improve',
                      )}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className="panel-details-wrapper">
                    <Grid container>
                      <Grid
                        container
                        xs={12}
                        justify="center"
                        alignItems="center"
                      >
                        <Grid item xs={12}>
                          <Typography
                            className="compare-title"
                            component="p"
                            style={{ display: 'inline', marginRight: '20px' }}
                          >
                            {this.context.t('compare-to')}
                          </Typography>
                          <Select
                            value={pipelineSelected.title}
                            onChange={this.changePipeline}
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
                        <div style={{ width: '100%' }}>
                          <PolarSpiderChart
                            series={polarChartData}
                            hideLabel
                            className="chart-wrapper"
                            categories={[
                              'Speed',
                              'Planning',
                              'Attention to Detail',
                              'Neutrality',
                              'Clarity & Reasoning',
                            ]}
                          />
                        </div>
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
                      {this.context.t('growth-tips').toUpperCase()}
                    </Typography>
                    <Typography className="sub-title" component="p">
                      {this.context.t('machine-drive-advice-subtitle')}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className="panel-details-wrapper ">
                    <StepIndicator
                      current={3}
                      count={3}
                      direction="vertical"
                      icon={<i className="fa fa-check-double" />}
                      contents={[
                        '“Attention to detail has been the most important factor leading to success or failure on the job.”',
                        '“Managing a portfolio of technology solutions where the industry is changing rapidly keeps you on your feet at ∂all times…”',
                        '“Blockchain has the potential to disrupt every industry just as Machine Learning is doing now. You’re ability to ∂think creatively to lead new discoveries is pivotal to your career success”',
                      ]}
                    />
                    {/* <div>
                      <div className="tip-content">
                        {this.context.t('growth-tips-1')}
                      </div>
                      <div className="tip-content">
                      {this.context.t('growth-tips-2')}
                      </div>
                      <div className="tip-content">
                      {this.context.t('growth-tips-3')}
                      </div>
                    </div> */}
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Grid>
              <Grid item sm={12} md={7}>
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
                      {this.context.t('discover-your-path')}
                    </Typography>
                    <Typography className="sub-title" component="p">
                      {this.context.t(
                        'keep-an-open-mind-and-try-something-new',
                      )}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className="progress-expansion">
                    <Typography className="progress-expansion-content">
                      <ProgressbarAccordion
                        mainInfo={{
                          title: this.context.t('financial-analyst'),
                          value: getRandomInt(90),
                        }}
                        detailInfo={[
                          {
                            label: this.context.t('speed'),
                            value: getRandomInt(90),
                          },
                          {
                            label: this.context.t(
                              'meticulousness-assertiveness',
                            ),
                            value: getRandomInt(90),
                          },
                          {
                            label: this.context.t('attention-to-detail'),
                            value: getRandomInt(90),
                          },
                          {
                            label: this.context.t('clarity-reasoning'),
                            value: getRandomInt(90),
                          },
                        ]}
                      />
                      <ProgressbarAccordion
                        mainInfo={{
                          title: this.context.t('project-coodinator'),
                          value: getRandomInt(90),
                        }}
                        detailInfo={[
                          {
                            label: this.context.t('speed'),
                            value: getRandomInt(90),
                          },
                          {
                            label: this.context.t(
                              'meticulousness-assertiveness',
                            ),
                            value: getRandomInt(90),
                          },
                          {
                            label: this.context.t('attention-to-detail'),
                            value: getRandomInt(90),
                          },
                          {
                            label: this.context.t('clarity-reasoning'),
                            value: getRandomInt(90),
                          },
                        ]}
                      />
                      <ProgressbarAccordion
                        mainInfo={{
                          title: this.context.t('project-manager'),
                          value: getRandomInt(90),
                        }}
                        detailInfo={[
                          {
                            label: this.context.t('speed'),
                            value: getRandomInt(90),
                          },
                          {
                            label: this.context.t(
                              'meticulousness-assertiveness',
                            ),
                            value: getRandomInt(90),
                          },
                          {
                            label: this.context.t('attention-to-detail'),
                            value: getRandomInt(90),
                          },
                          {
                            label: this.context.t('clarity-reasoning'),
                            value: getRandomInt(90),
                          },
                        ]}
                      />
                    </Typography>
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
                      {this.context.t('what-does-this-mean')}
                    </Typography>
                    <Typography className="sub-title" component="p" />
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography className="help-content">
                      {this.context.t('what-does-this-mean-s1')}
                      <br />
                      <br />
                      {this.context.t('what-does-this-mean-s2')}
                      <br />
                      <br />
                      <b>{this.context.t('what-does-this-mean-s3-bold')}</b>
                      {this.context.t('what-does-this-mean-s3')}
                      <br />
                      <br />
                      {this.context.t('what-does-this-mean-s4')}
                    </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Grid>
            </Grid>
          </Grid>
          <div className="static-icons">
            <ul>
              <li>
                <a
                  target="blank"
                  href={`https://twitter.com/home?status=${shareURL}`}
                >
                  <i className="fab fa-twitter" />
                </a>
              </li>
              <li>
                <a
                  target="blank"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareURL}`}
                >
                  <i className="fab fa-facebook" />
                </a>
              </li>
            </ul>
          </div>
        </Grid>
        <Footer />
      </div>
    );
  }
}

IndividualResult.contextTypes = {
  t: PropTypes.func,
};

IndividualResult.propTypes = {
  history: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.authReducer.user,
});

export default withRouter(connect(mapStateToProps)(IndividualResult));
