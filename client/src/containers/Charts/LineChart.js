import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default class LineChart extends Component {
  render() {
    const options = {
      chart: {
        type: 'areaspline'
      },
      title: {
        text: ''
      },
      series: [{
        name: 'Applications Sent',
        data: [10, 15, 34, 84, 87, 130, 180, 230, 290, 310]
      }, {
        name: 'Candidate Assessments',
        data: [2, 7, 13, 22, 30, 67, 74, 120, 165, 282]
      }]
    };
    return (
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
    );
  }
}

