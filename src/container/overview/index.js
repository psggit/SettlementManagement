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
}))(props => <Tab disableRipple {...props} />);


const todayDataLabel = []
const todayDataValue = []

const yesterdayDataLabel = [
  Moment("2019-12-25T12:16:49.464702Z").format("h:mm:ss"),
  Moment("2019-12-25T12:17:49.464702Z").format("h:mm:ss"),
  Moment("2019-12-25T12:18:49.464702Z").format("h:mm:ss"),
  Moment("2019-12-25T13:16:49.464702Z").format("h:mm:ss"),
  Moment("2019-12-25T13:17:49.464702Z").format("h:mm:ss"),
  Moment("2019-12-25T13:18:49.464702Z").format("h:mm:ss"),
  Moment("2019-12-25T14:16:49.464702Z").format("h:mm:ss"),
  Moment("2019-12-25T14:17:49.464702Z").format("h:mm:ss"),
  Moment("2019-12-25T14:18:49.464702Z").format("h:mm:ss"),
  Moment("2019-12-25T15:16:49.464702Z").format("h:mm:ss"),
  Moment("2019-12-25T15:17:49.464702Z").format("h:mm:ss"),
  Moment("2019-12-25T15:18:49.464702Z").format("h:mm:ss"),
  Moment("2019-12-25T15:19:49.464702Z").format("h:mm:ss"),  
]

const yesterdayDataValue = [100, 120, 5, 25, 19, 999, 24, 78, 90, 23, 17, 27, 89]

function overview() {

  const [value, setValue] = useState(0)
  const [xAxisLabels, setXaxisLabels] = useState([])
  const [yAxisValues, setYaxisValues] = useState([])
  const [totalAmount, setTotalAmount] = useState("")
  const [totalStores, setTotalStores] = useState(0)
  const [totalTransactions, setTotalTransactions] = useState(0)
  const [lastUpdatedDate, setLastUpdatedDate] = useState()
 
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
    setLastUpdatedDate()
  }

  const getFormattedXAxisLabels = ({timeFrame, data}) => {
    let XAxisLabels = []
    switch(timeFrame) {
    case "yesterday":
      XAxisLabels = data.XAxisTime.map((item) => {
        return Moment(item).format("h:mm:ss")
      }) 
      break
    case "last_week":
      XAxisLabels = data.XAxisDays
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
          value={totalTransactions ? totalTransactions : "-"}
          width={"164px"}
          marginRight={"48px"}
        />
        <Card
          title="Total UPI Amount"
          value={totalAmount ? totalAmount : "-"}
          width={"164px"}
          marginRight={"48px"}
        />
        <Card
          title="Store Active"
          value={totalStores ? totalStores : "-"}
          width={"164px"}
          marginRight={"48px"}
        />
      </div>
      {
        value === 0 &&
        <Paper className={classes.paper}>
          <LineChart
            labels={todayDataLabel}
            values={todayDataValue}
            xLabel={`TIME DURATION ( ${Moment(new Date(new Date() - 1 * 24 * 60 * 60 * 1000)).format("DD/MM/YYYY")} )`}
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
            xLabel={`TIME DURATION ( ${Moment(new Date(new Date() - 6 * 24 * 60 * 60 * 1000)).format("DD/MM/YYYY")} - ${Moment(new Date(new Date() - 1 * 24 * 60 * 60 * 1000)).format("DD/MM/YYYY")} )`}
            yLabel="AMOUNT"
            tooltipText="₹"
          />
        </Paper>
      }
      {/* {
        value === 3 &&
        <Paper className={classes.paper}>
          <LineChart
            labels={lastMonthDataLabel}
            values={lastMonthDataValue}
            xLabel={`TIME DURATION ( ${Moment(new Date(new Date() - 1 * 24 * 60 * 60 * 1000 - 31 * 24 * 60 * 60 * 1000)).format("DD/MM/YYYY")} - ${Moment(new Date(new Date() - 1 * 24 * 60 * 60 * 1000)).format("DD/MM/YYYY")} )`}
            yLabel="AMOUNT"
            tooltipText="₹"
          />
        </Paper>
      } */}
      {
        value !== 0 && value !== 3 &&
        <div>
          <p className="overview-footer">Last updated at {Moment(lastUpdatedDate).format("DD/MM/YYYY, h:mm a")}</p>
        </div>
      }
    </div>
  )
}

export default overview