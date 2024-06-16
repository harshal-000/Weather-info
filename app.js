let hour = document.querySelector(".hours");
let minutes = document.querySelector(".minutes");
let seconds = document.querySelector(".seconds");

search.addEventListener("click", () => {
  getWeather();
  assignment();
  updateTime();
  setInterval(updateTime, 1000);
  display();
});

const display = () => {

  let inputcont = document.querySelector(".inpt");
  inputcont.classList.add("hide");
  let forecast = document.querySelector(".forecast-container");
  forecast.classList.remove("hide");
  let maincont = document.querySelector(".main-container");
  maincont.style.width="60vw"
};

const getWeather = async () => {
  const apikey = "912e0e7e728d9263f907815271d61f23";
  let input = document.querySelector("#place");
  let inptvalue = input.value;
  if (inptvalue === "") {
    let main = document.querySelector(".main-container");
    main.innerHTML = "";
    main.innerHTML = "<h1>Please enter the city</h1>";
  } else {
    try {
      let input = document.querySelector("#place");
      let inptvalue = input.value;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${inptvalue}&units=metric&appid=${apikey}`
      );
      const result = await response.json();
      // console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      let maincont = document.querySelector(".main-container");
      maincont.innerHTML = "<p>Error 404</P>";
    }
  }
};

const assignment = async () => {
  let image = document.querySelector("#forecastimg");
  let temp = document.querySelector("#tempdata");
  let place = document.querySelector("#placedata");
  let humid = document.querySelector("#humiddata");
  let speed = document.querySelector("#speeddata");
  let cli = document.querySelector("#climate");
  let discr = document.querySelector("#discription");

  let weatherData = await getWeather();

  switch (weatherData.weather[0].main) {
    case "Clear":
      image.src = "./images/clear.png";
      break;
    case "Rain":
      image.src = "./images/rain.png";
      break;
    case "Snow":
      image.src = "./images/snow.png";
      break;
    case "Clouds":
      image.src = "./images/cloud.png";
      break;
    case "Mist":
      image.src = "./images/mist.png";
      break;
    case "Haze":
      image.src = "./images/smog.png";
      break;
    default:
      image.src = "./images/clear.png";
  }
  const discription = weatherData.weather[0].description;
  const climate = weatherData.weather[0].main;
  const temperature = weatherData.main.temp;
  const humidity = weatherData.main.humidity;
  const windSpeed = weatherData.wind.speed;
  const cityName = weatherData.name;

  temp.innerText = `${temperature}°c`;
  cli.innerText = `${climate}`;
  discr.innerText = `${discription}`;
  place.innerText = `${cityName}`;
  humid.innerText = `${humidity}`;
  speed.innerText = `${windSpeed}`;

  let himage = document.querySelector("#humidimage");
  himage.src = "humidity.svg";

  let simage = document.querySelector("#speedimage");
  simage.src = "wind.png";
};

function updateTime() {
  let tm = new Date();
  let hours = tm.getHours();
  let newhours;

  if (hours < 12) {
    if (hours < 10) {
      hour.innerHTML = `0${hours}`;
    } else {
      hour.innerHTML = hours;
    }
  } else {
    newhours = hours % 12;
    if (newhours < 10) {
      hour.innerHTML = `0${newhours}`;
    } else {
      hour.innerHTML = newhours;
    }
  }

  if (tm.getMinutes() < 10) {
    minutes.innerHTML = `0${tm.getMinutes()}`;
  } else {
    minutes.innerHTML = tm.getMinutes();
  }
  if (tm.getSeconds() < 10) {
    seconds.innerHTML = `0${tm.getSeconds()}`;
  } else {
    seconds.innerHTML = tm.getSeconds();
  }
}
