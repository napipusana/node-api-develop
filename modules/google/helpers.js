
export let mappingResults = places => {
  return places.map(async place => await getPlaceItem(place))
}

const getPlaceItem = async function (place) {
  return {
    id: place.id,
    name: place.name,
    vicinity: place.vicinity
  }
}
