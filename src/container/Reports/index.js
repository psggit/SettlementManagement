import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Report from './Report'
import 'Sass/report.scss'


const useStyles = makeStyles(theme => ({
  paper: {
    padding: "20px",
    Width: "1067px",
    height: "550px",
    Top: "111px",
  },
}));

export default function PaperSheet() {

  const classes = useStyles();

  return (
    <div>
      <div className="generate-report">GENERATE SETTLEMENT REPORT(UPI)</div>
      <div>
        <Paper className={classes.root}>
          <Report />
        </Paper>
      </div>
    </div>
  );
}
