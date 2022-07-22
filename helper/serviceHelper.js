var Distance = require('geo-distance')

var getDetailById = async function (collection, key, value, fields) {
  const data = await collection.findOne({ [key]: value }, fields)
  return data || false
}

var update = async function (collection, condition, data) {
  const dataUpdate = await collection.updateOne(condition, data)
  // eslint-disable-next-line no-unneeded-ternary
  return (dataUpdate.nModified || dataUpdate.ok) ? true : false
}

var calculateDeliveryCharge = function (lat1, lat2, long1, long2) {
  var deliveryCharge = 0
  var dist = Distance.between(
    {
      lat: lat1,
      lon: long1
    },
    {
      lat: lat2,
      lon: long2
    }
  )
  const tempDist = dist.human_readable()
  let distanceResult
  if (tempDist.unit === 'm') {
    distanceResult = (tempDist.distance / 1000).toFixed(2)
  } else {
    distanceResult = tempDist.distance
  }
  if (distanceResult < 5) deliveryCharge = 35
  else deliveryCharge = (distanceResult - 5) * 6 + 35
  return deliveryCharge
}

module.exports = {
  getDetailById: getDetailById,
  update: update,
  calculateDeliveryCharge: calculateDeliveryCharge
}
