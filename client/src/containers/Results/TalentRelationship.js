import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScatterPlot } from '../Charts/Charts';
class TalentRelationship extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  render() {
    console.log(this.props.skillCategoriesData);
    return (
      <div>
        <ScatterPlot
          onClickPlot={this.handleClickPlot}
          stepvalue={1}
          data={this.props.pipelines}
          isDummyData={true}
          categories={this.props.skillCategories}
        />
      </div>
    );
  }
}
export default TalentRelationship;
