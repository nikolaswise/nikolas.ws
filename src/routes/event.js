import dotenv from 'dotenv'
import faunadb from 'faunadb';
dotenv.config()

const q = faunadb.query
const client = new faunadb.Client({ secret: process.env.fauna_secret })

const relayEvent = (req, res) => {
  let data = req.query
  data.server_time = Date.now()
  data.user_agent = req.headers['user-agent']
  data.path = req.path
  data.host = req.headers.host
  data.referer = req.headers.referer
  data.ip_address = req.connection.remoteAddress

  if (req.method === 'OPTIONS') {
    res.end()
    return
  }
  if (data.host != 'nikolas.ws') {
    console.log('host rejected:')
    console.log(`${data.host} != 'nikolas.ws'; ${data.host != 'nikolas.ws'}`)
    console.log(data)
    res.end()
    return
  }

  client.query(
    q.Create(
      q.Collection('nikolas.ws'),
      {
        data: req.body
      },
    )
  ).then((ret) => {
    res.end()
  }).catch((err) => {
    res.end()
  })
}

export async function get(req, res, next) {
  relayEvent(req, res)
}