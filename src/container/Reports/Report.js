import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: "200px",
    marginLeft: "40px",
  },
  FormLabel: {
    fontFamily: "Cabin",
    fontSize: "normal",
    fontSize: "16px",
    lineHeight: "19px",
    width: "81px",
    color: "#000000",
    height: "20px",
    marginBottom: "7px",
  },
  RadioGroup: {
    left: "8.33%",
    right: "8.33%",
    top: "8.33%",
    bottom: "8.33%",
    color: "#000000",
  },
  FormControlLabel: {
    fontFamily: "Cabin",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "17px",
    alignItems: "center",
    color: "rgba(0,0,0,0.87)",
    top: "29.55%",
    bottom: "29.55%",
  },
  Button: {
    color: "#FFFFFF",
    fontFamily: "Cabin",
    fontSize: "16px",
    lineHeight: "19px",
    fontWeight: "500",
    marginTop: "-17px",
  },
  KeyboardDatePicker: {
    width: "200px",
    height: "55px",
    left: "35px",
    fontFamily: "Cabin",
    fontSize: "14px",
    alignItems: "flex-end",
    lineHeight: "17px",
  }
}));

export default function Reports() {
  const classes = useStyles();
  const [selectedOption, setSelectedOption] = React.useState('')
  const [showCustomDuration, setShowCustomDuration] = useState(false)
  const [fromDate, setFromDate] = useState()
  const [toDate, setToDate] = useState()
  //const customeDateRef = useRef(null)

  function handleSubmit() {
    console.log("fromDate", fromDate, "todate", toDate)
  }

  function handleTimePeriodChange(e) {
    setSelectedOption(e.target.value)
    switch (e.target.value) {
      case 'Yesterday':
        setFromDate(new Date(new Date() - 1 * 24 * 60 * 60 * 1000))
        setToDate(new Date())
        break;
      case 'Last 30 Days':
        setFromDate(new Date(new Date() - 30 * 24 * 60 * 60 * 1000))
        setToDate(new Date())
        break;
      case 'Last 7 Days':
        setFromDate(new Date(new Date() - 7 * 24 * 60 * 60 * 1000))
        setToDate(new Date())
        break;
      case 'customduration':
        setShowCustomDuration(true)
        break;
    }
  }

  const handleFromDateChange = date => {
    setFromDate(date);
  };
  const handleToDateChange = date => {
    setToDate(date);
  };

  return (
    <div className="report-content">
      <div className="time-period">
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend" className={classes.FormLabel}>Time Period</FormLabel>
          <RadioGroup className={classes.RadioGroup}>
            <FormControlLabel
              className={classes.FormControlLabel}
              name="Yesterday"
              control={<Radio color="default" />}
              label="Yesterday"
              value="Yesterday"
              onChange={(e) => handleTimePeriodChange(e)}
            />
            <FormControlLabel
              className={classes.FormControlLabel}
              name="Last-7-Days"
              control={<Radio color="default" />}
              label="Last 7 Days"
              value="Last 7 Days"
              onChange={(e) => handleTimePeriodChange(e)}
            />
            <FormControlLabel
              className={classes.FormControlLabel}
              name="Last-30-Days"
              control={<Radio color="default" />}
              label="Last 30 Days"
              value="Last 30 Days"
              onChange={(e) => handleTimePeriodChange(e)}
            />
            <FormControlLabel
              className={classes.FormControlLabel}
              value="customduration"
              control={<Radio color="default" />}
              label="Custom Duration"
              onChange={(e) => handleTimePeriodChange(e)}
            />
            {
              showCustomDuration &&
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div className="custom-duration-date">
                  <Grid container justify="space-around">
                    <div className="report-date-from">
                      <KeyboardDatePicker
                        className={classes.KeyboardDatePicker}
                        disableToolbar
                        format="dd/MM/yyyy"
                        label="From"
                        value={fromDate}
                        onChange={handleFromDateChange}
                        minDate={(new Date(Date.now() - 90 * 24 * 60 * 60 * 1000))}
                        maxDate={new Date()}
                      />
                    </div>
                    <div className="report-date-to">
                      <KeyboardDatePicker
                        className={classes.KeyboardDatePicker}
                        disableToolbar
                        format="dd/MM/yyyy"
                        label="To"
                        value={toDate}
                        onChange={handleToDateChange}
                        maxDate={new Date()}
                      />
                    </div>
                  </Grid>
                </div>
              </MuiPickersUtilsProvider>
            }
          </RadioGroup>
        </FormControl>
      </div>
      <div>
        <FormControl component="fieldset" className={classes.formControl}>
          <Button variant="contained"
            className={classes.Button}
            color="primary"
            textColor="white"
            disabled={!selectedOption || !fromDate || !toDate}
            onClick={handleSubmit}>
            DOWNLOAD REPORT
        </Button>
        </FormControl>
      </div>
      <FormControl component="fieldset" className={classes.formControl}>
        <div className="report-note">
          Note: The report will be downloaded as a .csv file
        </div>
      </FormControl>
    </div>
  );
}
