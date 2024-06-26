import React, { useEffect, useState } from "react";
import { Select } from "antd";

import { fetchGeo } from "../../api/fetchApi";
import { useDebounce } from "../../hooks/useDebounce";
import { useQuery } from "../../query/useQuery";

const LocationSearch = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchGeoData = async (text) => {
    if (text) {
      try {

        const response = await fetchGeo('direct', { q: text, limit: 10 });

        return response
      } catch (error) {
        setError("Failed to fetch cities.");
      } finally {
      }
    } else {
      setCities([]);
    }
  } 

  const { data, isLoading, error1, refetch } = useQuery('searchWeather', fetchGeoData);

  

  const debouncedQuery = useDebounce(query, 1500)

  useEffect(() => {
    fetchGeoData(debouncedQuery)
  }, [debouncedQuery])

  const handleSearch = (text) => {
    setQuery(text);
  };

  const handleSelectCity = (city) => {
    const selectedObj = cities.find(
      (option) => `${option.name}-${option.country}` === city
    );

    onSelect(selectedObj);
    setQuery(city);
    setCities([]);
  };

  return (
    <Select
      size="large"
      style={{ width: "100%" }}
      showSearch
      value={query}
      placeholder={"Search for a city"}
      defaultActiveFirstOption={false}
      loading={loading}
      error={error}
      onSelect={handleSelectCity}
      onSearch={handleSearch}
      onChange={(text) => setQuery(text)}
    >
      {cities.map((option) => {
        return (
          <Select.Option
            key={`${option.name}-${option.lat}`}
            value={`${option.name}-${option.country}`}
          >
            {option.label}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default LocationSearch;
