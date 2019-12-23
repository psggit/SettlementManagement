import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Report from './Report'
import './report.scss'


const useStyles = makeStyles(theme => ({
  paper: {
    padding: "20px"
  },
}));

export default function PaperSheet() {

  const classes = useStyles();

  return (
    <div>
      <span className="report">GENERATE SETTLEMENT REPORT (UPI)</span>
      <div>
        <Paper className={classes.paper}>
          <Report />
        </Paper>
      </div>
    </div>
  );
}
