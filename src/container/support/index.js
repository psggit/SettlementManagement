import React from "react"
import Paper from "@material-ui/core/Paper"
import Icon from "Components/icon"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  paper: {
    padding: "48px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  header: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "20px",
    lineHeight: "24px"
  },
  subheader: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "20px",
    lineHeight: "24px",
    marginTop: "8px",
    "& a": {
      color: "#000"
    }
  },
  body: {
    paddingTop: "36px",
    paddingBottom: "24px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },
  footerNotes: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "19px",
    color: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  }
}))

function support () {

  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <p className={classes.header}>For any support, please contact us</p>
      <div className={classes.body}>
        <Icon name="email" />
        <p className={classes.subheader}>
          <u><a href="mailto:settlements@hipbar.com">settlements@hipbar.com</a></u>
        </p>
      </div>
      <div className={classes.footerNotes}>
        <p>Operating Hours</p>
        <p>09:00am to 06:00pm from Monday to Friday, Closed on Saturdays and Sundays</p>
      </div>
    </Paper>
  )
}

export default support