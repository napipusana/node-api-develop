import common from './common'

let env

switch(process.env.NODE_ENV){
  case 'development':
    env = 'development'
  case 'local':
    env = 'local'
  default:
    env = process.env.NODE_ENV
}


const config = require(`./env/${env}`)
export default Object.assign({}, common, config)
