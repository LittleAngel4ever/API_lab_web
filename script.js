const API_KEY = "0441496cc2db47f7a3befb6edcd47820";

const getWeatherBtn = document.getElementById("getWeatherBtn");
const cityNameEl = document.getElementById("cityName");
const tempEl = document.getElementById("temperature");
const descEl = document.getElementById("description");
const iconEl = document.getElementById("icon");
const errorEl = document.getElementById("error");

async function getWeather(lat, lon) {
  try {
    errorEl.textContent = "";
    const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${API_KEY}&lang=ru`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error while receiving data");
    const data = await res.json();
    const weather = data.data[0];

    cityNameEl.textContent = weather.city_name;
    tempEl.textContent = `Temperature: ${weather.temp}°C`;
    descEl.textContent = `Weather: ${weather.weather.description}`;
    iconEl.src = `https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png`;

    document.body.className = "";
    const mainWeather = weather.weather.description.toLowerCase();
    if (mainWeather.includes("дожд")) {
      document.body.classList.add("rain");
    } else if (mainWeather.includes("облач")) {
      document.body.classList.add("clouds");
    } else if (mainWeather.includes("ясн") || mainWeather.includes("sun")) {
      document.body.classList.add("clear");
    }

  } catch (error) {
    errorEl.textContent = "Failed to retrieve data. Check coordinates or connection.";
  }
}

getWeatherBtn.addEventListener("click", () => {
  const lat = document.getElementById("lat").value;
  const lon = document.getElementById("lon").value;
  if (lat && lon) {
    getWeather(lat, lon);
  } else {
    errorEl.textContent = "Please enter correct coordinates!";
  }
});

document.querySelectorAll(".cities button").forEach(btn => {
  btn.addEventListener("click", () => {
    const lat = btn.getAttribute("data-lat");
    const lon = btn.getAttribute("data-lon");
    getWeather(lat, lon);
  });
});
