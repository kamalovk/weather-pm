import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/3.0/',
  params: {
    appid: '0d20b49ce8d6817eb0aff8b3bb09cd5e',
    units: 'metric',
    exclude: 'minutely, alerts'
  }
});

export const geoInstance = axios.create({
  baseURL: 'http://api.openweathermap.org/geo/1.0/',
  params: {
    appid: '0d20b49ce8d6817eb0aff8b3bb09cd5e',
    units: 'metric'
  }
});
