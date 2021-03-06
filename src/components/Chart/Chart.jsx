import React, { Component } from "react";
import Chart from "chart.js";
import classes from "./LineGraph.module.css";

export default class LineGraph extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");
    const dates = this.props.data.values.map((val) => {
      var date = new Date(val.x * 1000);
      var month = date.getMonth();
      var year = date.getFullYear();
      var dateToReturn = "" + month + year;
      return dateToReturn;
    });
    new Chart(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        labels: dates,
        datasets: [
          {
            label: this.props.data.description,
            data: this.props.data.values.map((val) => val.y),
          },
        ],
      },
      options: {
        //Customize chart options
      },
    });
  }
  render() {
    return (
      <div className={classes.graphContainer}>
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}
