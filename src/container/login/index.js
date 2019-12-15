import React, {useState, useEffect} from "react"
import "./login.scss"
import Icon from "Components/icon"
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { validateNumberField} from "Utils/validators"


const useStyles = makeStyles(theme => ({
  form: {
    '& > .input-field': {
      marginBottom: "40px"
    },

    // '& > .submit': {
    //   marginTop: "40px"
    // }
    // '& > .submit button': {
    //   width: "100px"
    // },
  },
  textField: {
    marginBottom: "40px"
  }
}));

function login () {
  const classes = useStyles();

  const [mobileNumber, setMobileNumber] = useState()
  const [mobileErr, setMobileErr] = useState({status: false, value: ""})
  const [password, setPassword] = useState()
  const [passwordErr, setPasswordErr] = useState({status: false, value: ""})
  const [showPassword, setShowPassword] = useState(false)

  const inputNameMap = {
    mobileNumber: "Mobile Number",
    password: "password"
  }
  // useEffect(() => {
  //   console.log("test")
  // }, [mobileErr, passwordErr])
  // const [values, setValues] = React.useState({
  //   mobileNumber: '',
  //   mobileNumberErrStatus: false,
  //   mobileNumberErrMessage: "",
  //   password: '',
  //   passwordErrStatus: false,
  //   passwordErrMessage: "",
  //   showPassword: false,
  // });

  const handleMobileChange = event => {
    setMobileErr({...mobileErr, status: false})
    setMobileNumber(event.target.value)
  }

  const handlePasswordChange = event => {
    setPasswordErr({...passwordErr, status: false})
    setPassword(event.target.value)
  }

  // const handleChange = event => {
  //   console.log("props", event.target.name, "val", event.target.value)
  //   setValues({ ...values, [event.target.name]: event.target.value });
  // };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  // const handleMobileChange = (evt) => {
  //   //this.setState({ [evt.target.name]:  evt.target.value});
  //   setMobileNumber(evt.target.value)
  // }

  // const handlePasswordChange = (evt) => {
  //   const value = (evt.target.validity.valid || evt.target.validity.valueMissing) ? evt.target.value : eval((evt.target.name));
  //   setPassword(evt.target.value)
  // }

  const validateFormField = (item) => {
    console.log("name", item.name, item.value, item)
    // console.log("name", item.name, "val", item.value, "value", `${item.name}ErrStatus`)
    const errorObj = validateNumberField({
                      fieldName: item.name, 
                      fieldValue: item.value
                    })
    console.log("err", errorObj)
    return errorObj
    // setValues({
    //   ...values, 
    //   [item.name]: "123",
    //   [`${item.name}ErrStatus`]: errorObj.status,
    //   [`${item.name}ErrMessage`]: errorObj.value,
    // })
    //setValues({ ...values, mobileNumberErrStatus: true});
   
  }

  const getInputTags = () => {
    const formEl = document.getElementById('login')
    const inputCollection = formEl.getElementsByTagName('input')
    const inputsArr = Array.prototype.slice.call(inputCollection)

    const textInputs = inputsArr.filter(item => item.type == 'text' || 'password')
    textInputs.forEach(item => {
      let errorObject = validateFormField({
        name: inputNameMap[item.name],
        value: item.value
      })
      if(item.name === "mobileNumber") {
        setMobileErr({
          ...mobileErr, status: errorObject.status, value: errorObject.value
        })
      } else {
        setPasswordErr({
          ...passwordErr, status: errorObject.status, value: errorObject.value
        })
      }
      // setValues({
      //   ...values, 
      //   [`${item.name}ErrStatus`]: errorObject.status,
      //   [`${item.name}ErrMessage`]: errorObject.value,
      // })
    })
  }

  const handleLogin = (e) => {
    getInputTags()
  }

  return (
    <div id="login">
      <div className="logo">
        <Icon name="hipbarLogo" />
      </div>
      <h2>Account Reconciliation Dashboard</h2>
      <div className="form-container">
        <form className={classes.form}>
          <TextField
            id="outlined-required"
            className="input-field"
            error={mobileErr.status}
            label="Mobile Number"
            name="mobileNumber"
            onChange={handleMobileChange}
            defaultValue={mobileNumber}
            helperText={mobileErr.status ? mobileErr.value : ""}
            variant="outlined"
          />

          <FormControl className={clsx(classes.textField)} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" className={`${passwordErr.status ? "Mui-error" : undefined}`}>OTP</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              error={passwordErr.status}
              defaultValue={password}
              onChange={handlePasswordChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={30}
            />
            {
              passwordErr.status ?
                <FormHelperText id="outlined-weight-helper-text" className={`${passwordErr.status ? "Mui-error" : ""}`}>{passwordErr.value}</FormHelperText>
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
      <p>Having trouble? Contact Support at <a href="mailto:settlements@hipbar.com">settlements@hipbar.com</a></p>
    </div>
  )
}

export default login