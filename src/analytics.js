export const event = (data) => {
  data.usertime = Date.now()

  fetch(`https://analytics.nikolas.ws/api/event`, {
    method: 'POST', 
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) 
  }).catch(e => {
    console.error(e)
  })
}
