import { POST, GET } from "Utils/fetch"

export function fetchOverviewData (payload) {
  return GET({
    api: `/settlements/api/1/overview/${payload}`,
    apiBase: "api",
    handleError: true,
    //data: payload
  })
}

export function fetchTransactionHistory(payload) {
  return POST({
    api: "/settlements/api/1/transactionhistory",
    apiBase: "api",
    handleError: true,
    data: payload
  })
}

export function fetchRefundHistory(payload) {
  return POST({
    api: "/settlements/api/1/refund/refund_history",
    apiBase: "api",
    handleError: true,
    data: payload
  })
}

// export function fetchReport(payload) {
//   return POST({
//     api: "/settlements/api/1/generate-report",
//     apiBase: "api",
//     handleError: true,
//     data: payload
//   })
  
// }
