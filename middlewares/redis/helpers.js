import Redis from 'promise-redis'
import configs from '../../configs'

export let deleteFromPattern = async (pattern, client) => {
  try {
    let allKeys = await client.KEYS(pattern)

    for (let key of allKeys) {
      // console.log(key)
      let deleteKey = await client.DEL(key)
    }

    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

export let defaultRedisKeyFn = (ctx) => {
  return ctx.url
}

let client

export let getRedisClient = function () {
  return client
}

export let createRedisClient = function () {
  let redis = Redis()

  client = redis.createClient({
    port: configs.redis.connectionString.port,
    host: configs.redis.connectionString.host,
    retry_strategy: function (options) {
      if (options.error && options.error.code === 'ECONNREFUSED') {
        // End reconnecting on a specific error and flush all commands with
        // a individual error
        return new Error('The server refused the connection');
      }
      if (options.total_retry_time > 1000 * 60 * 60) {
        // End reconnecting after a specific timeout and flush all commands
        // with a individual error
        return new Error('Retry time exhausted');
      }
      if (options.attempt > 3) {
        // End reconnecting with built in error
        return undefined;
      }
      // reconnect after
      return Math.min(options.attempt * 100, 3000);
    }
  })

  client.on("error", function (err) {
    console.error("Redis:", err)
  });

  client.on("connect", function () {
    console.info("Connected to Redis")
  });

  client.on('end', function () {
    console.info("Redis end")
  });

  client.on('reconnecting', function () {
    console.info('Reconnecting to Redis')
  });

  return client
}
