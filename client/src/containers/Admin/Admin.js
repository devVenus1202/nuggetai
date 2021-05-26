import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { get as _get } from 'lodash';
import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  Button,
  InputLabel,
} from '@material-ui/core';
import Papa from 'papaparse';
// import Highlighter from './Highlighter';
import { CSVExporter } from '../../helpers/dataHelper';
import adminActions from '../../redux/admin/actions';
import { getWastonCSV } from '../../utils/services/adminServices';
import {
  eventFields,
  natural_language_understanding_fields,
  tone_analyzer_fields,
  // waston,
  pipelineFields,
  userFields,
  eventInfoFields,
  sections,
} from './eventData';
import { wastonFields } from './wastonFields';

import './Admin.style.scss';

const {
  getAllUsersRequest,
  getUserChallengesRequest,
  getPipelinesRequest,
} = adminActions;

const PERSONALITY = 'personality';
// const NATURAL_LANG = 'natural_lang';
// const TONE_ANALYZER = 'tone_analyzer';

const RAW_EVENT_FIELD = 1;
const NATURAL_FIELD = 2;
const TONE_FIELD = 3;

// const KEYWORD_COUNT = 5;

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      challenge: '',
      pipeline: 0,
      results: 0,
      challengeResult: 0,
      jsonData: {},
    };
  }

  componentDidMount = () => {
    this.fetchUsers();
  };

  fetchUsers = () => {
    const { getAllUsersRequest } = this.props;

    getAllUsersRequest();
  };

  fetchChallenges = userId => {
    const { getUserChallengesRequest } = this.props;

    getUserChallengesRequest(userId);
  };

  fetchPipelines = challengeId => {
    const { getPipelinesRequest } = this.props;

    getPipelinesRequest(challengeId);
  };

  handleUserChange = event => {
    const user = event.target.value;
    this.setState({ user });
    this.fetchChallenges(user);
  };

  handleChallengeChange = event => {
    const challenge = event.target.value;
    this.setState({ challenge });
    this.fetchPipelines(challenge);
  };

  handlePipelineChange = event => {
    const pipeline = event.target.value;
    const { pipelines } = this.props;
    const { users } = pipelines[pipeline];
    if (Array.isArray(users)) {
      const validUsers = users.filter(
        user => user && user.result_id && user.result_id.event_id,
      );
      this.setState({ results: validUsers.length });
    }
    this.setState({ pipeline });
  };

  handleChallengeResultChange = event => {
    const challengeResult = event.target.value;
    // const { pipelines } = this.props;
    // const { pipeline } = this.state;
    // const { users } = pipelines[pipeline];
    this.setState({ challengeResult });
  };

  getDefaultWastonCSV = (fieldName, defaultValue) => {
    const fieldNames = [];
    const fieldValue = [];

    wastonFields.forEach(field => {
      const fieldKey = `${field}_${fieldName}`;
      fieldNames.push(fieldKey);
      fieldValue.push(defaultValue);
    });

    return {
      field: fieldNames,
      value: fieldValue,
    };
  };

  getJSONResult = (data, fields, defaultValue = '', isEvent = 0) => {
    let result = {};
    let fieldNames = [];
    let nameInd = 0;
    let fieldValue = [];
    let valueInd = 0;

    fields.forEach(fieldVal => {
      const { name, field } = fieldVal;

      if (!fieldVal.type && isEvent === RAW_EVENT_FIELD) {
        // record fields for all sections
        sections.forEach(section => {
          if (fieldVal.subfield) {
            // if there is subfield like ['it', 'they', 'them', 'he', 'she', 'him', 'her']
            const { subfield } = fieldVal;
            subfield.forEach(subfieldName => {
              const sectionName = section.name;
              const sectionField = section.field;
              const fieldName = `${name}_${subfieldName}_${sectionName}`;
              const path = `${field}.${sectionField}.${subfieldName}`;
              result[fieldName] = _get(data, path, defaultValue);
              fieldNames[nameInd++] = fieldName;
              fieldValue[valueInd++] = result[fieldName];
            });
          } else {
            const sectionName = section.name;
            const sectionField = section.field;
            const fieldName = `${name}_${sectionName}`;
            const path = `${field}.${sectionField}`;
            result[fieldName] = _get(data, path, defaultValue);
            fieldNames[nameInd++] = fieldName;
            fieldValue[valueInd++] = result[fieldName];
          }
        });
      } else if (isEvent === NATURAL_FIELD) {
        fieldNames[nameInd++] = name;

        // let value = '';

        if (!fieldVal.type) {
          result[name] = _get(data, field, defaultValue);
          fieldNames[nameInd++] = name;
          fieldValue[valueInd++] = result[name];

          // sections.forEach(section => {
          //   const sectionName = section.name;
          //   const sectionField = section.field;
          //   const fieldName = `${name}_${sectionName}`;
          //   const path = `${sectionField}.${field}`;
          //   const sectionValue = _get(data, path, defaultValue);
          //   value += `${sectionName}: ${sectionValue}\n`;
          // });

          // fieldValue[valueInd++] = value;
          // result[name] = value;
        } else if (fieldVal.type === 'keyword') {
          // record concatenated keywords
          // sections.forEach(section => {
          //   const sectionName = section.name;
          //   const sectionField = section.field;
          //   const fieldName = `${name}_${sectionName}`; // keyword field name
          //   const fieldCountName = `${name}_count_${sectionName}`; // keyword count field name
          //   const path = `${sectionField}.${field}`;
          //   let keywords = _get(data, path, '');
          //   let keywordString = '';
          //   if (Array.isArray(keywords)) {
          //     keywords.forEach((keyword, index) => {
          //       keywordString += keyword.text || '';
          //       if (keyword.text && index !== keywords.length - 1) {
          //         keywordString += ', ';
          //       }
          //     });
          //   }
          //   // result[fieldName] = keywordString;
          //   // result[fieldCountName] = keywords.length || 0;
          //   // fieldNames[nameInd++] = fieldName;
          //   // fieldValue[valueInd++] = result[fieldName];
          //   // fieldNames[nameInd++] = fieldCountName;
          //   // fieldValue[valueInd++] = result[fieldCountName];

          //   const sectionValue = keywordString;
          //   value += `${sectionName}: ${sectionValue}\n`;
          // });

          // fieldValue[valueInd++] = value;
          // result[name] = value;

          let keywords = _get(data, field, '');
          let keywordString = '';
          if (Array.isArray(keywords)) {
            keywords.forEach((keyword, index) => {
              keywordString += keyword.text || '';
              if (keyword.text && index !== keywords.length - 1) {
                keywordString += ', ';
              }
            });
          }

          fieldNames[nameInd++] = name;
          fieldValue[valueInd++] = keywordString;
          result[name] = keywordString;
        }
      } else if (isEvent === TONE_FIELD) {
        // if tone analyise event, just store # of fields.

        // fieldNames[nameInd++] = name;

        // let value = '';

        // sections.forEach(section => {
        //   const sectionName = section.name;
        //   const sectionField = section.field;
        //   const fieldName = `${name}_${sectionName}`;
        //   const path = `${sectionField}.${field}`;
        //   const sectionValue = _get(data, path, []).length;
        //   value += `${sectionName}: ${sectionValue}\n`;
        // });

        // fieldValue[valueInd++] = value;
        // result[name] = value;

        result[name] = _get(data, field, defaultValue);
        fieldNames[nameInd++] = name;
        fieldValue[valueInd++] = result[name];
      } else {
        result[name] = _get(data, field, defaultValue);
        fieldNames[nameInd++] = name;
        fieldValue[valueInd++] = result[name];
      }
    });

    return {
      json: result,
      field: fieldNames,
      value: fieldValue,
    };
  };

  handleDownload = async () => {
    const { pipelines } = this.props;
    const { pipeline } = this.state;
    const currentPipeline = pipelines[pipeline]; // get the current pipeline
    // const user = currentPipeline.users[challengeResult]; // get selected assessment result for user

    const defaultValue = 'N/A';
    let finalCSV = [];

    const validPipelineUsers = currentPipeline.users.filter(
      user => user && user.result_id && user.result_id.event_id,
    );
    console.log(currentPipeline.users);

    await Promise.all(
      validPipelineUsers.map(async (user, index) => {
        if (user && user.result_id && user.result_id.event_id) {
          console.log(user.result_id.event_id);
          const eventResult = user.result_id.event_id;
          const events = eventResult.events;
          const eventId = eventResult._id;

          const pipelineData = this.getJSONResult(
            currentPipeline,
            pipelineFields,
            defaultValue,
          );

          const userData = this.getJSONResult(user, userFields, defaultValue);
          const eventInfo = this.getJSONResult(
            eventResult,
            eventInfoFields,
            defaultValue,
          );
          const eventData = this.getJSONResult(
            events,
            eventFields,
            defaultValue,
            RAW_EVENT_FIELD,
          );
          console.log(eventInfo);
          console.log(eventData);

          const naturalEvent = _get(
            events,
            'natural_language_understanding',
            {},
          );
          const toneEvent = _get(events, 'tone_analyzer', {});
          const personalityEvent = _get(events, 'personality_insights', {});

          const naturalData = this.getJSONResult(
            naturalEvent,
            natural_language_understanding_fields,
            defaultValue,
            NATURAL_FIELD,
          );
          const toneData = this.getJSONResult(
            toneEvent,
            tone_analyzer_fields,
            defaultValue,
            TONE_FIELD,
          );

          // let jsonResult = {
          //   ...pipelineData.json,
          //   ...userData.json,
          //   ...eventInfo.json,
          //   ...eventData.json,
          //   ...naturalData.json,
          //   ...toneData.json,
          // };

          let csvFields = [
            ...pipelineData.field,
            ...userData.field,
            ...eventInfo.field,
            ...eventData.field,
            ...naturalData.field,
            ...toneData.field,
          ];

          let csvValue = [
            ...pipelineData.value,
            ...userData.value,
            ...eventInfo.value,
            ...eventData.value,
            ...naturalData.value,
            ...toneData.value,
          ];

          try {
            let wastonCSV = {};

            await Promise.all(
              [PERSONALITY].map(async wastonType => {
                const response = await getWastonCSV(eventId, wastonType);
                wastonCSV[wastonType] = response.data;
              }),
            );

            const personalityWastonCSV = wastonCSV[PERSONALITY];

            const personalityWastonCSVData = _get(
              personalityWastonCSV,
              'data',
              '',
            );

            const personalityFields = wastonFields;
            let personalityValues = [];

            if (personalityWastonCSVData) {
              const personalityWastonData = Papa.parse(personalityWastonCSVData);
              const personalityWastonValue = _get(
                personalityWastonData,
                'data.1',
                [],
              );

              personalityFields.forEach((fieldName, index) => {
                let value = personalityWastonValue[index] || '';

                const fieldValue = value || defaultValue;

                personalityValues[index] = fieldValue;
              });
            } else {
              personalityFields.forEach((fieldName, index) => {
                personalityValues[index] = defaultValue;
              });
            }

            csvFields = [...csvFields, ...personalityFields];
            csvValue = [...csvValue, ...personalityValues];

            // Object.keys(personalityWastonCSVData).forEach(sectionName => {
            //   const csvData = _get(personalityWastonCSVData, sectionName, '');

            //   if (csvData) {
            //     const personalityWastonData = Papa.parse(csvData);

            //     // let personalityWastonField = _get(
            //     //   personalityWastonData,
            //     //   'data.0',
            //     //   [],
            //     // );

            //     const personalityWastonValue = _get(
            //       personalityWastonData,
            //       'data.1',
            //       [],
            //     );

            //     personalityFields.forEach((fieldName, index) => {
            //       let value = personalityValues[index] || '';

            //       const fieldValue = personalityWastonValue[index] || defaultValue;
            //       value += `${sectionName}: ${fieldValue}`;

            //       personalityValues[index] = value;
            //     });
                
            //   } else {
            //     personalityFields.forEach((fieldName, index) => {
            //       let value = personalityValues[index] || '';

            //       const fieldValue = defaultValue;
            //       value += `${sectionName}: ${fieldValue}`;

            //       personalityValues[index] = value;
            //     });
            //   }
            // });

          } catch (err) {
            console.error(err);
          }

          if (index === 0) {
            finalCSV[0] = csvFields;
          }
          finalCSV[index + 1] = csvValue;
        }
      }),
    );
    // export CSV
    console.log(finalCSV);
    const csvResult = Papa.unparse(finalCSV);
    CSVExporter(csvResult, 'nugget_events', true);
  };

  renderUsers = () => {
    const { users } = this.props;
    const { user } = this.state;

    return (
      <FormControl className="user__selector-form">
        <InputLabel htmlFor="users">{this.context.t('userlist')}</InputLabel>
        <Select
          className="user-selector"
          value={user}
          onChange={this.handleUserChange}
        >
          {users.map((user, index) => {
            return (
              <MenuItem value={user._id} key={index}>
                {user.email} - {user._id}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  };

  renderChallenges = () => {
    const { challenges } = this.props;
    const { challenge } = this.state;
    return (
      <FormControl className="challenge__selector-form">
        <InputLabel htmlFor="challenges">
          {this.context.t('challengelist')}
        </InputLabel>
        <Select
          className="challenge-selector"
          value={challenge}
          onChange={this.handleChallengeChange}
        >
          {challenges.map((challenge, index) => {
            return (
              <MenuItem value={challenge._id} key={index}>
                {challenge.test_name} - {challenge._id}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  };

  renderPipelines = () => {
    const { pipelines } = this.props;
    const { pipeline } = this.state;
    return (
      <FormControl className="pipeline__selector-form">
        <InputLabel htmlFor="pipelines">
          {this.context.t('pipelinelist')}
        </InputLabel>
        <Select
          className="pipeline-selector"
          value={pipeline}
          onChange={this.handlePipelineChange}
        >
          {pipelines.map((pipeline, index) => {
            return (
              <MenuItem value={index} key={index}>
                {pipeline.title} - {pipeline._id}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  };

  renderChallengeResults = () => {
    const { pipelines } = this.props;
    const { challengeResult, pipeline } = this.state;
    const { users = [] } = pipelines[pipeline] || {};

    return (
      <FormControl className="pipeline__selector-form">
        <InputLabel htmlFor="pipelines">
          {this.context.t('challenge-result-list')}
        </InputLabel>
        <Select
          className="pipeline-selector"
          value={challengeResult}
          onChange={this.handleChallengeResultChange}
        >
          {users.map((user, index) => {
            if (user && user.email) {
              const {
                email = '',
                result_id: {
                  event_id: { _id },
                },
              } = user;
              return (
                <MenuItem value={index} key={index}>
                  {email} - {_id}
                </MenuItem>
              );
            }
          })}
        </Select>
      </FormControl>
    );
  };

  render() {
    // const { pipelines } = this.props;
    const { results } = this.state;
    // const { pipeline, results, challengeResult } = this.state;
    // const { users = [] } = pipelines[pipeline] || {};
    // const jsonData = users[challengeResult] || {};

    return (
      <Grid container>
        <Grid item xs={6}>
          <div className="admin-page-wrapper">
            {this.renderUsers()}
            {this.renderChallenges()}
            {this.renderPipelines()}
            <p>
              {this.context.t('count')} - {results}
            </p>
            <Button
              onClick={this.handleDownload}
              color="primary"
              variant="contained"
            >
              {this.context.t('download')}
            </Button>
          </div>
        </Grid>
        <Grid item xs={6}>
          {/* <Highlighter jsonData={jsonData} /> */}
        </Grid>
      </Grid>
    );
  }
}

Admin.propTypes = {
  users: PropTypes.array,
  pipelines: PropTypes.array,
  challenges: PropTypes.array,
  getAllUsersRequest: PropTypes.func,
  getUserChallengesRequest: PropTypes.func,
  getPipelinesRequest: PropTypes.func,
};

const mapStateToProps = state => ({
  users: state.adminReducer.users,
  pipelines: state.adminReducer.pipelines,
  challenges: state.adminReducer.challenges,
});

const mapDispatchToProps = {
  getAllUsersRequest,
  getUserChallengesRequest,
  getPipelinesRequest,
};
Admin.contextTypes = {
  t: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Admin);
