import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import bottom from '../../images/bottom.png';
import clouds from '../../images/clouds.png';
import './COnboard.scss';

import { Button, Grid } from '@material-ui/core';

const company = 'McGill Case League';

class COnboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      match: {
        params: { testid, pipelineid }
      }
    } = this.props;

    return (
      <div className="onBoardWrapper">
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className="login_wrapper"
        >
          <Grid item sm={6}>
            <div className="form">
              <h1>Hi there!</h1>
              <p>
                {company} {this.context.t('solve-three-steps')}.
              </p>
              <p>
                <strong>{this.context.t('important-instructions')}:</strong>
                {this.context.t('instructions')}.
              </p>
              <p>
                {this.context.t('confirmation-message')}
              </p>

              <a href={`/taketest/${testid}/${pipelineid}`}>
                <Button
                  className="enter_but"
                  variant="contained"
                  color="primary"
                >
                  <strong>{this.context.t('start-test')}</strong>
                </Button>
              </a>
            </div>
          </Grid>
        </Grid>

        <img className="cloudImage" src={clouds} alt="cloud" />
        <img className="bottomImg" src={bottom} alt="nugget" />
      </div>
    );
  }
}

COnboard.propTypes = {
  user: PropTypes.object,
  match: PropTypes.shape({
    params: {
      testid: PropTypes.string,
      pipelineid: PropTypes.string
    }
  })
};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(
  mapStateToProps,
  null
)(COnboard);
