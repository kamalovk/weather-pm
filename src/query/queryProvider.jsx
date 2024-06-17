import React, { createContext, useState } from 'react';

// Creating own cacheContext like ReactQueryProvider 
export const QueryCacheContext = createContext();

export const QueryCacheProvider = ({ children }) => {
  const [queryCache, setQueryCache] = useState({});

  const addToCache = (queryKey, data) => {
    setQueryCache(prevCache => ({
      ...prevCache,
      [queryKey]: data,
    }));
  };

  const getFromCache = queryKey => {
    return queryCache[queryKey] || null;
  };

  const removeFromCache = queryKey => {
    setQueryCache(prevCache => {
      const newCache = { ...prevCache };
      delete newCache[queryKey];
      return newCache;
    });
  };

  return (
    <QueryCacheContext.Provider value={{ addToCache, getFromCache, removeFromCache }}>
      {children}
    </QueryCacheContext.Provider>
  );
};