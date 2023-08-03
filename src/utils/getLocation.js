async function getLocation(lat, lng, approx = false) {
  try {
    // const locationIQ_access_token = 'pk.dc723fb13af3aa1cd1181a7dbe55c5ef';
    // const api_call_string = `https://us1.locationiq.com/v1/reverse.php?key=${locationIQ_access_token}&lat=${lat}&lon=${lng}&format=json&normalizeaddress=1`;
    // const response = await fetch(api_call_string);

    let location = '';
    const locationDataSimplified = {};
    const mapboxAPICallString = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=pk.eyJ1Ijoic3VyeWFuc2htIiwiYSI6ImNreTVwcDVzcjBvN28ycG80YWprNW8zdWYifQ.VMPxhWCpnNs9Gk-fGHt8hQ`;

    const mapBoxResponse = await fetch(mapboxAPICallString);

    const locationData = await mapBoxResponse.json();

    if (locationData?.features?.length === 0) return 'Unknown';

    for (const x in locationData.features) {
      console.log(locationData.features[x].place_type[0]);
      locationDataSimplified[locationData.features[x].place_type[0]] =
        locationData.features[x].text;
    }
    if (locationDataSimplified.locality && locationDataSimplified.district)
      location = `${locationDataSimplified?.locality}, ${locationDataSimplified?.district}`;
    else if (locationDataSimplified.locality && locationDataSimplified.region)
      location = `${locationDataSimplified?.locality}, ${locationDataSimplified?.region}`;
    else if (locationDataSimplified.district && locationDataSimplified.region)
      location = `${locationDataSimplified?.district}, ${locationDataSimplified?.region}`;
    else if (locationDataSimplified.region && locationDataSimplified.country)
      location = `${locationDataSimplified?.region}, ${locationDataSimplified?.country}`;

    if (
      approx &&
      locationDataSimplified?.place &&
      locationDataSimplified?.region &&
      locationDataSimplified?.place !== locationDataSimplified?.region
    )
      location = `${locationDataSimplified.place}, ${locationDataSimplified.region}`;
    else if (
      approx &&
      locationDataSimplified?.region &&
      locationDataSimplified?.country
    )
      location = `${locationDataSimplified.region}, ${locationDataSimplified.country}`;

    console.log(locationDataSimplified);

    // const locationCity =
    //   locationData?.address?.suburb ||
    //   locationData?.address?.city ||
    //   locationData?.address?.name ||
    //   locationData?.address?.county;
    // let location = '';
    // if (locationCity) location = `${locationCity}`;
    // if (locationData?.address?.state)
    //   location = location
    //     ? location + `, ${locationData.address.state}`
    //     : locationData.address.state;
    // location = locationArray.join(', ');
    // if (
    // !locationCity &&
    // !locationData?.address?.state &&
    //   locationData?.address?.country
    // ) {
    //   location = `${locationData.address.country}`;
    // }

    return location;
  } catch (err) {
    console.log(err);
    throw Error('Some error occured while fetching your location');
  }
}

export default getLocation;
