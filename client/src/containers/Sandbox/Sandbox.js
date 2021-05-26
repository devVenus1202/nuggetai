import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
// import SearchIcon from '@material-ui/icons/Search';
import FlipMove from 'react-flip-move';
import challengeActions from '../../redux/sandbox/actions';
import ChallengeCard from '../../components/ChallengeCard';
import cover from '../../images/cover.png';
import Footer from '../../components/Footer/Footer';
import SearchInput from '../../components/SearchInput';
import './Sandbox.scss';
import { items } from '../CreateTest/Steps/data';

const { getAllChallenge } = challengeActions;

class SandBox extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      filterText: '',
      windowWidth: window.innerWidth,
    };

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    const { getAllChallenge } = this.props;
    getAllChallenge();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  handleSearch = event => {
    this.setState({ filterText: event.target.value });
  };

  handleClickCard = challengeId => {
    // this.props.history.push(`results/${challengeId}`);
  };

  validTitle = (desc, limit) => {
    if (desc && desc.length > limit) {
      return desc.slice(0, limit) + ' ...';
    }
    return desc || `Uname ${this.uname++}`;
  };

  updateDimensions() {
    this.setState({ windowWidth: window.innerWidth });
  }

  renderTestCards = (challenges, filterText, windowsWidth) => {
    return challenges
      .reverse()
      .filter(c => c.active)
      .map((eachtest, ind) => {
        // const createdAtFormatted = eachtest.createdAt
        //   ? moment(new Date(eachtest.createdAt)).format('MMM DD, YYYY')
        //   : null;
        // const testId = eachtest._id;
        const thumbnail = require(`../../images/challenges/${eachtest.imgSrc}`);

        if (
          !this.validTitle(eachtest.title, 25)
            .toLowerCase()
            .includes(filterText.toLowerCase())
        ) {
          return null;
        } else {
          return (
            <Grid item xs={12} sm={6} md={6} key={eachtest._id}>
              <div
                className="img-card"
                // onClick={() =>
                //   this.handleClickCard(testId)
                // }
              >
                <ChallengeCard
                  key={ind}
                  imgSrc={thumbnail || cover}
                  title={this.context.t(eachtest.title)}
                  description={this.validTitle(
                    this.context.t(eachtest.description),
                    windowsWidth < 992 ? 50 : 140,
                  )}
                  label={eachtest.keywords}
                />
              </div>
            </Grid>
          );
        }
      });
  };

  render() {
    const { challenges } = this.props;
    const { filterText, windowWidth } = this.state;
    this.uname = 1;

    return (
      <div>
        <Grid className="sandbox" container>
          <Grid container className="sandbox-wrapper">
            <Grid
              container
              alignItems="center"
              justify="center"
              xs={12}
              className="sandbox-wrapper"
            >
              <Grid item xs={12} sm={6} className="search__bar_container">
                <Typography className="challenges-availab" gutterBottom>
                  {this.context.t('n-challenges-available', {
                    n: items.filter(i => i.active).length,
                  })}
                </Typography>
              </Grid>
              <Grid
                container
                xs={12}
                sm={6}
                className="search__bar_container"
                alignItems="center"
                justify="flex-end"
              >
                <SearchInput
                  className="input-search"
                  placeholder={this.context.t('search-challenge')}
                  value={this.state.filterText}
                  onChange={this.handleSearch}
                />
              </Grid>
            </Grid>
            <Grid container spacing={25} xs={12}>
              <FlipMove className="challenges-container">
                {items && this.renderTestCards(items, filterText, windowWidth)}
              </FlipMove>
            </Grid>
          </Grid>
        </Grid>
        <Footer />
      </div>
    );
  }
}

SandBox.contextTypes = {
  t: PropTypes.func,
};

SandBox.propTypes = {
  user: PropTypes.object.isRequired,
  challenges: PropTypes.array.isRequired,
  getAllChallenge: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.authReducer.user,
  curChallenge: state.sandboxReducer.curChallenge,
  challenges: state.sandboxReducer.challenges,
  isLoading: state.sandboxReducer.isLoading,
});

const mapDispatchToProps = {
  getAllChallenge,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SandBox),
);
