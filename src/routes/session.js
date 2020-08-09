import Libhoney from "libhoney"

let hny = new Libhoney({
  writeKey: process.env.honeycomb_write_key,
  dataset: "nikolas.ws"
})

export async function post(req, res, next) {
  hny.sendNow(req.body)
  let reply = {
    success: true,
    message: 'ok',
  }
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(reply));  
}