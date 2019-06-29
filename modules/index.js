import Router from 'koa-router'
import glob from 'glob'

export default function(app){
  glob(`${__dirname}/*`, { ignore: '**/*.js' }, function (err, files) {
    if (err) { throw err }
    let except = []
    files.forEach((e)=>{
      let split = e.split('/')
      if(!except.includes(split[split.length-1])){
        const router = require(`${e}/router`)
        const routes = router.router
        const baseUrl = router.baseUrl
        const instance = new Router({ prefix: baseUrl })
        routes.forEach((config) => {

          const {method = '',route = '',handlers = []} = config
          // console.log(...handlers)
          instance[method.toLowerCase()](route, ...handlers)
        })

        app
          .use(instance.routes())
          .use(instance.allowedMethods())
      }
    })
  })
}
