import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';

HighchartsMore(Highcharts);

class PolarSpiderChart extends Component {

    constructor(props, context) {
        super(props, context);
        this.chartComponent = React.createRef();

    }

    componentDidMount() {
        const container = this.chartComponent.current.container.current;
        container.style.height = "100%";
        container.style.width = "100%";        
        this.chartComponent.current.chart.reflow();
      }

    render() {
        const { series, categories } = this.props;

        const options = {
            chart: {
                polar: true,
                type: 'area',
            },

            title: {
                text: null,
            },

            xAxis: {
                categories,
                tickmarkPlacement: 'on',
                lineWidth: 0,
                labels: {
                    format: '<h6 style="font-size: 7.9px; letter-spacing: normal; color: #505d6f;">{value}</h6>',
                }           ,
            },
          
            legend: {
                enabled: false,
            },

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500,
                    },
                    chartOptions: {
                        pane: {
                            size: '60%',
                        },
                    },
                }],
            },
            
            series,
        };
        return (
            <HighchartsReact
                ref={this.chartComponent} 
                allowChartUpdate={true}
                highcharts={Highcharts}
                options={options}
            />
        );
    }
}

PolarSpiderChart.propTypes = {
    series: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    ref: PropTypes.any,
};

export default PolarSpiderChart;

