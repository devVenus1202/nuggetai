import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

import PipelineSelector from './PipelineSelector';
import { AreaChart } from '../Charts/Charts';
import DataTable from '../../components/DataTable';

class TalentFunnel extends Component {
  static propTypes = {
    prop: PropTypes,
  };
  constructor(props) {
    super(props);
    this.state = {
      pipelines: [],
      chartData: [],
      users: [],
      originCandidates: [],
      currentPipeline: '',
      userRange: 0,
    };
  }

  UNSAFE_componentWillReceiveProps(props) {
    const { pipelines } = props;
    this.setState({
      pipelines: pipelines,
      users: pipelines[0].users,
      originCandidates: pipelines[0].users,
    });
  }

  handleChangeFunnelPipeline = pipeline => {
    this.setState({
      currentPipeline: pipeline._id,
      originCandidates: pipeline.users,
      users: pipeline.users,
    });
  };

  setUserRange = range => {
    const users = [];
    const { originCandidates, userRange } = this.state;
    if (userRange === range) {
      return;
    }
    originCandidates.forEach(item => {
      if (item.rank <= range) {
        users.push(item);
      }
    });
    this.setState({ userRange: range, users });
  };
  changeSelectedUser = user => {
    this.setState({ selectedUsers: [user] });
  };

  render() {
    const { chartData, users, currentPipeline, selectedUsers } = this.state;
    const { pipelines, benchmark } = this.props;
    let allUsers = [];
    pipelines.forEach((pipeline, index) => {
      const { users } = pipeline;
      if (index !== benchmark) {
        return;
      }
      allUsers = [...users];
    });
    return (
      <Grid container spacing={32}>
        <Grid item xs={12} md={6}>
          {/* <div className="pipeline-selector-container">
            <PipelineSelector
              data={pipelines}
              onChange={value => this.handleChangeFunnelPipeline(value)}
            />
          </div> */}
          <AreaChart
            series={chartData}
            selectArea={range => this.setUserRange(range)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DataTable
            key={benchmark}
            data={allUsers}
            expanded={true}
            type={2}
            isFullScreenPipeline={false}
            onShowSlidePane={this.props.showSlide}
            handleSettings={this.handleSettings}
            showCheckbox={false}
            showSearchBar={true}
            className="talent-datagrid"
            highlightRow={true}
            selectedUsers={selectedUsers}
            onSelectUser={user => this.changeSelectedUser(user)}
            userAction={(cid, type) => {
              this.props.onClickIcon(cid, type);
            }}
          />
        </Grid>
      </Grid>
    );
  }
}
TalentFunnel.propTypes = {
  pipelines: PropTypes.object,
};
export default TalentFunnel;
