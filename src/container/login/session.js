export function getHasuraId(data) {
  const hasuraId = data.hasura_id
  return hasuraId
}


export function createSession(data) {
  //localStorage.setItem('x-hasura-role', getHasuraRole(data))
  localStorage.setItem('hasura-id', getHasuraId(data))
}