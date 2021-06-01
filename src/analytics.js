export const event = (data) => {
  data.usertime = Date.now()
  fetch(`/api/event`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) 
  }).catch(e => {
    console.error(e)
  })
}
