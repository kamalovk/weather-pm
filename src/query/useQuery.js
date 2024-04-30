import {useState, useContext, useEffect, useCallback} from 'react'
import { QueryCacheContext } from './queryProvider';

export const useQuery = (queryKey, fetchData) => {
  const context = useContext(QueryCacheContext);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDataAndUpdateCache = useCallback(async () => {
    try {
      setIsLoading(true);
      const cachedData = context.getFromCache(queryKey);
      if (cachedData) {
        setData(cachedData);
      }

      const newData = await fetchData();

      context.addToCache(queryKey, newData);
      setData(newData);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }, [context, fetchData, queryKey]) 

  useEffect(() => {
    fetchDataAndUpdateCache();
  }, [fetchDataAndUpdateCache]);

  return { data, isLoading, error };
};