import React, { useCallback, useState } from "react";
import { Select } from "antd";

import { debounce } from "../../utils/debounce";
import { fetchGeo } from "../../api/fetchApi";

const LocationSearch = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGeoData = async (text) => {
    if (text) {
      try {
        setLoading(true);

        const response = await fetchGeo('direct', { q: text, limit: 10 });

        setCities(response);
        setError(null);
      } catch (error) {
        setError("Failed to fetch cities.");
      } finally {
        setLoading(false);
      }
    } else {
      setCities([]);
    }
  }

  const debouncedSearch = useCallback(debounce(fetchGeoData, 1500), [])

  const handleSearch = (text) => {
    setQuery(text);
    debouncedSearch(text)
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
