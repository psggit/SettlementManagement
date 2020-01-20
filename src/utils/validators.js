const otpRegex = /^\d{6}$/ 
const mobileNoRegex = /^[6789]\d{9}$/

export function validateNumberField({ fieldName, fieldValue }) {
  if (fieldValue && fieldValue.trim().length === 0) {
    return {
      status: true,
      value: `${fieldName} is required`
    }
  } else if (fieldName === "Mobile Number" && (isNaN(parseInt(fieldValue)) || !mobileNoRegex.test(fieldValue))) {
    return {
      status: true,
      value: `Enter a valid 10 digit ${fieldName}`
    }
  } else if (fieldName === "OTP" && (isNaN(parseInt(fieldValue)) || !otpRegex.test(fieldValue))) {
    return {
      status: true,
      value: `Enter a valid ${fieldName}`
    }
  }

  return {
    status: false,
    value: ""
  }
}