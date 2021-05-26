import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { view, lensPath } from 'ramda';
import { Button } from '@material-ui/core';
import candidateActions from '../../redux/candidate/actions';
import { JSONToCSVConvertor, toFixedPoint } from '../../helpers/dataHelper';
import './RawEvents.scss';

const { getCandidate } = candidateActions;
const sections = ['Identify', 'Collect', 'Engender', 'Recommend', 'General'];

class RawEvents extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      events: null,
    };
  }

  componentDidMount() {
    const {
      match: {
        params: {
          challengeId,
          pipelineId,
          userEmail,
        },
      },
      getCandidate,
    } = this.props;

    getCandidate({
      challengeId,
      pipelineId,
      userEmail,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.candidate === null && this.props.candidate) {
      const { candidate } = this.props;
      const events = candidate.result.event_id.events;
      console.log(candidate)
      this.setState({ events });
    }
  }

  exportToCSV = () => {
    const { events } = this.state;
    const json = [events];
    JSONToCSVConvertor(json, 'event_result', true);
  }

  render() {
    const { events } = this.state;
    if (events === null) {
      return '';
    }
    console.log(events)
    return (
      <div className='dashboard'>
        <h1>
        <Button
          variant="contained"
          color="primary" 
          onClick={this.exportToCSV}
        >
          {this.context.t('export-to-csv')}
        </Button>
        </h1>
        {
          events.map((event, ind) => {
            const { type, data } = event;
            return (
              <div key={ind}>
                <p>{this.context.t('type')}: {type}</p>
                <p>{this.context.t('data')}: {JSON.stringify(data)}</p>
                <br />
              </div>
            );
          })
        }
      </div>
    ); 
  }
}

RawEvents.propTypes = {
  getCandidate: PropTypes.func.isRequired,
  candidate: PropTypes.object,
  match: PropTypes.shape({
    params: {
      challengeId: PropTypes.string.isRequired,
      pipelineId: PropTypes.string.isRequired,
      userEmail: PropTypes.string.isRequired,
    },
  }),
};

const mapStateToProps = state => ({
  candidate: state.candidateReducer.candidate,
});

const mapDispatchToProps = {
  getCandidate,
};

export default connect(mapStateToProps, mapDispatchToProps)(RawEvents);
