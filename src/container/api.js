import { POST } from "Utils/fetch"

export function getOtpWithMobileNo (payload) {
  return POST({
    api: "/Api/soa",
    apiBase: "retailer",
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

