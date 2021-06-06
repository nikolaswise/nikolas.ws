const toString = (json) => (key) => `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`
const toQuery = (json) => `?${Object.keys(json).map(toString(json)).join("&")}`

export const event = (data) => {
  let returning = window.localStorage.getItem('analytics-returning') || false
  data.r = returning
  fetch(`/event${toQuery(data)}`).catch(e => {
    console.error(e)
  })
  if (!returning) {
    window.localStorage.setItem('analytics-returning', true)
  }
}
