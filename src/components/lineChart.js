import React from "react"
import { Line } from "react-chartjs-2"
import PropTypes from "prop-types"

class LineChartGraph extends React.Component {
  constructor() {
    super()
  }

  render() {
    const data = {
      labels: this.props.labels,
      datasets: [
        {
          fill: false,
          label: this.props.tooltipText,
          data: this.props.values,
          borderColor: "#473793",
          //backgroundColor: "#473793",
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 2,
          pointHoverBorderColor: "#473793",
          pointHoverBackgroundColor: "#fff",
          lineTension: 0
        }
      ]
    };

    const options = {
      tooltips: {
        displayColors: false,
        backgroundColor: "#fff",
        bodyFontColor: "#000",
        titleFontColor: "#5a6872",
        yPadding: 5,
        xPadding: 15,
        mode: 'index',
        intersect: false
      },
      hover: {
        mode: 'index',
        intersect: false
      },
      legend: {
        display: false
      },
      responsive: true,
      maintainAspectRatio: true,
      //aspectRatio: 2,
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: this.props.yLabel,
              fontSize: 10
            }
          }
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: this.props.xLabel,
              fontSize: 10
            }
          }
        ]
      }
    }
    return (
      <div style={{ height: '400px', maxHeight: '400px' }}>
        <Line ref="chart" data={data} options={options} height={0} />
      </div>
    )
  }
}

LineChartGraph.propTypes = {
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
  tooltipText: PropTypes.string,
  values: PropTypes.array,
  labels: PropTypes.array
}

export default LineChartGraph