import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import axios from "axios";

export default class Graphs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      chartOptions: {
        chart: {
          type: "spline",
          animation: Highcharts.svg,
          marginRight: 10
        },
        time: {
          useUTC: false
        },
        title: {
          text: "Live Temperature Data"
        },
        xAxis: {
          type: "datetime",
          tickPixelInterval: 150
        },
        yAxis: {
          title: {
            text: "Temperature"
          },
          labels: {
            formatter: function() {
              return this.value + "°C";
            }
          },
          plotLines: [
            {
              value: 0,
              width: 1,
              color: "#808080"
            }
          ]
        },
        tooltip: {
          headerFormat: "<b>{series.name}</b><br/>",
          pointFormat: "{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}"
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        series: [
          {
            name: "Temperature data",
            data: this.props.temperatureData
          }
        ]
      }
    };
    // setInterval(
    //   () =>
    //     this.setState({
    //       chartOptions: {
    //         series: [
    //           {
    //             data: (function() {
    //               var data = [],
    //                 time = new Date().getTime(),
    //                 i;

    //               for (i = -19; i <= 0; i += 1) {
    //                 data.push({
    //                   x: time + i * 1000,
    //                   y: Math.random()
    //                 });
    //               }
    //               console.log(data);
    //               return data;
    //             })()
    //           }
    //         ]
    //       }
    //     }),
    //   1500
    // );
  }
  componentWillReceiveProps(nextProps) {
    this.state = {
      data: [],
      chartOptions: {
        chart: {
          type: "spline",
          animation: Highcharts.svg,
          marginRight: 10
        },
        time: {
          useUTC: false
        },
        title: {
          text: "Live Temperature Data"
        },
        xAxis: {
          type: "datetime",
          tickPixelInterval: 150
        },
        yAxis: {
          title: {
            text: "Temperature"
          },
          labels: {
            formatter: function() {
              return this.value + "°C";
            }
          },
          plotLines: [
            {
              value: 0,
              width: 1,
              color: "#808080"
            }
          ]
        },
        tooltip: {
          headerFormat: "<b>{series.name}</b><br/>",
          pointFormat: "{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}"
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        series: [
          {
            name: "Temperature data",
            data: nextProps.temperatureData
          }
        ]
      }
    };
  }

  render() {
    console.log("check data", this.props.temperatureData);
    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={this.state.chartOptions}
        />
      </div>
    );
  }
}
