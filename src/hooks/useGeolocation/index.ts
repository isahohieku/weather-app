import { useState, useCallback } from 'react';

export interface GeolocationCoords {
  latitude: number;
  longitude: number;
}

interface UseGeolocationReturn {
  coords: GeolocationCoords | null;
  isLocating: boolean;
  error: string | null;
  getLocation: () => void;
}

export const useGeolocation = (): UseGeolocationReturn => {
  const [coords, setCoords] = useState<GeolocationCoords | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setIsLocating(false);
      },
      (err) => {
        let message = 'Unable to retrieve your location';
        switch (err.code) {
          case err.PERMISSION_DENIED:
            message =
              'Location permission denied. Please allow location access or search for your city.';
            break;
          case err.POSITION_UNAVAILABLE:
            message =
              'Location information is unavailable. Please allow location access or search for your city.';
            break;
          case err.TIMEOUT:
            message =
              'Location request timed out. Please allow location access or search for your city.';
            break;
        }
        setError(message);
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 min cache
      },
    );
  }, []);

  return { coords, isLocating, error, getLocation };
};
