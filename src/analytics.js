export const event = ({action = 'click', label, context, session}) => {
  let data = {
    action: action,
    label: label,
    session: session,
    usertime: Date.now()
  }  
  fetch(`/session`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) 
  }).catch(e => {
    console.error(e)
  })
}
