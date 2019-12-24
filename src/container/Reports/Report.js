import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { grey } from '@material-ui/core/colors';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


const useStyles = makeStyles(theme => ({
  formLabel: {
    fontSize: "normal",
    fontSize: "16px",
    lineHeight: "19px",
    color: "#000000",
    height: "20px"
  },
  radioGroup: {
    color: "#000000",
  },
  formControlLabel: {
    fontSize: "14px",
    lineHeight: "17px",
    color: "#000000"
  },
  button: {
    color: "#FFFFFF",
    marginTop: "24px",
    marginBottom: "36px"
  },
  keyboardDatePicker: {
    marginLeft: "35px"
  }
}));

const BlackRadio = withStyles({
  root: {
    color: grey[900],
    '&$checked': {
      color: grey[900],
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);


export default function Reports() {
  const classes = useStyles();
  const [selectedOption, setSelectedOption] = React.useState('')
  const [showCustomDuration, setShowCustomDuration] = useState(false)
  const [fromDate, setFromDate] = useState(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000))
  const [toDate, setToDate] = useState(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000))

  function handleSubmit() {
    console.log("fromDate", fromDate, "todate", toDate)
  }

  function handleTimePeriodChange(e) {
    setSelectedOption(e.target.value)
    console.log("value", e.target.value)
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
      <FormControl component="fieldset">
        <FormLabel component="legend" className={classes.formLabel}>Time Period</FormLabel>
        <RadioGroup className={classes.radioGroup}>
          <FormControlLabel
            className={classes.formControlLabel}
            name="Yesterday"
            control={<BlackRadio
              checked={selectedOption === 'Yesterday'}
              onChange={(e) => handleTimePeriodChange(e)}
              value="Yesterday"
            />}
            label="Yesterday"
            onChange={(e) => handleTimePeriodChange(e)}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            name="Last-7-Days"
            control={
              <BlackRadio
                checked={selectedOption === 'Last 7 Days'}
                onChange={(e) => handleTimePeriodChange(e)}
                value="Last 7 Days"
              />
            }
            label="Last 7 Days"
            onChange={(e) => handleTimePeriodChange(e)}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            name="Last-30-Days"
            control={
              <BlackRadio
                checked={selectedOption === 'Last 30 Days'}
                onChange={(e) => handleTimePeriodChange(e)}
                value="Last 30 Days"
              />
            }
            label="Last 30 Days"
            onChange={(e) => handleTimePeriodChange(e)}
          />
          <FormControlLabel
            className={classes.FormControlLabel}
            control={
              <BlackRadio
                checked={selectedOption === 'customduration'}
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
                      margin="normal"
                      label="From"
                      value={fromDate}
                      onChange={handleFromDateChange}
                      //minDate={01 / 01 / 2017}
                      //maxDate={(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000))}
                      maxDate={(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000))}
                      minDate={fromDate ? (toDate - 90 * 24 * 60 * 60 * 1000) : "01/01/2017"}
                    />
                  </div>
                  <div className="report-to-date">
                    <KeyboardDatePicker
                      className={classes.keyboardDatePicker}
                      disableToolbar
                      id="date-picker-inline-to"
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      label="To"
                      value={toDate}
                      onChange={handleToDateChange}
                      //minDate={(new Date(Date.now() - 90 * 24 * 60 * 60 * 1000))}
                      //maxDate={(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000))}
                      minDate={"01/01/2017"}
                      maxDate={(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000))}

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
            disabled={!selectedOption || !fromDate || !toDate}
            onClick={handleSubmit}
          >
            DOWNLOAD REPORT
          </Button>
        </FormControl>
      </div>
      <FormControl component="fieldset">
        <div className="report-note">
          Note: The report will be downloaded as a .csv file
        </div>
      </FormControl>
    </div>
  );
}
