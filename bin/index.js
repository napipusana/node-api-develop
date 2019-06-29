import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import configs from '../configs'
import modules from '../modules'
import { createRedisClient } from '../middlewares/redis/helpers'

createRedisClient()

const app = new Koa()
app.use(cors());
app.use(logger())
app.use(bodyParser())

app.use(async (ctx, next) => {
  global.Config = configs
  await next()
})

modules(app)

export default app.listen(configs.port, () => {
  console.log(`Server started on ${configs.port}, environment ${process.env.NODE_ENV}`)
})
