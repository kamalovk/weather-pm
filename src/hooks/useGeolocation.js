import { useState, useEffect } from 'react';

const useGeolocation = () => {
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
  const [geoError, setError] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCoordinates({ lat: latitude, lon: longitude });
          },
          () => {
            setError('No geolocation, u can use search bar instead.');
          }
        );
      } else {
        setError('No geolocation, u can use search bar instead.');
      }
    };

    getLocation();
  }, []);

  return { coordinates, geoError };
};

export default useGeolocation;
