import { createContext, useEffect, useState } from 'react';
import axiosConnect from '../Token/axios';

export const PlaceContext = createContext([]);

export function PlaceContextProvider({ children }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlaces = async () => {
      const { data } = await axiosConnect.get('/places');
      setPlaces(data.places);
      setLoading(false);
    };
    getPlaces();
  }, []);

  return (
    <PlaceContext.Provider value={{ places, setPlaces, setLoading, loading }}>
      {children}
    </PlaceContext.Provider>
  );
};
