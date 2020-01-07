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
          borderColor: "#4054B2",
          pointRadius: 0,
          pointHoverRadius: 5,
          //borderDash: [5, 5],
          //pointBackgroundColor: "#fff",
          //pointBorderWidth: 2,
          pointHoverBorderWidth: 2,
          pointHoverBorderColor: "#4054B2",
          pointHoverBackgroundColor: "#fff",
          lineTension: 0
        }
      ]
    }

    const options = {
      tooltips: {
        displayColors: false,
        backgroundColor: "#fff",
        bodyFontColor: "#000",
        titleFontColor: "#4054B2",
        yPadding: 5,
        xPadding: 15,
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (tooltipItem) {
            return "₹ " + (tooltipItem.yLabel)
          }
        }
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
      <div style={{ height: '400px', maxHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {
          this.props.values.length === 0 
            ? <div>No chart data available for Today</div>
            : <Line ref="chart" data={data} options={options} height={0} />
        }
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