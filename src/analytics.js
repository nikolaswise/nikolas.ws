const toString = (json) => (key) => `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`
const toQuery = (json) => `?${Object.keys(json).map(toString(json)).join("&")}`

export const event = (data) => {
  data.r = window.localStorage.getItem('ar') || false
  navigator.sendBeacon(`/event${toQuery(data)}`)
  if (!returning) {
    window.localStorage.setItem('ar', true)
  }
}
