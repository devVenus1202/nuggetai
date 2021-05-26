import React, { Component } from 'react';
import { Grid, Typography, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProgressBar from '../ProgressBar';
import PropTypes from 'prop-types';
import './ProgressbarAccordion.scss';
// Accordian
const AccordionPanel = withStyles({
  root: {
    border: '1px solid rgba(0,0,0,.125)',
    borderLeft: 'none',
    borderRight: 'none',
    width: '100%',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
  },
  expanded: {
    margin: 'auto',
  },
})(MuiExpansionPanel);

const AccordionPanelSummary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: 56,
    fontFamily: 'AvenirNext',
    fontSize: '17px',
    fontWeight: 500,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: '1px',
    color: '#253858',
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    fontFamily: 'AvenirNext',
    fontSize: '17px',
    fontWeight: '500',
    fontStyle: 'normal',
    fontStretch: 'normal',
    display: 'block',
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(props => <MuiExpansionPanelSummary {...props} />);
AccordionPanelSummary.muiName = 'ExpansionPanelSummary';
const AccordionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
}))(MuiExpansionPanelDetails);

class ProgressbarAccordion extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      accordionExpanded: true,
    };
  }
  accordionHandleChange = () => (event, expanded) => {
    const { accordionExpanded } = this.state;
    this.setState({
      accordionExpanded: !accordionExpanded,
    });
  };

  setCommendation = c => {
    const { commendation } = this.state;
    let nextCommendation = 0;
    if (commendation !== c) {
      nextCommendation = c;
    }
    if (this.props.onChangeCommend) {
      this.setState({
        commendation: nextCommendation,
        // openSnack: nextCommendation !== 0,
      });
      this.props.onChangeCommend({
        title: 'Thanks for your feedback!',
        feedback: true,
      });
    } else {
      this.setState({
        commendation: nextCommendation,
        openSnack: nextCommendation !== 0,
      });
    }
  };
  handleSnackBarClose = () => {
    this.setState({ openSnack: false });
  };
  render() {
    const { accordionExpanded, commendation } = this.state;
    const { mainInfo, detailInfo } = this.props;
    return (
      <>
        <AccordionPanel
          square
          expanded={accordionExpanded}
          onChange={this.accordionHandleChange()}
          key={1}
        >
          <AccordionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="title" component="p">
              {mainInfo.title}
            </Typography>
            <br />
          </AccordionPanelSummary>
          <AccordionPanelDetails>
            <div className="progress-content">
              <Grid container spacing={8}>
                <Grid item xs={12}>
                  <ProgressBar value={mainInfo.value} />
                </Grid>
                {detailInfo.map((item, key) => {
                  return (
                    <>
                      <Grid item xs={2}>
                        <div className="progressbar-wrapper">
                          <label className="progress-label">{item.label}</label>
                        </div>
                      </Grid>
                      <Grid item xs={10} clsssName="progressbar-wrapper">
                        <div className="progressbar-wrapper">
                          <ProgressBar
                            type="solid"
                            value={item.value}
                            height="20"
                          />
                        </div>
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            </div>
          </AccordionPanelDetails>
          <Typography display="inline" component="div" className="commendation">
            Do you agree?
            <i
              className={`far fa-thumbs-up thumbup icons ${
                commendation === 1 ? 'fas' : 'far'
              }`}
              onClick={() => {
                this.setCommendation(1);
              }}
            />
            <i
              className={` fa-thumbs-down thumbdwon icons ${
                commendation === 2 ? 'fas' : 'far'
              }`}
              onClick={() => {
                this.setCommendation(2);
              }}
            />
          </Typography>
        </AccordionPanel>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.openSnack}
          autoHideDuration={100000}
          onClose={this.handleSnackBarClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Thanks for your feedback!</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleSnackBarClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </>
    );
  }
}
ProgressbarAccordion.defaultProps = {
  detailInfo: [],
};
ProgressbarAccordion.propTypes = {
  mainInfo: PropTypes.object.isRequired,
};
export default ProgressbarAccordion;
