async function getCoordinates(cityName) {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?access_token=pk.eyJ1Ijoic3VyeWFuc2htIiwiYSI6ImNreTVwcDVzcjBvN28ycG80YWprNW8zdWYifQ.VMPxhWCpnNs9Gk-fGHt8hQ`
    );
    let coordinates = [];
    const data = await response.json();
    if (data?.features && data.features.length >= 1)
      coordinates = data?.features[0]?.geometry?.coordinates;
    else throw Error('Not a valid city');
    return coordinates;
  } catch {
    throw Error('Some error occured while processing your request');
  }
}
export default getCoordinates;
