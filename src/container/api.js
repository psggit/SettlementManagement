import { POST } from "Utils/fetch"

export function getOtpWithMobileNo (payload) {
  return POST({
    api: "/settlements/api/1/generate-otp",
    apiBase: "api",
    handleError: true,
    data: payload
  })
}

export function handleUserLogin (payload) {
  return POST({
    api: "/settlements/api/1/login",
    apiBase: "api",
    handleError: true,
    data: payload
  })
}

export function fetchTransactionHistory(payload) {
  return POST({
    api: "/Api/soa",
    apiBase: "retailer",
    handleError: true,
    data: payload
  })
}

export function fetchRefundHistory(payload) {
  return POST({
    api: "/Api/soa",
    apiBase: "retailer",
    handleError: true,
    data: payload
  })
}

