import { useState } from "react";
import { Col, Row, Space } from "antd";

import WeeklyWeather from "./WeeklyWeather";
import CurrentWeather from "./CurrentWeather";
import LocationSearch from "../Search/LocationSearch";
import Loader from "../Loader/Loader";
import useGeolocation from "../../hooks/useGeolocation";
import { useWeather } from "../../hooks/useWeather";
import { fetchMain } from "../../api/fetchApi";

const WeatherMain = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  const { geoError } = useGeolocation();
  const { weatherData, loading } = useWeather(selectedCity);

  const {cityWeather, setCityWeather} = useState([])

  const hourly = weatherData?.hourly;
  const current = weatherData?.current;

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await fetchMain('onecall', {lat, lon});

      setCityWeather(response);
      setError(null);
    } catch (error) {
      setError("City not found");
    } 
  }

  const handleSelectCity = (city) => {
    setSelectedCity(city);
  };

  return (
    <div>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Row justify="center">
          <Col xs={24} md={22}>
            <LocationSearch onSelect={handleSelectCity} />
            {geoError ? <p>{geoError}</p> : null}
          </Col>
        </Row>
        {loading ? (
          <Loader size="large" />
        ) : (
          <Row justify="center" gutter={[16, 16]}>
            {hourly && current && (
              <Col xs={24} md={10}>
                <CurrentWeather
                  weatherData={{
                    hourly,
                    current,
                  }}
                  currentCity={selectedCity}
                />
              </Col>
            )}
            {weatherData?.daily && (
              <Col xs={24} md={12}>
                <WeeklyWeather weeklyWeatherData={weatherData?.daily} />
              </Col>
            )}
          </Row>
        )}
      </Space>
    </div>
  );
};

export default WeatherMain;
