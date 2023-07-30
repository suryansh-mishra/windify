async function getWeather(lat, lon) {
  const open_weather_access_token = 'a33e66b56e2e13cc1103246834965448';
  const weatherAPI_call_string = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${open_weather_access_token}&units=metric`;
  const airAPI_call_string = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${open_weather_access_token}`;

  const weatherResponse = fetch(weatherAPI_call_string);
  const airQualityResponse = fetch(airAPI_call_string);
  const weatherData = await (await weatherResponse).json();
  const airQualityData = await (await airQualityResponse).json();
  const airQualityIndex = airQualityData.list[0].main.aqi;
  const airQualitativeName = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];

  const weather_icon_source = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

  const night = weatherData.weather[0].icon.slice(2) === 'n';
  return {
    iconSource: weather_icon_source,
    icon: `${weatherData.weather[0].icon}`,
    temperature: `${weatherData.main.temp}°C`,
    humidity: `${weatherData.main.humidity}%`,
    condition: weatherData.weather[0].main,
    airQualitativeName: airQualitativeName[airQualityIndex - 1],
    airQualityIndex: airQualityIndex,
    windSpeed: weatherData.wind.speed,
    windDegrees: weatherData.wind.deg,
    night: night,
  };
}

export default getWeather;
