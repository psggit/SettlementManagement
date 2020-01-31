import React, { useState } from "react"
import "./login.scss"
import Icon from "Components/icon"
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
import { apiUrl } from "Utils/config"

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
  const [errorFlag, setErrorFlag] = useState(false)
  const [showOtpValue, setShowOtpValue] = useState(false)
  const [enableLogin, setEnableLogin] = useState(false)
  //const [enableGenerateOTP, setGenerateOtp] = useState(false)
  const [showNumberPrefix, setShowNumberPrefix] = useState(false)
  const [count, setCount] = useState(0)
  const [delay] = useState(1000)

  const setTimer = () => {
    setCount(5)
    setInterval(() => {
      setCount(count => count - 1)
    }, delay)
  }

  function generateOtp () {
    const payload = {
      mobile: mobileNumber
    }
    //setGenerateOtp(false)
    const fetchOptions = {
      method: "post",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(payload)
    }
    fetch(`https://${apiUrl}/settlements/api/1/generate-otp`, fetchOptions)
      .then(() => {
        //setGenerateOtp(true)
        setTimer()
      })
      .catch(err => {
        setMobileErr({
          status: true,
          value: err.message
        })
        console.log("Error in getting otp", err)
      })
  }

  const inputNameMap = {
    mobileNumber: "Mobile Number",
    otp: "OTP"
  }
  
  const handleMobileChange = event => {
    setMobileErr({ ...mobileErr, status: false })
    setErrorFlag(false)
    if(!isNaN(event.target.value)) {
      setMobileNumber(event.target.value)
    }
  }

  const handleOtpChange = event => {
    setOtpErr({ ...otpErr, status: false })
    setErrorFlag(false)
    if(!isNaN(event.target.value)) {
      setOtp(event.target.value)
    }
    if(event.target.value.length === 6) {
      setEnableLogin(true)
    }
  }

  const handleClickShowOtp = () => {
    setShowOtpValue(!showOtpValue)
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

  const getInputTags = (fieldName) => {
    const formEl = document.getElementById("login")
    const inputCollection = formEl.getElementsByTagName("input")
    const inputsArr = Array.prototype.slice.call(inputCollection)
    const textInputs = inputsArr.filter(item => item.name == fieldName)
    textInputs.forEach(item => {
      let errorObject = validateFormField({
        name: inputNameMap[item.name],
        value: item.value
      })
      if (errorObject.status) {
        setErrorFlag(true)
      }
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
    if (!errorFlag) {
      const payload = {
        mobile: mobileNumber,
        otp
      }
      const fetchOptions = {
        method: "post",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(payload)
      }

      fetch(`https://${apiUrl}/settlements/api/1/login`, fetchOptions)
        .then((response) => {
          if (response.status !== 200) {
            response.json().then(json => {
              setOtpErr({
                status: true,
                value: json.message
              })
            })
            return
          }
          location.href = "/home/overview"
        })
        .catch((error) => {
          setOtpErr({
            status: true,
            value: error.message
          })
          console.log("Error in logging in", error, error.message)
        })
    }
  }

  const handleMobileInputFocus = () => {
    setShowNumberPrefix(true)
  }

  const handleOtpBlur = () => {
    getInputTags("otp")
  }

  const handleMobileBlur = () => {
    if(mobileNumber.length === 0) {
      setShowNumberPrefix(false)
    } else if (mobileNumber.length === 10) {
      getInputTags("mobileNumber")
      //setGenerateOtp(true)
      if(!errorFlag) {
        generateOtp()
      }
      setOtp("")
    } else {
      getInputTags("mobileNumber")
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
          {
            showNumberPrefix &&
            <span className="number-prefix">+91</span>
          }
          <TextField
            id="outlined-required"
            inputProps={{
              maxLength: 10
            }}
            className="input-field"
            autoComplete="off"
            error={mobileErr.status}
            label="Mobile Number"
            name="mobileNumber"
            onFocus={handleMobileInputFocus}
            onBlur={handleMobileBlur}
            onChange={handleMobileChange}
            value={mobileNumber}
            helperText={mobileErr.status ? mobileErr.value : ""}
            variant="outlined"
          />

          <FormControl className={clsx(classes.textField)} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" className={`${otpErr.status ? "Mui-error" : undefined}`}>OTP</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showOtpValue ? "text" : "password"}
              name="otp"
              autoComplete="off"
              onBlur={handleOtpBlur}
              error={otpErr.status}
              onChange={handleOtpChange}
              value={otp}
              inputProps={{
                maxLength: 6
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowOtp}
                    onMouseDown={handleMouseDownOtp}
                  >
                    {showOtpValue ? <Visibility /> : <VisibilityOff />}
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
              disabled={!enableLogin}
              onClick={(e) => handleLogin(e)}
            >
              Login
            </Button> 
          </div>
          {/* <div className="submit">
            <Button
              variant="contained"
              color="primary"
              size="large"
              //disabled={(!enableLogin && !enableGenerateOTP) || (!enableGenerateOTP)}
              disabled={!enableLogin}
              onClick={enableLogin ? (e) => handleLogin(e) : (e) => generateOtp(e)}
            >
              {
                !enableLogin ? "Generate OTP" : "Login"
              }
            </Button>
          </div> */}
          <div className="resend-otp">
            {
              enableLogin && count > 0 &&
                <p>Resend OTP in {count} sec</p>
            }
            {
              enableLogin && count <= 0 &&
                <div onClick={generateOtp}>
                  <p>Resend OTP </p>
                  <span><Icon name="resend-otp" /></span>
                </div>
            }
          </div>
        </form>
      </div>
      <p className={classes.note}>Having trouble? Contact Support at <a href="mailto:settlements@hipbar.com">settlements@hipbar.com</a></p>
      {/* {
        isLoginErr &&
        <Notification
          message={errorMessage}
          messageType="error"
          open={isLoginErr}
          handleClose={handleClose}
        />
      } */}
    </div>
  )
}

export default login