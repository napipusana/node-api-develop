export let getHello = async (ctx, next) => {
  try {

    const result = {
      name: 'nuttapon',
      surname: 'saengsala',
      position: 'Developer'
    }

    ctx.body = result

  } catch (err) {
    if (err === 404 || err.name === 'CastError') {
      ctx.throw(404)
    }
    ctx.throw(500)
  }
}
