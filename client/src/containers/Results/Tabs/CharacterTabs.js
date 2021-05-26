import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import GraphVis from '../../../components/GraphVis';
import { characters } from '../characters';
import { FiberManualRecordRounded } from '@material-ui/icons';
import './Tabs.scss';
function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} className="tab-pane">
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const nodes = [
  { label: ' S ', color: '#fbb5c0', fontSize: 50 },
  { label: ' P ', color: '#1890ff', fontSize: 48 },
  { label: ' A ', color: '#5eb290', fontSize: 40 },
  { label: ' N ', color: '#618bb2', fontSize: 45 },
  { label: ' C ', color: '#fc8e7f', fontSize: 42 },
];
const styles = theme => ({
  root: {
    flexGrow: 1,
    background: 'transparent',
    margin: '0 0 50px',
  },
  tabsRoot: {},
  tabsIndicator: {
    backgroundColor: '#E97D9D',
    flexGrow: 1,
  },
  flexContainer: {},
  tabRoot: {
    flexGrow: 1,
    textTransform: 'initial',
    maxWidth: 'max-content',
    fontWeight: theme.typography.fontWeightRegular,
    marginBottom: 20,
    fontSize: '20.3px',
    fontStretch: 'normal',
    lineHeight: 1.67,
    letterSpacing: 'normal',
    color: '#505d6f',
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
      color: '#E97D9D !important',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#E97D9D !important',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#E97D9D !important',
    },
  },
  tabWrapper: {
    flexDirection: 'row',
    padding: ' 0px 20px',
  },
  tabLabelContainer: {
    padding: '6px 10px 6px 10px',
    width: ' max-content',
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3,
    fontSize: '19.5px',
    fontWeight: '500',
    color: '#4a4a4a',
    fontStretch: 'normal',
    lineHeight: '1.93',
    letterSpacing: 'normal',
  },
});

class CharacterTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  selectNode = index => {
    console.log(index);
    this.setState({ value: index - 1 });
  };

  render() {
    const { classes, theme } = this.props;
    const { value } = this.state;
    const tabClasses = {
      root: classes.tabRoot,
      selected: classes.tabSelected,
      wrapper: classes.tabWrapper,
      labelContainer: classes.tabLabelContainer,
    };
    return (
      <>
        <div className="graph-vis-container">
          <GraphVis
            rank={10}
            nodes={nodes}
            selectNode={this.selectNode}
            selectedNodes={[value + 1]}
            className="graph-vis"
          />
        </div>
        <div className={classes.root}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            className="character-tabs"
            variant="scrollable"
            classes={{
              root: classes.tabsRoot,
              indicator: classes.tabsIndicator,
              flexContainer: classes.flexContainer,
            }}
          >
            {characters.map((item, key) => (
              <Tab
                key={key}
                classes={tabClasses}
                label={item.shortName}
                disableRipple
                icon={<FiberManualRecordRounded className={item.prefix} />}
              />
            ))}
          </Tabs>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={this.state.value}
            onChangeIndex={this.handleChangeIndex}
          >
            <TabContainer className={classes.typography} dir={theme.direction}>
              {this.context.t('characteristic-reflects')}.
              <br />
              <br />
              {this.context.t('characteristic-reflects_example')}.
            </TabContainer>
            <TabContainer className={classes.typography} dir={theme.direction}>
              {this.context.t('characteristic-reflects-two')},
              <br />
              <br />
              {this.context.t('characteristic-reflects-two-example')}.
            </TabContainer>
            <TabContainer className={classes.typography} dir={theme.direction}>
              {this.context.t('characteristic-reflects-three')}.
              <br /> <br />
              {this.context.t('characteristic-reflects-three-example')}.
            </TabContainer>
            <TabContainer className={classes.typography} dir={theme.direction}>
              {this.context.t('characteristic-reflects-four')}
              <br />
              <br />
              {this.context.t('characteristic-reflects-four-example')}.{' '}
            </TabContainer>
            <TabContainer className={classes.typography} dir={theme.direction}>
              {this.context.t('characteristic-reflects-five')}
              <br />
              <br />
              {this.context.t('characteristic-reflects-five-example')}.
            </TabContainer>
          </SwipeableViews>
        </div>
      </>
    );
  }
}

CharacterTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CharacterTabs);
