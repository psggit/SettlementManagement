import React, { useState } from "react"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Card from "Components/card"
import "./overview.scss"
import Paper from "@material-ui/core/Paper"
import LineChart from "Components/lineChart"
import Moment from "moment"
import { makeStyles, withStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  paper: {
    padding: "60px",
  },
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

const yesterdayDataValue = [100, 120, 5, 25, 19, 300, 24, 78, 90, 23, 17, 27, 89]


const lastWeekDataLabel = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday" , "Friday", "Saturday"
]

const lastWeekDataValue = [100, 200, 50, 2, 67, 90, 23]

// const lastMonthDataLabel = [
//   "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
// ]

// const lastMonthDataValue = []

function overview() {

  const [value, setValue] = useState(0)

  const classes = useStyles()
  const handleChange = (event, value) => {
    setValue(value)
  }

  return (
    <div id="overview">
      <Tabs
        value={value}
        indicatorColor="secondary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <AntTab label="YESTERDAY" />
        <AntTab label="LAST WEEK" />
        <AntTab label="LAST MONTH" />
      </Tabs>
      <div className="settlement-details">
        <Card
          title="Total Transactions"
          value={"531"}
          width={"164px"}
          marginRight={"48px"}
        />
        <Card
          title="Total UPI Amount"
          value={"₹ 1,35,790"}
          width={"164px"}
          marginRight={"48px"}
        />
        <Card
          title="Store Active"
          value={"15"}
          width={"164px"}
          marginRight={"48px"}
        />
      </div>
      {
        value === 0 &&
        <Paper className={classes.paper}>
          <LineChart
            labels={yesterdayDataLabel}
            values={yesterdayDataValue}
            xLabel={`TIME DURATION (${Moment(new Date(new Date() - 1 * 24 * 60 * 60 * 1000)).format("DD/MM/YYYY")})`}
            yLabel="VOLUME (L)"
            tooltipText="LITERS"
          />
        </Paper>
      }
      {
        value === 1 &&
        <Paper className={classes.paper}>
          <LineChart
            labels={lastWeekDataLabel}
            values={lastWeekDataValue}
            xLabel="TIME DURATION"
            yLabel="VOLUME (L)"
            tooltipText="LITERS"
          />
        </Paper>
      }
    </div>
  )
}

export default overview