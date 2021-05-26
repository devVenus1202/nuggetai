import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';

import PipelineSelector from './PipelineSelector';
import { PolarSpiderChart } from '../Charts/Charts';
import DataTable from '../../components/DataTable';

class TeamDynamic extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  constructor(props) {
    super(props);
    this.state = {
      pipelines: [],
      chartData: [],
      users: [],
      selectedUsers: [],
      currentPipeline: {},
      simulatedPipeline: {},
      currentPipelineId: 0,
    };
  }

  UNSAFE_componentWillReceiveProps(props) {
    const { pipelines, skillCategories } = props;
    const currentPipeline = {
      name: `Current-${pipelines[0].title}`,
      data: this.calcuteAvg(skillCategories, pipelines[0].users),
      pointPlacement: 'on',
      color: pipelines[0].color,
    };

    const simulatedPipeline = {
      name: `Simulated-${pipelines[0].title}`,
      data: this.calcuteAvg(skillCategories, pipelines[0].users),
      pointPlacement: 'on',
      color: pipelines[0].color,
    };

    this.setState({
      pipelines: pipelines,
      users: pipelines[0].users,
      originCandidates: pipelines[0].users,
      currentPipeline,
      simulatedPipeline,
    });
  }

  handleChangeCurrentPipeline = pipeline => {
    const { skillCategories } = this.props;
    const currentPipeline = {
      name: `Current-${pipeline.title}`,
      data: this.calcuteAvg(skillCategories, pipeline.users),
      pointPlacement: 'on',
      color: pipeline.color,
    };
    this.setState({
      currentPipelineId: pipeline._id,
      users: pipeline.users,
      currentPipeline,
    });
  };

  handleChangeSimulatePipeline = pipeline => {
    const { skillCategories } = this.props;
    const simulatedPipeline = {
      name: `Simulated-${pipeline.title}`,
      data: this.calcuteAvg(skillCategories, pipeline.users),
      pointPlacement: 'on',
      color: pipeline.color,
    };

    this.setState({
      simulatedPipeline,
    });
  };

  changeSelectedUser = user => {
    const { selectedUsers } = this.state;
    const existUser = selectedUsers.findIndex(item => item.id === user.id);
    if (existUser >= 0 && !user.isChecked) {
      selectedUsers.splice(existUser, 1);
    } else if (existUser < 0 && user.isChecked) {
      selectedUsers.push(user);
    }
    this.setState({ selectedUsers });
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

  unSelectedUser = user => {
    const { selectedUsers } = this.state;
    const existUser = selectedUsers.findIndex(item => item.id === user.id);
    selectedUsers.splice(existUser, 1);
    this.setState({ selectedUsers });
  };

  render() {
    const { users, selectedUsers, currentPipelineId } = this.state;
    const { pipelines, benchmark } = this.props;
    let allUsers = [];

    let benchmarkedPipeline = {};
    let simulateColor = '';
    pipelines.forEach((pipeline, index) => {
      const { users } = pipeline;
      if (index !== benchmark) {
        benchmarkedPipeline = pipeline;
      } else {
        simulateColor = pipeline.color;
        allUsers = [...users];
      }
    });

    const { skillCategories } = this.props;
    let currentPipeline = {};
    let simulatedPipeline = {};
    if (benchmarkedPipeline.users) {
      currentPipeline = {
        name: `Current-${benchmarkedPipeline.title}`,
        data: this.calcuteAvg(skillCategories, benchmarkedPipeline.users),
        pointPlacement: 'on',
        color: benchmarkedPipeline.color,
      };
      simulatedPipeline = {
        name: `Simulated `,
        data: this.calcuteAvg(skillCategories, selectedUsers),
        pointPlacement: 'on',
        color: simulateColor,
      };
    }

    return (
      <Grid container spacing={32}>
        <Grid item xs={12} md={6}>
          {/* <div className="pipeline-selector-container">
            <PipelineSelector
              data={pipelines}
              onChange={value => this.handleChangeCurrentPipeline(value)}
            />
            <Typography component="div">in</Typography>
            <PipelineSelector
              data={pipelines}
              onChange={value => this.handleChangeSimulatePipeline(value)}
            />
          </div> */}
          <DataTable
            key={benchmark}
            data={allUsers}
            expanded={true}
            type={2}
            isFullScreenPipeline={false}
            // onShowSlidePane={() => {}}
            handleSettings={this.handleSettings}
            showCheckbox={true}
            selectedUsers={selectedUsers}
            onSelectUser={user => this.changeSelectedUser(user)}
            className="talent-datagrid"
            onShowSlidePane={this.props.showSlide}
            userAction={(cid, type) => {
              this.props.onClickIcon(cid, type);
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid item xs={12}>
            <PolarSpiderChart
              series={[currentPipeline, simulatedPipeline]}
              categories={this.props.skillCategories}
              labels={selectedUsers.map(item => {
                return {
                  id: item.id,
                  title: item.fullname || item.firstname + item.lastname,
                };
              })}
              onDelete={item => this.unSelectedUser(item)}
              className={'polarchart'}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

TeamDynamic.propTypes = {
  skillCategories: PropTypes.object,
  pipelines: PropTypes.object.isRequired,
  benchmark: PropTypes.number,
};
export default TeamDynamic;
