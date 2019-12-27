const numberRegex = /^[0-9]*$/
export function validateNumberField({ fieldName, fieldValue }) {
  if (fieldValue && fieldValue.trim().length === 0) {
    return {
      status: true,
      value: `${fieldName} is required`
    }
  } else if (fieldName === "Mobile Number" && (isNaN(parseInt(fieldValue)) || !numberRegex.test(fieldValue))) {
    return {
      status: true,
      value: `Enter a valid 10 digit ${fieldName}`
    }
  } else if (isNaN(parseInt(fieldValue)) || !numberRegex.test(fieldValue)) {
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