import configs from '../../configs'
import { deleteFromPattern, defaultRedisKeyFn, getRedisClient } from './helpers'

export default (baseUrl, redisKeyFn = defaultRedisKeyFn) => {

  return async (ctx, next) => {
    let client = getRedisClient()

    // Config section
    if (false === configs.redis.active) {
      await next()
      //cut-off upstream
      return
    }

    // Clear Path Section
    if (ctx.path == `${baseUrl}/clear-cache`) {
      let deleteFn = await deleteFromPattern(`${baseUrl}/*`, client)
      if (deleteFn) {
        ctx.body = "OK"
      }
      return
    }

    // Redis hash object for each modules endpoint
    // key object mush contain two keys 1. hash string 2. valid(boolean) -> false will invoke cut-off procedure

    let redisKeyObj = redisKeyFn(ctx)
    let key = ''

    if (!redisKeyObj['valid']) {
      await next()
      //cut-off upstream
      return
    }

    key = redisKeyObj['keyString']

    // Cache Section ---------------------------------
    let cachedResponse = null

    try {
      //probe cache
      cachedResponse = await client.get(key)

    } catch (err) {
      // await next()
      console.error(err)
    }
    //validate cache hit/miss
    if (cachedResponse) {
      // console.log('hit cache')
      ctx.body = JSON.parse(cachedResponse)
    } else {
      //downstream - go to lower middleware
      await next()
      //upstream - store into cache before return to upper middleware
      try {
        // console.log('save cache')
        await client.set(key, JSON.stringify(ctx.body))
      } catch (err) {
        console.error('cache error:', key)
      }
    }

    // End of Cache Section -----------------------------
  }
}
