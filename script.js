document.addEventListener("DOMContentLoaded", function() {
    const weather = {
        apiKey: "YOUR API  KEY HERE", 
        fetchWeather: function(city) {
            fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=metric&appid=" +
                this.apiKey
            )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
        },
        displayWeather: function(data) {
            const { name } = data;
            const { icon, description } = data.weather[0];
            const { temp, humidity } = data.main;
            const { speed } = data.wind;
            document.querySelector(".city").innerText = "Weather in " + name;
            document.querySelector(".icon").src =
                "https://openweathermap.org/img/wn/" + icon + ".png";
            document.querySelector(".description").innerText = description;
            document.querySelector(".temp").innerText = temp + "°C";
            document.querySelector(".humidity").innerText =
                "Humidity: " + humidity + "%";
            document.querySelector(".wind").innerText =
                "Wind speed: " + speed + " km/h";
            document.querySelector(".weather").classList.remove("loading");
            fetchAndDisplayImage(name); // Fetch and display image from Unsplash
        },
        search: function() {
            this.fetchWeather(document.querySelector(".search-bar").value);
        },
    };
  
    function fetchAndDisplayImage(city) {
      const accessKey = 'YOUR ACCESS KEY HERE';
      const apiUrl = `https://api.unsplash.com/photos/random?query=${city}&orientation=landscape&fit=clip&w=1920&h=1080&client_id=${accessKey}`;

      fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const imageUrl = data.urls.full; // Using full resolution image
        document.body.style.backgroundImage = `url('${imageUrl}')`;
      })
      .catch(error => {
        console.error('Error fetching image:', error);
      });
    }
  
    document.querySelector(".search button").addEventListener("click", function() {
        weather.search();
    });
  
    document.querySelector(".search-bar").addEventListener("keyup", function(event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });
  
    weather.fetchWeather("Moscow");
});
  
  document.addEventListener("DOMContentLoaded", function() {
    const lineNumbersContainer = document.getElementById("line-numbers-container");
    const codeContent = document.getElementById("code-content");
    const lines = codeContent.innerText.split("\n");
    for (let i = 1; i <= lines.length; i++) {
        const lineNumberElement = document.createElement("pre");
        lineNumberElement.setAttribute("data-line", i);
        lineNumberElement.textContent = i;
        lineNumbersContainer.appendChild(lineNumberElement);
    }
  });
