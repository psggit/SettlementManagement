
function getAPIObj() {
  const baseHost = process.env.BASE_URL

  return {
    authUrl: "https://auth." + baseHost,
    blogicUrl: "https://api1." + baseHost,
    orderman: "https://orderman." + baseHost,
    catman: "https://catman." + baseHost,
    loki: "https://loki." + baseHost,
    promoman: "https://promoman." + baseHost,
    stockandprice: "https://retailer." + baseHost + "/Api/stockandprice"
  }
}

export const Api = getAPIObj()
