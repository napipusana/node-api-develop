import hello from './controller'
import redis from '../../middlewares/redis'
import redisKey from './redisKey'

export const baseUrl = '/hello'
export const router = [
  {
    method: 'GET',
    route: '/name',
    handlers: [
      redis(baseUrl, redisKey),
      hello.getHello
    ]
  }
]
