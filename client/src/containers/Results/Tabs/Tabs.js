import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Tabs.css';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class CustomizedTabs extends React.Component {

  handleChange = (event, value) => {
    this.props.onChange(value);
  };

  render() {
    const { value } = this.props;

    return (
      <div className={'Tab_root'}>
        <Tabs
          value={value}
          onChange={this.handleChange}
          classes={{ root: 'tabsRoot', indicator: 'tabsIndicator' }}
        >
          <Tab
            disableRipple
            classes={{ root: 'tabRoot', selected: 'tabSelected' }}
            label="Summary"
          />
          <Tab
            disableRipple
            classes={{ root: 'tabRoot', selected: 'tabSelected' }}
            label="Your Team"
          />
          <Tab
            disableRipple
            classes={{ root: 'tabRoot', selected: 'tabSelected' }}
            label="Candidates"
          />
        </Tabs>
      </div>
    );
  }
}

CustomizedTabs.propTypes = {
};

export default CustomizedTabs;

