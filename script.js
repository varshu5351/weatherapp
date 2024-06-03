const apiKey = "9470f162a34d93086760b16d1426a9ed";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");

async function getWeather(city) {
  const responce = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (responce.status == 404) {
    let img = document.querySelector("#icon");
    img.style.width = "16rem";
    document.querySelector(".detail").style.display = "none";
    document.querySelector(".temp2").style.display = "none";

    img.src = "images/404.png";
    document.querySelector(".temp").innerHTML = "Error! 404";
    document.querySelector(".name").innerHTML = "City Not Found";
    document.getElementById("temp").style.fontSize = "3rem";

    return;
  } else {
    var data = await responce.json();

    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".name").innerHTML =
      data.name + ", " + data.sys.country;
    document.querySelector(".mintemp").innerHTML =
      Math.round(data.main.temp_min) + "°c";
    document.querySelector(".maxtemp").innerHTML =
      Math.round(data.main.temp_max) + "°c";

    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML =
      Math.round(data.wind.speed) + " km/h";

    let img = document.querySelector("#icon");

    switch (data.weather[0].main) {
      case "Clear":
        img.src = "images/clear.png";
        break;
      case "Rain":
        img.src = "images/rain.png";
        break;
      case "Snow":
        img.src = "images/snow.png";
        break;
      case "Clouds":
        img.src = "images/cloud.png";
        break;
      case "Mist":
        img.src = "images/mist.png";
        break;
      case "Haze":
        img.src = "images/mist.png";
        break;
      default:
        img.src = "images/cloud.png";
        break;
    }

    document.querySelector(".detail").style.display = "flex";
    document.querySelector(".temp2").style.display = "flex";
    document.getElementById("temp").style.fontSize = "4rem";
    img.style.width = "13rem";
  }
}

searchButton.addEventListener("click", function () {
  getWeather(searchBox.value);
});

searchBox.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    getWeather(searchBox.value);
  }
});

setInterval(() => {
  getWeather(searchBox.value);
}, 600000);
