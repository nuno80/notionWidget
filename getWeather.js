const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { city } = event.queryStringParameters;
  const apiKey = process.env.WEATHER_API;
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(weatherUrl);
    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to fetch weather data' }) };
  }
};
