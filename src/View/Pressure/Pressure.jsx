import React from "react";
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import axios from 'axios';

export default class Pressure extends React.Component {

    constructor() {
        super()
        this.state = {
            data: [],
            chartOptions: {
                chart: {
                    type: 'line',
                    animation: Highcharts.svg,
                    marginRight: 10
                },
                time: {
                    useUTC: false
                },
                title: {
                    text: 'Live Pressure Data'
                },
                xAxis: {
                    type: 'datetime',
                    tickPixelInterval: 150
                },
                yAxis: {
                    title: {
                        text: 'Pressure'
                    },
                    labels: {
                        formatter: function () {
                            return this.value + 'Pa';
                        }
                    },
                    plotLines: [{
                        value: 0,
                        width: 2,
                        color: '#55BF3B'
                    }]
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br/>',
                    pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
                },
                legend: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                series: [{
                    name: 'Pressure data',
                    data: [{}]
                }]
            }
        }
        setInterval(() => this.setState({
            chartOptions: {
                series: [{
                    data: (function () {

                        var data = [],
                            time = (new Date()).getTime(),
                            i;

                        for (i = -19; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: Math.random()
                            });
                        }
                        console.log(data)
                        return data;
                    }())
                }]
            }
        }
        ), 1500)
    }

    render() {
        return (
            <div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={this.state.chartOptions}
                />
            </div>
        )
    }
}

