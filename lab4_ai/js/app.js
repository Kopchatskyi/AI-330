//5c37e08a63871f5495542172deec72c9 -apikey


const weather_forecast_app = class {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.currentWeatherLink = "https://api.openweathermap.org/data/2.5/weather?q={query}&appid={apiKey}&units=metric&lang=pl";
    this.forecastLink = "https://api.openweathermap.org/data/2.5/forecast?q={query}&appid={apiKey}&units=metric&lang=pl";
    this.iconLink = "https://openweathermap.org/img/wn/{iconName}@2x.png";

    this.currentWeatherLink = this.currentWeatherLink.replace("{apiKey}", this.apiKey);
    this.forecastLink = this.forecastLink.replace("{apiKey}", this.apiKey);

    this.currentWeather = undefined;
    this.forecast = undefined;
  }

  //get current_weather
  get_curr_weather(query) {
    const url = this.currentWeatherLink.replace("{query}", query);
    const req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.addEventListener("load", () => {
      this.currentWeather = JSON.parse(req.responseText);
      console.log(this.currentWeather);
      this.output_weather();
    });
    req.send();
  }

  //get forecast
  get_forecast(query) {
    const url = this.forecastLink.replace("{query}", query);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.forecast = data.list;
        this.output_weather();
      });
  }
  get_weather(query) {
    this.get_curr_weather(query);
    this.get_forecast(query);
  }
  // Wyświetlanie pogody
  output_weather() {
    const outputForm = document.getElementById("weather_output_form");
    outputForm.innerHTML = ''; // Wyczyść poprzednie dane

    //current weather
    if (this.currentWeather) {
      const date = new Date(this.currentWeather.dt * 1000);
      const dateTimeString = `${date.toLocaleDateString("pl-PL")} ${date.toLocaleTimeString("pl-PL")}`;

      const temperature = this.currentWeather.main.temp;
      const feelsLikeTemperature = this.currentWeather.main.feels_like;
      const iconName = this.currentWeather.weather[0].icon;
      const description = this.currentWeather.weather[0].description;

      const weatherBlock = this.create_weather_block(dateTimeString, temperature, feelsLikeTemperature, iconName, description);
      outputForm.appendChild(weatherBlock);
    }

    // forecast
    if (this.forecast && this.forecast.length > 0) {
      for (let i = 0; i < this.forecast.length; i += 8) {
        const weather = this.forecast[i];
        const date = new Date(weather.dt * 1000);
        const dateTimeString = `${date.toLocaleDateString("pl-PL")} ${date.toLocaleTimeString("pl-PL")}`;

        const temperature = weather.main.temp;
        const feelsLikeTemperature = weather.main.feels_like;
        const iconName = weather.weather[0].icon;
        const description = weather.weather[0].description;

        const weatherBlock = this.create_weather_block(dateTimeString, temperature, feelsLikeTemperature, iconName, description);
        outputForm.appendChild(weatherBlock);
      }
    }
  }

  //weather_block(all info about our weather,that we want to see)
  create_weather_block(dateString, temperature, feelsLike, iconName, description) {
    const weatherBlock = document.createElement("div");
    weatherBlock.className = "weather_block";

    const dateBlock = document.createElement("div");
    dateBlock.className = "weather_date";
    dateBlock.innerText = dateString;
    weatherBlock.appendChild(dateBlock);

    const temperatureBlock = document.createElement("div");
    temperatureBlock.className = "weather_temperature";
    temperatureBlock.innerHTML = `Temperatura: ${temperature} &deg;C`;
    weatherBlock.appendChild(temperatureBlock);

    const feelsLikeBlock = document.createElement("div");
    feelsLikeBlock.className = "weather_temp_feels_like";
    feelsLikeBlock.innerHTML = `Odczuwalna: ${feelsLike} &deg;C`;
    weatherBlock.appendChild(feelsLikeBlock);

    const weatherIcon = document.createElement("img");
    weatherIcon.className = "weather_icon";
    weatherIcon.src = this.iconLink.replace("{iconName}", iconName);
    weatherBlock.appendChild(weatherIcon);

    const weatherDescription = document.createElement("div");
    weatherDescription.className = "weather_description";
    weatherDescription.innerText = description;
    weatherBlock.appendChild(weatherDescription);

    return weatherBlock;
  }
};


const app = new weather_forecast_app('5c37e08a63871f5495542172deec72c9');


document.querySelector("#btn_chk_weather").addEventListener("click", function() {
  const query = document.querySelector("#input_city").value;
  document.getElementById('weather_output_form').style.display = 'block';
  app.get_weather(query);
});
