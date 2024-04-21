const BASE_URL = 'https://api.openweathermap.org/data/3.0/';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0/';
const API_KEY = '0d20b49ce8d6817eb0aff8b3bb09cd5e';


const fetchData = async (url, params = {}) => {
  const queryParams = new URLSearchParams(params)
  const requestUrl = `${url}?${queryParams.toString()}`

  try {
    const response = await fetch(requestUrl);
    if (!response.ok) {
      throw new Error(`Request Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export function fetchMain(endpoint, params = {}) {
  const url = `${BASE_URL}${endpoint}`;
  return fetchData(url, { ...params, appid: API_KEY, units: 'metric' });
}

export function fetchGeo(endpoint, params = {}) {
  const url = `${GEO_URL}${endpoint}`;
  return fetchData(url, { ...params, appid: API_KEY, units: 'metric' });
}