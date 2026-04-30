function toRadians(value) {
  return (value * Math.PI) / 180;
}

function calculateDistanceInKm(lat1, lng1, lat2, lng2) {
  const earthRadiusKm = 6371;

  const latDistance = toRadians(lat2 - lat1);
  const lngDistance = toRadians(lng2 - lng1);

  const haversineValue =
    Math.sin(latDistance / 2) * Math.sin(latDistance / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(lngDistance / 2) *
      Math.sin(lngDistance / 2);

  const angularDistance =
    2 * Math.atan2(Math.sqrt(haversineValue), Math.sqrt(1 - haversineValue));

  return earthRadiusKm * angularDistance;
}

module.exports = {
  calculateDistanceInKm
};
