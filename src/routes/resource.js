const fs = require('fs')
const path = require('path')

export async function get(req, res, next) {
  let resourcePath = path.join(process.cwd(), `/src/data/${req.query.slug}.json`)
  res.setHeader('Content-Type', 'application/json');
  fs.readFile(resourcePath, 'utf8', (err, data) => {
    if (err) {
      console.log(err)
      res.end(JSON.stringify({error: true}));
    }
    res.end(data);
  })
}