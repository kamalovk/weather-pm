import React from "react";

import { Card, List, Row } from "antd";
import { getHours } from "../../utils/timeStamp";

const CurrentWeather = ({ weatherData, currentCity }) => {
  const { current, hourly } = weatherData;

  if (!current || !hourly) {
    return null;
  }
  return (
    <Card size="small" style={{ height: "auto" }}>
      <Row align="middle">
        <h2>
          Current Weather -{" "}
          {currentCity?.name ? currentCity?.name : "Your location"}
        </h2>
        <img
          src={`https://openweathermap.org/img/wn/${current.weather[0].icon}.png`}
          alt="wthr img"
        />
      </Row>
      <h3>
        Temperature: {current.temp}°C, feels like {current.feels_like}°C
      </h3>
      <h3>Description: {current.weather[0]?.description}</h3>
      <List
        style={{ height: 400, overflow: "auto" }}
        size="small"
        itemLayout="horizontal"
        header={<h4>Hourly forecast</h4>}
        bordered
        dataSource={hourly.slice(0, 25)}
        renderItem={(item) => (
          <List.Item>
            <Row align="middle" justify="space-between">
              {getHours(item.dt)}:00 - {item.temp}°C,{" "}
              {item.weather[0].description}
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt="wthr img"
              />
            </Row>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default CurrentWeather;
