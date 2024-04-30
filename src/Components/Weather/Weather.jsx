import { useState, useEffect } from "react";
import { Col, Row, Space } from "antd";

import WeeklyWeather from "./WeeklyWeather";
import CurrentWeather from "./CurrentWeather";
import LocationSearch from "../Search/LocationSearch";
import Loader from "../Loader/Loader";
import useGeolocation from "../../hooks/useGeolocation";
import { useWeather } from "../../hooks/useWeather";

const WeatherMain = () => {
  const { coordinates, geoError } = useGeolocation()
  const [cityName, setCityName] = useState(null);
  const [lat, setLat] = useState('')
  const [lon, setLon] = useState('')
  const { data, loading } = useWeather(lat, lon);

  useEffect(() => {
    setLat(coordinates.lat)
    setLon(coordinates.lon)
  }, [coordinates.lat, coordinates.lon])
  
  const hourly = data?.hourly;
  const current = data?.current;
 
  const handleSelectCity = (city) => {
    setCityName(city?.name);
    setLat(city.lat)
    setLon(city.lon)
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
                  cityName={cityName}
                />
              </Col>
            )}
            {data?.daily && (
              <Col xs={24} md={12}>
                <WeeklyWeather weeklyWeatherData={data?.daily} />
              </Col>
            )}
          </Row>
        )}
      </Space>
    </div>
  );
};

export default WeatherMain;
