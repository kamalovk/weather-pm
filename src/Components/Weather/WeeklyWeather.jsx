import React, { useMemo } from "react";
import { Table, Card, Row } from "antd";
import { getWeekDay } from "../../utils/timeStamp";
import { addKeysToArray } from "../../utils/addKeysToArr";

const WeeklyWeather = ({ weeklyWeatherData }) => {
  const columns = useMemo(() => {
    return [
      {
        title: "",
        dataIndex: getWeekDay("dt"),
        key: "dt",
        render: ({ dt, weather }) => {
          return (
            <Row align="middle">
              <img
                src={`https://openweathermap.org/img/wn/${weather[0].icon}.png`}
                alt="wthr img"
              />
              <span> {getWeekDay(dt)}</span>
            </Row>
          );
        },
      },
      {
        title: "Day Temp",
        dataIndex: "temp",
        key: "temp.day",
        render: (temp) => <span>{temp.day}°C</span>,
      },
      {
        title: "Night Temp",
        dataIndex: "temp",
        key: "temp.night",
        render: (temp) => <span>{temp.night}°C</span>,
      },
      {
        title: "Description",
        dataIndex: "weather",
        key: "weather[0].description",
        render: (weather) => <span>{weather[0].description}</span>,
      },
    ];
  }, []);

  if (!weeklyWeatherData || !weeklyWeatherData.length) {
    return null;
  }

  return (
    <Card size="small">
      <h2>Weekly Weather Forecast</h2>
      <Table
        size="small"
        dataSource={addKeysToArray(weeklyWeatherData)}
        columns={columns}
        pagination={false}
      />
    </Card>
  );
};

export default WeeklyWeather;
