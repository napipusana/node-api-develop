module.exports = (ctx) => {
  let key = ''
  let returnObj = {
    keyString: '',
    valid: false
  }

  if (ctx.path === '/google/places') {
    let key = ctx.path +'|'+ ctx.query.location
    returnObj['keyString'] = key
    returnObj['valid'] = true
    return returnObj
  }

  returnObj['keyString'] = key
  returnObj['valid'] = true

  return returnObj
}
