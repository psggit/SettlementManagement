import React, { useState } from "react"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import FormControl from "@material-ui/core/FormControl"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormLabel from "@material-ui/core/FormLabel"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import DateFnsUtils from "@date-io/date-fns"
import { grey } from "@material-ui/core/colors"
import { apiUrl } from "Utils/config"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers"
import Notification from "Components/notification"
//import {exportCSV } from "src/utils/fetch/logic-utils.js"
// import {exportCSV} from "Utils/logic-utils"


const useStyles = makeStyles(theme => ({
  formLabel: {
    fontSize: "16px",
    lineHeight: "19px",
    color: "#000000 !important",
    height: "20px",
    marginBottom: "8px"
  },
  formControlLabel: {
    fontSize: "14px",
    lineHeight: "17px",
    color: "#000000",
    padding: "4px 0"
  },
  button: {
    color: "#FFFFFF",
    marginTop: "16px",
    marginBottom: "36px"
  },
  keyboardDatePicker: {
    marginLeft: "35px"
  }
}))

const BlackRadio = withStyles({
  root: {
    color: grey[900],
    "&$checked": {
      color: grey[900],
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />)


export default function Reports() {
  const classes = useStyles()
  const [selectedOption, setSelectedOption] = React.useState("")
  const [showCustomDuration, setShowCustomDuration] = useState(false)
  const [fromDate, setFromDate] = useState(null)
  const [toDate, setToDate] = useState(null)
  const [isErrorInDownloadingReport, setErrorInDownloadingReport] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isReportDownloading, downloadingReport] = useState(false)

  function handleSubmit() {
    fetchRetailerReport()
  }

  const fetchRetailerReport = () => {
    const payload = {
      from_date: new Date(fromDate).toISOString(),
      to_date: new Date(toDate).toISOString()
    }
    downloadingReport(true)
    fetch(`https://${apiUrl}/settlements/api/1/generatereport`, 
      { 
        method: "post", 
        body: JSON.stringify(payload), 
        credentials: "include", 
        headers: {
          "x-hasura-role": `${localStorage.getItem("x-hasura-role")}`
        }
      })
      .then((response) => {
        downloadingReport(false)
        var reader = response.body.getReader()
        reader.read().then(function (response) {
          const filename = "report.csv"
          const data = new TextDecoder("utf-8").decode(response.value)
          const blob = new Blob([data], { type: "text/csv" })
          const link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = filename
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        })
      })
      .catch((json) => {
        setErrorInDownloadingReport(true)
        downloadingReport(false)
        setErrorMessage("Error in downloading report")
      })
  }

  function handleTimePeriodChange(e) {
    setSelectedOption(e.target.value)
    switch (e.target.value) {
      case "Yesterday":
        setFromDate(new Date(new Date() - 1 * 24 * 60 * 60 * 1000))
        setToDate(new Date())
        setShowCustomDuration(false)
        break
      case "Last 30 Days":
        setFromDate(new Date(new Date() - 30 * 24 * 60 * 60 * 1000))
        setToDate(new Date())
        setShowCustomDuration(false)
        break
      case "Last 7 Days":
        setFromDate(new Date(new Date() - 7 * 24 * 60 * 60 * 1000))
        setToDate(new Date())
        setShowCustomDuration(false)
        break
      case "customduration":
        setToDate(null)
        setFromDate(null)
        setShowCustomDuration(true)
        break
    }
  }

  const handleFromDateChange = date => {
    setFromDate(date)
    if (toDate && !(new Date(toDate) > new Date(date)) || !(new Date(toDate) <= new Date(date.getTime() + (90 * 24 * 60 * 60 * 1000)))) {
      setToDate(null)
    }
  }

  const handleToDateChange = date => {
    setToDate(date)
    console.log("max from", new Date(date.getTime() - (90 * 24 * 60 * 60 * 1000)) > new Date("01/01/2017"), new Date(date.getTime() - (90 * 24 * 60 * 60 * 1000)))
  }

  const handleClose = () => {
    setErrorInDownloadingReport(false)
  }

  return (
    <div className="report-content">
      <FormControl component="fieldset">
        <FormLabel component="legend" className={classes.formLabel}>Time Period</FormLabel>
        <RadioGroup>
          <FormControlLabel
            className={classes.formControlLabel}
            control={<BlackRadio
              checked={selectedOption === "Yesterday"}
              onChange={(e) => handleTimePeriodChange(e)}
              value="Yesterday"
            />}
            label="Yesterday"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <BlackRadio
                checked={selectedOption === "Last 7 Days"}
                onChange={(e) => handleTimePeriodChange(e)}
                value="Last 7 Days"
              />
            }
            label="Last 7 Days"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <BlackRadio
                checked={selectedOption === "Last 30 Days"}
                onChange={(e) => handleTimePeriodChange(e)}
                value="Last 30 Days"
              />
            }
            label="Last 30 Days"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <BlackRadio
                checked={selectedOption === "customduration"}
                onChange={(e) => handleTimePeriodChange(e)}
                value="customduration"
              />
            }
            label="Custom Duration"
          />
          {
            showCustomDuration &&
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div className="custom-duration-date">
                <Grid container>
                  <div className="report-from-date">
                    <KeyboardDatePicker
                      className={classes.keyboardDatePicker}
                      disableToolbar
                      id="date-picker-inline-from"
                      variant="inline"
                      format="dd/MM/yyyy"
                      placeholder="DD/MM/YYYY"
                      margin="normal"
                      label="From"
                      value={fromDate}
                      onChange={handleFromDateChange}
                      // minDate={toDate
                      //   ? new Date(toDate.getTime() - (90 * 24 * 60 * 60 * 1000)) > new Date("01/01/2017")
                      //     ? new Date(toDate.getTime() - (90 * 24 * 60 * 60 * 1000))
                      //     : new Date("01/01/2017")
                      //   : new Date("01/01/2017")}
                      minDate={new Date(new Date("01/01/2017"))}
                      maxDate={(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000))}
                    />
                  </div>
                  <div className="report-to-date">
                    <KeyboardDatePicker
                      className={classes.keyboardDatePicker}
                      disableToolbar
                      variant="inline"
                      format="dd/MM/yyyy"
                      placeholder="DD/MM/YYYY"
                      margin="normal"
                      id="date-picker-inline-to"
                      label="To"
                      value={toDate}
                      disabled={!fromDate}
                      onChange={handleToDateChange}
                      minDate={fromDate ? (fromDate.getTime() + (1 * 24 * 60 * 60 * 1000)) : null}
                      maxDate={fromDate
                        ? new Date(fromDate.getTime() + (90 * 24 * 60 * 60 * 1000)) < new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
                          ? new Date(fromDate.getTime() + (90 * 24 * 60 * 60 * 1000))
                          : new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
                        : new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)}
                    />
                  </div>
                </Grid>
              </div>
            </MuiPickersUtilsProvider>
          }
        </RadioGroup>
      </FormControl>
      <div>
        <FormControl component="fieldset">
          <Button variant="contained"
            className={classes.button}
            color="primary"
            disabled={!selectedOption || !fromDate || !toDate || isReportDownloading}
            onClick={handleSubmit}
          >
            DOWNLOAD REPORT
          </Button>
        </FormControl>
      </div>
      <FormControl component="fieldset">
        <div className="report-note">
          <span className="bold-note">Note:</span> The report will be downloaded as a .csv file
        </div>
      </FormControl>
      {
        isErrorInDownloadingReport &&
        <Notification
          message={errorMessage}
          messageType="error"
          open={isErrorInDownloadingReport}
          handleClose={handleClose}
        />
      }
    </div>
  )
}
