import React from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import { makeStyles } from "@material-ui/core/styles"
import PropTypes from "prop-types"

const useStyles = makeStyles(theme => ({
  dialogBody: {
    padding: "24px 24px 36px 24px",
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "19px",
    margin: "0"
  },
  dialogTitle: {
    padding: "24px 24px 0 24px",
    fontWeight: "500",
    fontSize: "20px",
    lineHeight: "24px"
  },
  dialogContent: {
    padding: 0
  },
  dialogFooter: {
    padding: "0 24px 24px 24px"
  }
}))

function dialog (props) {
  const classes = useStyles()
  return (
    <Dialog
      open={true}
      key={0}
      // onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div style={{width: "320px"}}>
        <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>{props.title}</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <DialogContentText id="alert-dialog-description" className={classes.dialogBody}>
            {props.subtitle}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.dialogFooter}>
          { props.actions.map(item => item) }
        </DialogActions>
      </div>
    </Dialog>
  )
}

dialog.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  actions: PropTypes.array
}

export default dialog