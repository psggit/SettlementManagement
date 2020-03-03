import React, { useState, useEffect } from "react"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Card from "Components/card"
import "./overview.scss"
import Paper from "@material-ui/core/Paper"
import LineChart from "Components/lineChart"
import Moment from "moment"
import {fetchOverviewData} from "./../api"
import { makeStyles, withStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  paper: {
    padding: "60px",
  },
  note: {
    textAlign: "center"
  }
}))

const AntTab = withStyles(theme => ({
  root: {
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: "22px",
    "&$selected": {
      color: "#000",
      fontWeight: 600,
    }
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />)


function overview() {

  const [value, setValue] = useState(0)
  const [xAxisLabels, setXaxisLabels] = useState([])
  const [yAxisValues, setYaxisValues] = useState([])
  const [totalAmount, setTotalAmount] = useState("")
  const [totalStores, setTotalStores] = useState(0)
  const [totalTransactions, setTotalTransactions] = useState(0)
  const [lastUpdatedDate, setLastUpdatedDate] = useState("")
 
  const classes = useStyles()
  const handleChange = (event, value) => {
    setValue(value)
    resetValues()
  }

  const resetValues = () => {
    setXaxisLabels([])
    setYaxisValues([])
    setTotalAmount(0)
    setTotalStores(0)
    setTotalTransactions(0)
    setLastUpdatedDate("")
  }

  const getFormattedXAxisLabels = ({timeFrame, data}) => {
    let XAxisLabels = []
    switch(timeFrame) {
    case "today" :
      XAxisLabels = data.XAxisHours.map((data) => {
        return Moment(data).format("h:mm:ss")
      })
      break
    case "yesterday":
      //XAxisLabels = data.XAxisHours
      XAxisLabels = data.XAxisHours.map((data) => {
        return Moment(data).format("DD/MM/YYYY h:mm:ss")
      })
      break
    case "last_week":
      XAxisLabels = data.XAxisDays
      break
    case "last_month":
      //XAxisLabels = data.XAxisDate
      XAxisLabels = data.XAxisDate.map((data) => {
        return Moment(data).format("DD/MM/YYYY")
      })
      break
    }
    return XAxisLabels
  }

  useEffect(() => {
    let timeFrame = ""

    switch(value) {
    case 0:
      timeFrame = "today"
      break
    case 1: 
      timeFrame = "yesterday"
      break
    case 2:
      timeFrame = "last_week"
      break
    case 3:
      timeFrame = "last_month"
      break  
    }

    fetchOverviewData(timeFrame)
      .then((response) => {
        let xAxisLabels = getFormattedXAxisLabels({timeFrame: timeFrame, data: response.data})
        setXaxisLabels(xAxisLabels)
        setYaxisValues(response.data.YAxisAmount)
        setTotalAmount(response.data.TotalAmount)
        setTotalStores(response.data.TotalStores)
        setTotalTransactions(response.data.TotalTransactions)
        setLastUpdatedDate(response.data.LastUpdatedAt)
      })
      .catch((error) => {
        console.log("Error in fetching overviiew data", error)
      })
  }, [value])

  return (
    <div id="overview">
      <Tabs
        value={value}
        indicatorColor="secondary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <AntTab label="TODAY" />
        <AntTab label="YESTERDAY" />
        <AntTab label="LAST WEEK" />
        <AntTab label="LAST MONTH" />
      </Tabs>
      <div className="settlement-details">
        <Card
          title="Total Transactions"
          value={totalTransactions ? totalTransactions.toString() : "-"}
          width={"164px"}
          marginRight={"48px"}
        />
        <Card
          title="Total UPI Amount"
          value={totalAmount ? totalAmount.toString() : "-"}
          width={"164px"}
          marginRight={"48px"}
        />
        <Card
          title="Store Active"
          value={totalStores ? totalStores.toString() : "-"}
          width={"164px"}
          marginRight={"48px"}
        />
      </div>
      {
        value === 0 &&
        <Paper className={classes.paper}>
          <LineChart
            labels={xAxisLabels}
            values={yAxisValues}
            xLabel={`TIME DURATION ( ${Moment(new Date()).format("DD/MM/YYYY")} )`}
            yLabel="AMOUNT"
            tooltipText="₹"
          />
        </Paper>
      }
      {
        value === 1 &&
        <Paper className={classes.paper}>
          <LineChart
            labels={xAxisLabels}
            values={yAxisValues}
            xLabel={`TIME DURATION ( ${Moment(new Date(new Date() - 1 * 24 * 60 * 60 * 1000)).format("DD/MM/YYYY")} )`}
            yLabel="AMOUNT"
            tooltipText="₹"
          />
        </Paper>
      }
      {
        value === 2 &&
        <Paper className={classes.paper}>
          <LineChart
            labels={xAxisLabels}
            values={yAxisValues}
            xLabel={`TIME DURATION ( ${Moment(new Date(new Date() - 6 * 24 * 60 * 60 * 1000)).format("DD/MM/YYYY")} - ${Moment(new Date()).format("DD/MM/YYYY")} )`}
            yLabel="AMOUNT"
            tooltipText="₹"
          />
        </Paper>
      }
      {
        value === 3 &&
        <Paper className={classes.paper}>
          <LineChart
            labels={xAxisLabels}
            values={yAxisValues}
            xLabel={`TIME DURATION ( ${Moment(new Date(new Date() - 30 * 24 * 60 * 60 * 1000)).format("DD/MM/YYYY")} - ${Moment(new Date()).format("DD/MM/YYYY")} )`}
            yLabel="AMOUNT"
            tooltipText="₹"
          />
        </Paper>
      }
      {
        //value !== 0 && value !== 3 && lastUpdatedDate &&
        lastUpdatedDate &&
        <div>
          <p className="overview-footer">Last updated at {Moment(lastUpdatedDate).format("DD/MM/YYYY, h:mm a")}</p>
        </div>
      }
    </div>
  )
}

export default overview