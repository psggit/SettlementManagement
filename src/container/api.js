import { POST, GET } from "Utils/fetch"

export function fetchTransactionHistory(payload) {
  return POST({
    api: "/Api/soa",
    apiBase: "retailer",
    handleError: true,
    data: payload
  })
}

