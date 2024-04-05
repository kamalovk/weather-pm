import { useState } from "react";
import { Col, Row, Space } from "antd";

import WeeklyWeather from "./WeeklyWeather";
import CurrentWeather from "./CurrentWeather";
import LocationSearch from "../Search/LocationSearch";
import LoaderWrapper from "../Loader/Loader";
import useGeolocation from "../../hooks/useGeolocation";
import { useWeather } from "../../hooks/useWeather";

const WeatherMain = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  const { geoError } = useGeolocation();
  const { weatherData, loading } = useWeather(selectedCity);

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
        <LoaderWrapper loading={loading}>
          <Row justify="center" gutter={[16, 16]}>
            <Col xs={24} md={10}>
              <CurrentWeather
                weatherData={{
                  hourly: weatherData?.hourly,
                  current: weatherData?.current,
                }}
                currentCity={selectedCity}
              />
            </Col>
            <Col xs={24} md={12}>
              <WeeklyWeather weeklyWeatherData={weatherData?.daily} />
            </Col>
          </Row>
        </LoaderWrapper>
      </Space>
    </div>
  );
};

export default WeatherMain;
