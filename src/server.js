import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import bodyParser from 'body-parser';
import * as sapper from '@sapper/server';

const uuid = () => {
  let a = (Math.random() * 46656) | 0
  let b = (Math.random() * 46656) | 0
  a = ("000" + a.toString(36)).slice(-3)
  b = ("000" + b.toString(36)).slice(-3)
  return `${a}${b}`
}

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = polka() // You can also use Express
  .use(
    bodyParser.json(),
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      session: (req, res) => ({
        id: uuid()
      })
    })  
  )
  .listen(PORT, err => {
    if (err) console.log('error', err);
  });

export default app