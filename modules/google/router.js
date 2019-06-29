import hello from './controller'
import redis from '../../middlewares/redis'
import redisKey from './redisKey'

export const baseUrl = '/google'
export const router = [
  {
    method: 'GET',
    route: '/places',
    handlers: [
      redis(baseUrl, redisKey),
      hello.getPlaces
    ]
  }
]
