import React, { Component } from 'react';
import Highcharts from 'highcharts';
import PropTypes from 'prop-types';
import {
  cloneDeep as _cloneDeep,
  range as _range,
  get as _get,
  set as _set,
} from 'lodash';
import HighchartsReact from 'highcharts-react-official';
import GraphLegends from './Charts/GraphLegends';
import { getRandomName, getRandomInt } from './dummyData';
import { getGraphData, getGraphSeries } from './graphData';

const randomColor = [
  'rgba(223, 83, 83, .5)',
  'rgba(248, 206, 8, .5)',
  'rgba(248, 206,248, .5)',
  'rgba(8, 206,248, .5)',
  'rgba(83, 83,248, .5)',
  'rgba(8, 206,83, .5)',
];

const shapes = ['circle', 'triangle', 'square'];

const dummySeriesTitles = ['Digital business team', 'Innovation Lab'];

const sizes = [8, 13];

export default class ScatterPlot extends Component {
  state = {
    legends: {
      shape: {
        square: false,
        circle: true,
        triangle: false,
      },
      size: {
        small: true,
        big: false,
      },
      color: [true, true],
    },
  };

  static propTypes = {
    isDummyData: PropTypes.bool,
    onClickPlot: PropTypes.func,
    data: PropTypes.array,
  };

  userData = [];

  getToolTip = (xPos, yPos) => {
    return '';
  };

  getFilter = () => {
    const { legends } = this.state;

    return legends;
  };

  handleChangeLegends = path => {
    this.setState(prevState => {
      const changed = !_get(prevState.legends, path);
      _set(prevState.legends, path, changed);

      return {
        legends: prevState.legends,
      };
    });
  };

  getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  render() {
    const { isDummyData, onClickPlot, data } = this.props;
    let employeeData = [[150.2, 47.6], [162.6, 54.5], [175.8, 71.3]];

    employeeData = employeeData.map(eachVal => {
      return [eachVal[0] * Math.random(), eachVal[1] * Math.random()];
    });

    let candidateData = [
      [174.0, 65.6],
      [175.3, 71.8],
      [193.5, 80.7],
      [186.5, 72.6],
      [187.2, 78.8],
      [181.5, 74.8],
      [184.0, 86.4],
      [184.5, 78.4],
      [175.0, 62.0],
      [184.0, 81.6],
      [180.0, 76.6],
      [177.8, 83.6],
      [192.0, 90.0],
      [176.0, 74.6],
      [174.0, 71.0],
      [184.0, 79.6],
      [192.7, 93.8],
      [171.5, 70.0],
      [173.0, 72.4],
      [176.0, 85.9],
      [176.0, 78.8],
      [180.5, 77.8],
      [172.7, 66.2],
      [176.0, 86.4],
      [173.5, 81.8],
      [178.0, 89.6],
      [180.3, 82.8],
      [180.3, 76.4],
      [164.5, 63.2],
      [173.0, 60.9],
    ];

    candidateData = candidateData.map(eachVal => {
      return [eachVal[0] * Math.random(), eachVal[1] * Math.random()];
    });

    const getToolTip = this.getToolTip;
    let series;

    if (!isDummyData) {
      series = data.map((pipeline, ind) => {
        const { users } = pipeline;

        employeeData = _range(users.length).map(ind => {
          const randomValue = this.getRandomInt(5);
          this.userData[ind] = {
            xPos: candidateData[ind][0] * randomValue,
            yPos: candidateData[ind][1] * randomValue,
            data: users[ind],
          };
          return candidateData[ind];
        });

        return {
          name: pipeline.title,
          color: randomColor[ind],
          data: employeeData,
          marker: {
            symbol: 'circle',
            radius: 15,
          },
        };
      });
    } else {
      series = getGraphSeries(getGraphData(), this.getFilter());
    }

    const options = {
      chart: {
        type: 'scatter',
        zoomType: 'xy',
      },
      title: {
        text: '',
      },
      subtitle: {
        text: '',
      },
      xAxis: {
        title: {
          enabled: true,
          text: '',
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true,
      },
      yAxis: {
        title: {
          text: '',
        },
      },
      legend: {
        enabled: false,
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        floating: true,
        backgroundColor:
          (Highcharts.theme && Highcharts.theme.legendBackgroundColor) ||
          '#FFFFFF',
        borderWidth: 1,
      },
      tooltip: {
        enabled: true,
        shared: true,
        formatter: function() {
          return `${getRandomName()}, Score: ${getRandomInt(100)}`;
        },
      },
      plotOptions: {
        scatter: {
          marker: {
            states: {
              hover: {
                enabled: true,
                lineColor: 'rgb(100,100,100)',
              },
            },
          },
          states: {
            hover: {
              marker: {
                enabled: false,
              },
            },
          },
          tooltip: {},
        },
        series: {
          events: {
            click: event => {
              onClickPlot(getRandomName(), getRandomInt(50));
            },
          },
        },
      },
      series: _cloneDeep(series),
      credits: {
        enabled: false,
      },
    };

    return (
      <React.Fragment>
        <GraphLegends
          value={this.state.legends}
          onChange={this.handleChangeLegends}
        />
        <HighchartsReact highcharts={Highcharts} options={options} />
      </React.Fragment>
    );
  }
}
