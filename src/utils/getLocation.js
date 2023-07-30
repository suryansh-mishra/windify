async function getLocation(lat, lng) {
  try {
    const locationIQ_access_token = 'pk.dc723fb13af3aa1cd1181a7dbe55c5ef';

    const api_call_string = `https://us1.locationiq.com/v1/reverse.php?key=${locationIQ_access_token}&lat=${lat}&lon=${lng}&format=json&normalizeaddress=1`;

    const response = await fetch(api_call_string);
    const locationData = await response.json();

    const locationCity =
      locationData.address.suburb ||
      locationData.address.city ||
      locationData.address.name ||
      locationData.address.county;
    let location = '';
    if (locationCity) location = `${locationCity}`;
    if (locationData?.address?.state)
      location += `, ${locationData.address.state}`;

    if (
      !locationCity &&
      !locationData?.address?.state &&
      locationData?.address?.country
    ) {
      location += `${locationData.address.country}`;
    }

    return location;
  } catch (err) {
    console.log(err);
    throw Error('Some error occured while fetching your location');
  }
}

export default getLocation;
