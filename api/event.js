const faunadb = require('faunadb');
const q = faunadb.query

const client = new faunadb.Client({ secret: process.env.fauna_secret })

module.exports = (req, res) => {
  req.body["user-agent"] = req.headers['user-agent']
  client.query(
    q.Create(
      q.Collection('nikolas.ws'),
      {
        data: req.body
      },
    )
  ).then((ret) => {
    res.json({
      error: false,
      ret: ret,
    })
  }).catch((err) => {
    res.json({
      error: true,
      error_message: ret,
    })
  })
}