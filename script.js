var location = [];
var lat;
var lon;
var placeName;
var timestamp;
var convdataTime;
var image;

getCities ();
function getCities() {
    var storedCities = JSON.parse(localStorage.getItem('cities'));

    if (storedCities !== null) {
        locations = storedCities;
    } else {
        locations = ["Kansas City", "Destin"];
    }
    displayCities();
}

function displayCities() {
    for(var i = 0; i < locations.length; i++) {
        var newCity = $("<li>");
        newCity.text(locations[i]);
        newCity.attr("class", "list-group-item");
        $("ul").prepend(newCity);
    }
}
$("#cityName").text($("li")[0].innerHTML);
placeName = $("li")[0].innerHTML;
getLocation();

$("button").on("click", function() {
    if($("#searchInput").val() !== "") {
        var newCity = $("#searchInput").val();
        var list = $("<li>");
        list.attr("class","list-group-item");
        placeName = $("#searchInput").val();
        getLocation();
        locations = locations.concat(placeName);
        localStorage.setItem("cities", JSON.stringify(locations));
    };
})

function convert(timestamp) {
    var unixtimestamp = timestamp;
    var date = new Date(unixtimesstamp *1000);
    convdataTime = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
}

function getLocation() {
    var queryURL = "" + placeName +

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        lat = response.results[0].geometry.lat;
        lon = response.results[0].geometry.lng;
        getWeather();
    });
}
function getWeather () {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=ed2ee741f61d9d60983426ca204e9ed6";
}
$.ajax ({
    url: queryURL,
    method: "GET"
}).then(function (response){
    console.log(response);

    timestamp = response.current.dt;
    convert(timestamp);
    $("#cityName").text(placeName + "(" + convdataTime + ")");
    image = response.current.weather[0].icon;
    $("#currentImage").attr("src", "http://openweathermap.org/img/wn/" + image + ".png");
    $("#temp").text("Temperature: " + response.current.temp + " F");
    $("#humidity").text("Humidity: " + response.current.humidity + "%");
    $("#windSpeed").text("Wind Speed: " + response.current.wind_speed + "MPH");
    $("#uvIndex").text("UV Index: " + response.current.uvi);

    for(var i = 1; i < 6; i++){
        timestamp = response.daily[i].dt;
        convert(timestamp);
        $("#cardDate" + i).text(convdataTime);
        image = response.daily[i].weather[0].icon;
        console.log(image);
        $("#cardImage" + i).attr("src","http://openweathermap.org/img/wn/" + image + ".png");
        $("#cardTemp" + i).text("Temp: " + response.daily[i].temp.max + "F");
        $("#cardHum" + i).text("Humidity: " + response.daily[i].humidity + "%");
    }
})

$("li").on("click", function () {
    placeName = this.innerHTML;
    getLocation();
})