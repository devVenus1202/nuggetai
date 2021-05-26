import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Modal,
  Button,
  Paper,
  Grid,
  IconButton,
  InputBase,
  Snackbar,
  InputAdornment,
  CircularProgress,
} from '@material-ui/core';
import { Close, FileCopy } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import copy from 'copy-to-clipboard';
import './CreateChallengeModal.scss';
import { items } from '../../../containers/CreateTest/Steps/data';
import ChallengeCard from '../../ChallengeCard/ChallengeCard';
import challengeActions from '../../../redux/challenge/actions';

const { createChallenge } = challengeActions;

const activeItems = items.filter(i => i.active);

const randomColor = [
  'rgba(223, 83, 83, .5)',
  'rgba(248, 206, 8, .5)',
  'rgba(248, 206,248, .5)',
  'rgba(8, 206,248, .5)',
  'rgba(83, 83,248, .5)',
  'rgba(8, 206,83, .5)',
];

const CustomInput = withStyles(theme => ({
  root: {
    width: '100%',
    border: 'solid 1px #d3d3d3',
    borderRadius: 4,
  },
  input: {
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    fontSize: 14,
    width: '100%',
    height: 38,
    padding: '10px 26px 10px 12px',
    lineHeight: '1.43',
    letterSpacing: 'normal',
    // transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      borderRadius: 4,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    position: 'absolute',
    top: `${40}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    maxHeight: window.innerHeight - 160,
  };
}

const DEFAULT_TIMER = 15;

class CreateChallengeModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selection: null,
      valid: false,
      step: 0,
      itemSelected: null,
      snackBarOpen: false,
      snackBarMessage: '',
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleLaunch = this.handleLaunch.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
  }

  handleClickChallenge(index) {
    this.setState({ selection: index, itemSelected: activeItems[index] });
  }

  handleNext() {
    const { itemSelected } = this.state;
    if (!itemSelected) {
      this.setState({
        valid: false,
        snackBarMessage: this.context.t('please-select-the-assessment'),
        snackBarOpen: true,
      });
      return;
    }

    this.handleLaunch();
  }

  handleLaunch() {
    const { createChallenge } = this.props;
    const { itemSelected } = this.state;

    let challenge = new FormData();

    challenge.append('test_name', itemSelected.title);
    challenge.append('test_desc', itemSelected.description);
    challenge.append('timer', DEFAULT_TIMER);
    challenge.append('cards', JSON.stringify(itemSelected.cards));
    challenge.append('keywords', JSON.stringify(itemSelected.keywords));
    console.log(itemSelected.functions);
    challenge.append('functions', JSON.stringify(itemSelected.functions || []));
    challenge.append('image', itemSelected.imgSrc);
    challenge.append('sponsored', itemSelected.sponsored || '');

    const pipeline = {
      title: 'Unnamed',
      pipeline_desc: 'Unnamed',
      benchmark: true,
      color: randomColor[Math.floor(Math.random() * 6 + 1)],
    };

    createChallenge({ challenge, pipeline });

    this.setState({ valid: true, step: 1, snackBarOpen: false });
  }

  handleClose() {
    this.setState({ valid: false, selection: -1, step: 0, itemSelected: null });
    this.props.onHide();
  }

  handleCloseSnackbar() {
    this.setState({ snackBarOpen: false, snackBarMessage: '' });
  }

  validTitle = (desc, limit) => {
    if (desc && desc.length > limit) {
      return desc.slice(0, limit) + ' ...';
    }
    return desc || `Uname ${this.uname++}`;
  };

  renderTestCards(challenges, selection) {
    return challenges.map((eachtest, ind) => {
      const thumbnail = require(`../../../images/challenges/${
        eachtest.imgSrc
      }`);
      return (
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          key={eachtest._id}
          className="challenge-item"
          onClick={() => this.handleClickChallenge(ind)}
        >
          <ChallengeCard
            key={ind}
            imgSrc={thumbnail}
            title={this.context.t(eachtest.title)}
            description={this.validTitle(
              this.context.t(eachtest.description),
              150,
            )}
            label={eachtest.keywords}
            minimalis
            selected={ind === selection}
          />
        </Grid>
      );
    });
  }

  handleFinish() {
    const { handleFinish } = this.props;
    this.setState({ valid: false, selection: -1, step: 0, itemSelected: null });
    handleFinish();
  }

  handleCopy(url) {
    copy(url);
    this.setState({
      snackBarMessage: this.context.t('sharable-link-copy'),
      snackBarOpen: true,
    });
  }

  render() {
    const { show, curChallenge, isLoading } = this.props;
    const {
      selection,
      step,
      itemSelected,
      snackBarOpen,
      snackBarMessage,
    } = this.state;

    const testUrl =
      curChallenge &&
      `${window.location.host}/enter/${curChallenge._id}/${
        curChallenge.pipeline._id
      }`;

    return (
      <Modal
        className="create-challenge-modal"
        open={show}
        onClose={this.handleClose}
      >
        <div>
          {step === 0 && (
            <Paper className="paper-main" elevation={0} style={getModalStyle()}>
              <Grid
                className="create-challenge-header"
                container
                alignItems="center"
                justify="space-between"
              >
                <Typography variant="h5" component="h5">
                  {this.context.t('pick-a-challenge')}
                </Typography>
                <IconButton
                  className="close-btn"
                  aria-label="Close"
                  aria-haspopup="true"
                  onClick={this.handleClose}
                >
                  <Close />
                </IconButton>
              </Grid>

              <Grid
                className="challenges-container"
                container
                alignItems="center"
                spacing={24}
              >
                {this.renderTestCards(activeItems, selection)}
              </Grid>

              <Grid
                className="create-challenge-actions"
                container
                alignItems="center"
                justify="flex-end"
              >
                <Button
                  className="confirm-btn"
                  color="inherit"
                  onClick={this.handleNext}
                >
                  {this.context.t('confirm-pick')}
                </Button>
              </Grid>
            </Paper>
          )}

          {step === 1 && (
            <Paper className="paper-main step2" elevation={0}>
              {isLoading ? (
                <Grid container alignItems="center" justify="center">
                  <CircularProgress />
                </Grid>
              ) : (
                <React.Fragment>
                  <Grid
                    className="create-challenge-header"
                    container
                    alignItems="center"
                    justify="space-between"
                  >
                    <Typography variant="h5" component="h5">
                      {this.context.t('challenge-added')}
                    </Typography>
                    <IconButton
                      className="close-btn"
                      aria-label="Close"
                      aria-haspopup="true"
                      onClick={this.handleClose}
                    >
                      <Close />
                    </IconButton>
                  </Grid>

                  <Grid
                    className="challenges-container"
                    container
                    alignItems="center"
                  >
                    <ChallengeCard
                      imgSrc={require(`../../../images/challenges/${
                        itemSelected.imgSrc
                      }`)}
                      title={this.context.t(itemSelected.title)}
                      description={this.validTitle(
                        this.context.t(itemSelected.description),
                        150,
                      )}
                      label={itemSelected.keywords}
                      minimalis
                      selected
                    />
                    <Typography variant="label" component="label">
                      {this.context.t('sharable-link')}
                    </Typography>
                    <CustomInput
                      value={testUrl}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="copy"
                            onClick={() => this.handleCopy(testUrl)}
                          >
                            <FileCopy />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </Grid>

                  <Grid
                    className="create-challenge-actions"
                    container
                    alignItems="center"
                    justify="center"
                  >
                    <Button
                      className="confirm-btn"
                      color="inherit"
                      onClick={this.handleFinish}
                    >
                      {this.context.t('finish')}
                    </Button>
                  </Grid>
                </React.Fragment>
              )}
            </Paper>
          )}
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            autoHideDuration={6000}
            onClose={this.handleCloseSnackbar}
            open={snackBarOpen}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{snackBarMessage}</span>}
          />
        </div>
      </Modal>
    );
  }
}

CreateChallengeModal.contextTypes = {
  t: PropTypes.func,
};

CreateChallengeModal.propTypes = {
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  createChallenge: PropTypes.func.isRequired,
  handleFinish: PropTypes.func.isRequired,
  curChallenge: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
};

const mapStateToProps = state => ({
  curChallenge: state.challengeReducer.curChallenge,
  isLoading: state.challengeReducer.isLoading,
});

const mapDispatchToProps = {
  createChallenge,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateChallengeModal);
