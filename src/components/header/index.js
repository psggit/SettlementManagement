import React, {useState} from "react"
import Icon from "Components/icon"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px 40px'
  },
  appBar: {
    zIndex: 1
  },
  text : {
    fontWeight: "500",
    fontSize: "18px",
    lineHeight: "22px",
    marginTop: "4px",
    color: "#fff"
  },
  logoutSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer"
  }
}))

function header () {
  const classes = useStyles();

  const logout = () => {
    localStorage.clear();
    window.location.href="/login"
  }

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div>
            <Icon name="headerHipbarLogo" />
          </div>
          <div className={classes.logoutSection} onClick={logout}>
            <Icon name="logout" />
            <p className={classes.text}>Log Out</p>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default header