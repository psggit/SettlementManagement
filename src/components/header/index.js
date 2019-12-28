import React, {useState} from "react"
import Icon from "Components/icon"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import Dialog from "Components/dialog"
// import Dialog from "Components/dialog"

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 40px"
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
  const classes = useStyles()
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const logout = () => {
    localStorage.clear()
    window.location.href="/login"
  }

  const unmountModal = () => {
    setShowLogoutModal(false)
  }

  const mountModal = () => {
    setShowLogoutModal(true)
  }

  // const logout = () => {
  //   setShowLogoutModal(false)
  // }

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div>
            <Icon name="headerHipbarLogo" />
          </div>
          <div className={classes.logoutSection} onClick={mountModal}>
            <Icon name="logout" />
            <p className={classes.text}>Logout</p>
          </div>
        </Toolbar>
      </AppBar>
      {showLogoutModal && (
        <Dialog
          title="Confirm Logout"
          subtitle="Are you sure you want to log out?"
          actions={[
            <Button onClick={logout} color="primary" key={1} autoFocus>
              Yes
            </Button>,
            <Button onClick={unmountModal} key={2} color="primary">
              No
            </Button>
          ]}
        />
      )}
    </div>
  )
}

export default header