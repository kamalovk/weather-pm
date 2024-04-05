import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "../api/axiosInstance";
import useGeolocation from "./useGeolocation";

export const useWeather = (selectedCity) => {
  const { coordinates, geoError } = useGeolocation()
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherByCoords = useCallback(async (lat, lon) => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(
        `onecall?lat=${lat}&lon=${lon}`
      );

      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setWeatherData(null);
      setError("City not found");
    } finally {
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    if (selectedCity !== undefined && selectedCity !== null) {
      fetchWeatherByCoords(selectedCity.lat, selectedCity.lon);
    } else if (geoError === null && coordinates.lat !== undefined && coordinates.lon !== undefined) {
      fetchWeatherByCoords(coordinates.lat, coordinates.lon);
    }
  }, [fetchWeatherByCoords, coordinates.lat, coordinates.lon, selectedCity, geoError]);


  return { weatherData, loading, error };
};