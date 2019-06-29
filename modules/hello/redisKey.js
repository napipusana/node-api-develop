module.exports = (ctx) => {
  let key = ''
  let returnObj = {
    keyString: '',
    valid: false
  }

  if (ctx.path === '/hello/name') {
    let key = ctx.path
    returnObj['keyString'] = key
    returnObj['valid'] = true
    return returnObj
  }

  returnObj['keyString'] = key
  returnObj['valid'] = true

  return returnObj
}
