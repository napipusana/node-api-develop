export default {
  redis: {
    connectionString: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    },
    active: true
  },
  google: {
    credential: 'AIzaSyClFRYHYi-HR5q-hunv9HSi0a06dRG8Pdc',
    language: 'th',
    type: 'restaurant',
    radius: 1500
  }
}
