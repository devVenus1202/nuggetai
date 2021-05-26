import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { Grid, Button, IconButton } from '@material-ui/core';
import { Add, ViewList, ViewModule } from '@material-ui/icons';
import challengeActions from '../../redux/challenge/actions';
import TrainLinkModal from '../../components/Modals/TrainLinkModal/TrainLinkModal';
import TestCardDeleteModal from '../../components/Modals/TestCardDeleteModal/TestCardDeleteModal';
import TestCard from '../../components/TestCard';
import cover from '../../images/cover.png';
import './Dashboard.scss';
import Footer from '../../components/Footer/Footer';
import SearchInput from '../../components/SearchInput';
import { items } from '../CreateTest/Steps/data';
import CreateChallengeModal from '../../components/Modals/CreateChallengeModal/CreateChallengeModal';

const { getAllChallenge, deleteChallenge, updateChallenge } = challengeActions;

const READY_CARD = 'READY_CARD';
const INCOMPLETE_CARD = 'INCOMPLETE_CARD';
const TRAINING_CARD = 'TRAINING_CARD';

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showModal: false,
      showCardDeleteModal: false,
      testId: null,
      modalTrainLink: 'this is the link',
      editingStatus: {},
      tab: 0,
      filterText: '',
      listMode: false,
      showCreate: false,
    };

    this.uname = 1;

    this.toogleViewMode = this.toogleViewMode.bind(this);
    this.onCreateChallenge = this.onCreateChallenge.bind(this);
    this.onCloseChallenge = this.onCloseChallenge.bind(this);
    this.handleFinishCreate = this.handleFinishCreate.bind(this);
  }

  componentDidMount() {
    const { getAllChallenge } = this.props;
    getAllChallenge();
  }

  onCreateChallenge = () => {
    this.setState({ showCreate: true });
  };

  onCloseChallenge = () => {
    this.setState({ showCreate: false });
  };

  validTitle = (desc, limit) => {
    if (desc && desc.length > limit) {
      return desc.slice(0, limit) + ' ...';
    }
    return desc || `Uname ${this.uname++}`;
  };

  handleSelectTitle = event => {
    event.stopPropagation();
  };

  handleSearch = event => {
    this.setState({ filterText: event.target.value });
  };

  hideTestCardDeleteModal = () => {
    this.setState({ showCardDeleteModal: false });
  };

  handleConfirmDelete = () => {
    this.setState({ showCardDeleteModal: false });
    const { deleteChallenge } = this.props;
    const { challengeId } = this.state;

    deleteChallenge(challengeId);
  };

  handleTestCardDelete = challengeId => () => {
    this.setState({ showCardDeleteModal: true, challengeId });
  };

  handleClickCard = challengeId => {
    this.props.history.push(`results/${challengeId}`);
  };

  handleChangeTitle = (challengeId, curTitle) => event => {
    const { updateChallenge } = this.props;
    const title = event.target.value;

    if (title !== curTitle) {
      updateChallenge({
        challengeId,
        data: {
          test_name: title,
        },
      });
    }
  };

  renderTestCards = (challenges, filterText, listMode) => {
    return challenges.map((eachtest, ind) => {
      const createdAtFormatted = eachtest.createdAt
        ? moment(new Date(eachtest.createdAt)).format('MMM DD, YYYY')
        : null;
      const testId = eachtest._id;
      let thumbnail = null;

      try {
        thumbnail = require(`../../images/challenges/${eachtest.image}`);
      } catch (e) {
        console.log(e);
      }

      if (
        !this.validTitle(eachtest.test_name, 25)
          .toLowerCase()
          .includes(filterText.toLowerCase())
      ) {
        return null;
      } else {
        return (
          <Grid
            item
            xs={12}
            sm={listMode ? 12 : 6}
            md={listMode ? 6 : 4}
            key={eachtest._id}
            className="col"
          >
            <div className="ImgCard">
              <TestCard
                handleClickCard={this.handleClickCard}
                key={testId}
                testId={testId}
                image={thumbnail || cover}
                title={this.context.t(eachtest.test_name)}
                time={createdAtFormatted || 'Aug 19, 2018'}
                keywords={eachtest.keywords || []}
                handleDeleteClick={this.handleTestCardDelete(testId)}
                onChangeTitle={this.handleChangeTitle(
                  testId,
                  eachtest.test_name,
                )}
                removable
                description={this.validTitle(
                  this.context.t(eachtest.test_desc),
                  listMode ? 115 : 130,
                )}
                listMode={listMode}
              />
            </div>
          </Grid>
        );
      }
    });
  };

  toogleViewMode(listMode) {
    this.setState({ listMode });
  }

  handleFinishCreate() {
    const { getAllChallenge, history, curChallenge } = this.props;
    getAllChallenge();

    this.setState({
      showCreate: false,
    });

    history.push(`results/${curChallenge._id}`);
    this.setState({ showCreate: false });
  }

  render() {
    const { challenges } = this.props;
    const { filterText, listMode, showCreate } = this.state;
    this.uname = 1;

    return (
      <div>
        <div className="dashboard">
          <Grid container spacing={24}>
            <Grid container className="dashboard_header" xs={12}>
              <Grid xs={12} sm={6} className="leftPanel">
                <SearchInput
                  className="search__bar"
                  onChange={this.handleSearch}
                  placeholder={this.context.t('search')}
                />
              </Grid>
              <Grid
                container
                xs={12}
                sm={6}
                className="addMember"
                direction="row"
                alignItems="center"
                justify="flex-end"
              >
                <Button
                  className="createnew__but"
                  variant="contained"
                  color="inherit"
                  onClick={this.onCreateChallenge}
                >
                  <Add />
                  &nbsp;{this.context.t('create-challenge')}
                </Button>
                <IconButton
                  className={`enable-${listMode}`}
                  aria-label="List"
                  aria-haspopup="true"
                  onClick={() => this.toogleViewMode(true)}
                >
                  <ViewList />
                </IconButton>
                <IconButton
                  className={`enable-${!listMode}`}
                  aria-label="Grid"
                  aria-haspopup="true"
                  onClick={() => this.toogleViewMode(false)}
                >
                  <ViewModule />
                </IconButton>
              </Grid>
            </Grid>

            <Grid className="card_container" container spacing={24}>
              {
                <Grid item xs={12} sm={listMode ? 12 : 6} md={listMode ? 6 : 4}>
                  <div className="ImgCard">
                    <TestCard
                      handleClickCard={() =>
                        this.handleClickCard('123456', READY_CARD)
                      }
                      image={cover}
                      title={this.context.t('example-challenge')}
                      time="Sep 19, 2018"
                      readOnly
                      listMode={listMode}
                    />
                  </div>
                </Grid>
              }
              {challenges &&
                this.renderTestCards(challenges, filterText, listMode)}
            </Grid>
          </Grid>
          <TrainLinkModal
            trainlink={this.state.modalTrainLink}
            show={this.state.showModal}
            onHide={() => {
              this.setState({ showModal: false });
            }}
          />
          <TestCardDeleteModal
            testId={this.state.testId}
            show={this.state.showCardDeleteModal}
            onHide={this.hideTestCardDeleteModal}
            deleteTest={this.handleConfirmDelete}
          />
          {showCreate && (
            <CreateChallengeModal
              show={showCreate}
              onHide={this.onCloseChallenge}
              handleFinish={this.handleFinishCreate}
            />
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

Dashboard.contextTypes = {
  t: PropTypes.func,
};

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  challenges: PropTypes.array.isRequired,
  getAllChallenge: PropTypes.func.isRequired,
  deleteChallenge: PropTypes.func.isRequired,
  updateChallenge: PropTypes.func.isRequired,
  curChallenge: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.authReducer.user,
  curChallenge: state.challengeReducer.curChallenge,
  challenges: state.challengeReducer.challenges,
  isLoading: state.challengeReducer.isLoading,
});

const mapDispatchToProps = {
  getAllChallenge,
  deleteChallenge,
  updateChallenge,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Dashboard),
);
