const apiKey = '5d963c815b894c9685444350242112';  // Your API Key
const apiUrl = 'https://api.weatherapi.com/v1/current.json';

async function getWeather() {
  const city = document.getElementById('city').value.trim();
  const weatherInfo = document.getElementById('weatherInfo');
  
  if (!city) {
    weatherInfo.innerHTML = "<p style='color: red;'>Please enter a city name.</p>";
    return;
  }

  try {
    const response = await fetch(`${apiUrl}?key=${apiKey}&q=${city}&aqi=no`);
    
    if (!response.ok) {
      throw new Error('City not found');
    }

    const data = await response.json();
    const { location, current } = data;

    weatherInfo.innerHTML = `
      <h2>Weather in ${location.name}, ${location.country}</h2>
      <p><strong>Temperature:</strong> ${current.temp_c}°C</p>
      <p><strong>Condition:</strong> ${current.condition.text}</p>
      <img src="${current.condition.icon}" alt="${current.condition.text}">
    `;
  } catch (error) {
    weatherInfo.innerHTML = `<p style='color: red;'>City not found. Please try again.</p>`;
  }
}
