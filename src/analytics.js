const toString = (json) => (key) => `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`
const toQuery = (json) => `?${Object.keys(json).map(toString(json)).join("&")}`

export const event = (data) => {
  fetch(`/event${toQuery(data)}`).catch(e => {
    console.error(e)
  })
}
