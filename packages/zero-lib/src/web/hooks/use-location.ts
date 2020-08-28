import { useState, useEffect } from 'react';

const defaultSettings = {
  enableHighAccuracy: false,
  timeout: Infinity,
  maximumAge: 0,
};

export const useLocation = (watch = false, settings = defaultSettings) => {
  const [position, setPosition] = useState({});
  const [error, setError] = useState<string | null>(null);
  const isClient = typeof window === 'object';
  if (!isClient) {
    return { latitude: null, longitude: null, error: null, accuracy: null, timestamp: null };
  }

  const onChange = ({ coords, timestamp }: any) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
      accuracy: coords.accuracy,
      timestamp,
    });
  };

  const onError = (e: any) => {
    setError(e);
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError('Geolocation is not supported!');
      return;
    }
    let watcher: number | null = null;
    if (watch) {
      watcher = geo.watchPosition(onChange, onError, settings);
    } else {
      geo.getCurrentPosition(onChange, onError, settings);
    }

    return (() => watcher && geo.clearWatch(watcher)) as any;
  }, [settings]);

  return { ...position, error };
};
