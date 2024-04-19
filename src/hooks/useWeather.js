import { useCallback, useEffect, useState } from "react";
import { fetchMain } from "../api/fetchApi";
import useGeolocation from "./useGeolocation";

export const useWeather = () => {
  const { coordinates, geoError } = useGeolocation()
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherByCoords = useCallback(async (lat, lon) => {
    try {
      setLoading(true);
      const response = await fetchMain('onecall', {lat, lon});

      setWeatherData(response);
      setError(null);
    } catch (error) {
      setWeatherData(null);
      setError("City not found");
    } finally {
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    if (!geoError && coordinates.lat && coordinates.lon) {
      fetchWeatherByCoords(coordinates.lat, coordinates.lon);
    }
  }, [fetchWeatherByCoords, coordinates.lat, coordinates.lon, geoError]);


  return { weatherData, loading, error };
};