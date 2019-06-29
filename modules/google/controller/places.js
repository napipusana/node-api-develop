import configs from '../../../configs'
import { mappingResults } from '../helpers'

const googleMapsClient = require('@google/maps').createClient({
  key: configs.google.credential,
  Promise: Promise
});

export let getPlaces = async (ctx, next) => {
  try {
    const queryLocation = ctx.query.location

    const result = {
      status: false,
      data: []
    }

    // call google APIs find  place near by search
    if(queryLocation) {
      let places = await googleMapsClient.placesNearby({
        location: queryLocation,
        language: configs.google.language,
        type: configs.google.type,
        radius: configs.google.radius
      }).asPromise().then((response) => {
        return response.json.results
      })
        .catch((err) => {
          console.log(err)
        })
      
      if (places) {
        result.status = true
        let results = mappingResults(places)
        for (const data of results) {
          let item = await data
          result.data.push(item)
        }
      }
    }

    ctx.body = result

  } catch (err) {
    if (err === 404 || err.name === 'CastError') {
      ctx.throw(404)
    }
    ctx.throw(500)
  }
}
