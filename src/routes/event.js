import dotenv from 'dotenv'
import faunadb from 'faunadb';
import useragent from 'useragent'
import { WebServiceClient } from '@maxmind/geoip2-node'
dotenv.config()

const q = faunadb.query
const client = new faunadb.Client({ secret: process.env.fauna_secret })

const geodb = new WebServiceClient('562881', 'ZUmrFtPR6u0QFtkW', {host: 'geolite.info'});

const relayEvent = async (req, res) => {
  let data = req.query
  let agent = useragent.lookup(req.headers['user-agent']);

  try {
    let geolookup = await geodb.country(req.connection.remoteAddress)
    data.country = geolookup.country.isoCode
  } catch(err) {
    data.country = 'n/a'
  }

  data.server_time = Date.now()
  data.user_agent = req.headers['user-agent']
  data.path = req.path
  data.host = req.headers.host
  data.referer = req.headers.referer
  data.ip_address = req.connection.remoteAddress
  data.browser = agent.family
  data.os = agent.os.family
  data.os_family = agent.os.toVersion()
  data.device = agent.device.toString()
  data.browser_version = agent.toVersion()

  if (data.host != 'nikolas.ws') {
    res.end()
    return
  }

  client.query(
    q.Create(
      q.Collection('nikolas.ws'),
      {
        data: data
      },
    )
  ).then((ret) => {
    res.end()
  }).catch((err) => {
    res.end()
  })
}

export async function post(req, res, next) {
  relayEvent(req, res)
}