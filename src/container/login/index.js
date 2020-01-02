import React, { useState } from "react"
import "./login.scss"
import Icon from "Components/icon"
import { createSession } from "./session"
import TextField from "@material-ui/core/TextField"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import clsx from "clsx"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import InputLabel from "@material-ui/core/InputLabel"
import InputAdornment from "@material-ui/core/InputAdornment"
import FormHelperText from "@material-ui/core/FormHelperText"
import FormControl from "@material-ui/core/FormControl"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import { validateNumberField } from "Utils/validators"


const useStyles = makeStyles(theme => ({
  form: {
    "& > .input-field": {
      marginBottom: "40px"
    },
    "& > .input-field input": {
      padding: "18.5px 40px"
    },
    "& > .input-field label.MuiInputLabel-shrink": {
      paddingLeft:"0px",
      paddingRight:"0px"
    },
    "& > .input-field label": {
      paddingLeft:"30px"
    },
    "& > .input-field .Mui-focused fieldset legend": {
      width: "86px !important"
    }
  },
  textField: {
    marginBottom: "40px"
  },
  note: {
    margin: 0
  }
}))

function login() {
  const classes = useStyles()

  const [mobileNumber, setMobileNumber] = useState("")
  const [mobileErr, setMobileErr] = useState({ status: false, value: "" })
  const [otp, setOtp] = useState("")
  const [otpErr, setOtpErr] = useState({ status: false, value: "" })
  const [showOtp, setShowOtp] = useState(false)

  const inputNameMap = {
    mobileNumber: "Mobile Number",
    otp: "OTP"
  }

  const handleMobileChange = event => {
    setMobileErr({ ...mobileErr, status: false })
    if(!isNaN(event.target.value)) {
      setMobileNumber(event.target.value)
    }
  }

  const handleOtpChange = event => {
    setOtpErr({ ...otpErr, status: false })
    if(!isNaN(event.target.value)) {
      setOtp(event.target.value)
    }
  }

  const handleClickShowOtp = () => {
    setShowOtp(!showOtp)
  }

  const handleMouseDownOtp = event => {
    event.preventDefault()
  }

  const validateFormField = (item) => {
    const errorObj = validateNumberField({
      fieldName: item.name,
      fieldValue: item.value
    })
    return errorObj
  }

  const getInputTags = () => {
    const formEl = document.getElementById("login")
    const inputCollection = formEl.getElementsByTagName("input")
    const inputsArr = Array.prototype.slice.call(inputCollection)

    const textInputs = inputsArr.filter(item => item.type == "text" || "password")
    textInputs.forEach(item => {
      let errorObject = validateFormField({
        name: inputNameMap[item.name],
        value: item.value
      })
      if (item.name === "mobileNumber") {
        setMobileErr({
          ...mobileErr, status: errorObject.status, value: errorObject.value
        })
      } else {
        setOtpErr({
          ...otpErr, status: errorObject.status, value: errorObject.value
        })
      }
    })
  }

  const handleLogin = (e) => {
    e.preventDefault()
    getInputTags()
    if (!mobileErr.status && !otpErr.status) {
      createSession({ hasura_id: 123 })
      window.location.href = "/home/overview"
    }
  }

  return (
    <div id="login">
      <div className="logo">
        <Icon name="hipbarLogo" />
      </div>
      <h2>Account Reconciliation Dashboard</h2>
      <div className="form-container">
        <form className={classes.form}>
          <span className="number-prefix">+91</span>
          <TextField
            id="outlined-required"
            className="input-field"
            autoComplete="off"
            error={mobileErr.status}
            label="Mobile Number"
            name="mobileNumber"
            onChange={handleMobileChange}
            value={mobileNumber}
            helperText={mobileErr.status ? mobileErr.value : ""}
            variant="outlined"
          />

          <FormControl className={clsx(classes.textField)} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" className={`${otpErr.status ? "Mui-error" : undefined}`}>OTP</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showOtp ? "text" : "password"}
              name="otp"
              autoComplete="off"
              error={otpErr.status}
              onChange={handleOtpChange}
              value={otp}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowOtp}
                    onMouseDown={handleMouseDownOtp}
                  >
                    {showOtp ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={30}
            />
            {
              otpErr.status ?
                <FormHelperText id="outlined-weight-helper-text" className={`${otpErr.status ? "Mui-error" : ""}`}>{otpErr.value}</FormHelperText>
                : ""
            }
          </FormControl>

          <div className="submit">
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={(e) => handleLogin(e)}
            >
              Login
            </Button>
          </div>
        </form>
      </div>
      <p className={classes.note}>Having trouble? Contact Support at <a href="mailto:settlements@hipbar.com">settlements@hipbar.com</a></p>
    </div>
  )
}

export default login