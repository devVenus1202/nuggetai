import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from '@material-ui/core';
import './TestTab.scss';
class TestTab extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.onChangeTab(value);
  };

  render() {
    const { value } = this.state;

    return (
      <div className={'testTab_root'}>
        <Tabs
          value={value}
          onChange={this.handleChange}
          classes={{ root: 'tabsRoot', indicator: 'tabsIndicator' }}
        >
          <Tab
            disableRipple
            classes={{ root: 'tabRoot', selected: 'tabSelected' }}
            label="Ready"
          />
          <Tab
            disableRipple
            classes={{ root: 'tabRoot', selected: 'tabSelected' }}
            label="Training"
          />
          <Tab
            disableRipple
            classes={{ root: 'tabRoot', selected: 'tabSelected' }}
            label="Incomplete"
          />
        </Tabs>
      </div>
    );
  }
}

TestTab.propTypes = {
};

export default TestTab;