export class Card {
  constructor(markerId, location, weatherObject) {
    this.markerId = markerId;
    this.location = location;
    this.airQualitativeName = weatherObject.airQualitativeName;
    this.airQualityIndex = weatherObject.airQualityIndex;
    this.iconSource = weatherObject.iconSource;
    this.temperature = weatherObject.temperature;
    this.humidity = weatherObject.humidity;
    this.condition = weatherObject.condition;
    this.windSpeed = weatherObject.windSpeed;
    this.windDegrees = weatherObject.windDegrees;
    this.dark = weatherObject.dark;
  }
}

export class Marker {
  constructor(id, position, popupLocation) {
    this.coords = position;
    this.id = id;
    this.popupText = popupLocation;
  }
}
