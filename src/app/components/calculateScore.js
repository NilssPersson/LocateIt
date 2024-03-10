export function calculateScore(coords1, coords2, hardGuess = false) {
  // First calculate the distance using the Haversine formula
  function toRad(x) {
    return (x * Math.PI) / 180;
  }

  var lon1 = coords1.lng;
  var lat1 = coords1.lat;

  var lon2 = coords2.lng;
  var lat2 = coords2.lat;

  var R = 6371; // Radius of the Earth in km
  var x1 = lat2 - lat1;
  var dLat = toRad(x1);
  var x2 = lon2 - lon1;
  var dLon = toRad(x2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;

  // Then calculate the score using an exponential function,
  // returning a value between 0 and 5000
  if (hardGuess) {
    return Math.floor(5000 * Math.exp(-d / 2000));
  } else {
    return Math.floor(5000 * Math.exp(-d / 1000));
  }
}
