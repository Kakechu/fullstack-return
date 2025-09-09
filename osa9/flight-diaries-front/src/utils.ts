import { Weather, Visibility } from "./types";

export function parseWeather(value: string): Weather {
  switch (value) {
    case Weather.Sunny:
      return Weather.Sunny;
    case Weather.Rainy:
      return Weather.Rainy;
    case Weather.Cloudy:
      return Weather.Cloudy;
    case Weather.Stormy:
      return Weather.Stormy;
    case Weather.Windy:
      return Weather.Windy;
    default:
      throw new Error(`Invalid weather value: ${value}`);
  }
}

export function parseVisibility(value: string): Visibility {
  switch (value) {
    case Visibility.Great:
      return Visibility.Great;
    case Visibility.Good:
      return Visibility.Good;
    case Visibility.Ok:
      return Visibility.Ok;
    case Visibility.Poor:
      return Visibility.Poor;
    default:
      throw new Error(`Invalid visibility value: ${value}`);
  }
}
