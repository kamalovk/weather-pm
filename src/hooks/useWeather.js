import { useCallback, useEffect, useState } from "react";
import { fetchMain } from "../api/fetchApi";

export const useWeather = (lat, lon) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherByCoords = useCallback(async (lat, lon) => {
    try {
      setLoading(true);
      const response = await fetchMain('onecall', {lat, lon});

      setData(response);
      setError(null);
    } catch (error) {
      setData(null);
      setError("City not found");
    } finally {
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    if (lat && lon) fetchWeatherByCoords(lat, lon);
  }, [lat, lon, fetchWeatherByCoords]);

  return { data, loading, error };
};