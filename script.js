$(document).ready(function(){


var location = [];
var lat;
var lon;
var locationName;
var time;
var dataTime;
var image;


getCity ();

function getCity() {
    var storedCity = JSON.parse(localStorage.getItem('cities'));

    if (storedCity !== null) {
        location = storedCity;
    }
    displayCity();
}


function displayCity() {
    $("#cityList").empty();
    for(var i = 0; i < location.length; i++) {
        var newPlace = $("<li>");
        var newBtn = $("<button>").attr("class", "btn");
        $("#cityList").append(newBtn);

        newPlace.text(location[i]);
        newPlace.attr("class", "list-group");
        $("ul").prepend(newPlace);
        $("#cityName").text(location[i]); 
        locationName = $("li").location[i].innerHTML;
        getLocation();
        
    }
}




function convert(time) {
    var unixtime = time;
    var date = new Date(unixtime * 1000);
    dataTime = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
}

function getLocation() {

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + locationName + "&units=imperial&appid=ed2ee741f61d9d60983426ca204e9ed6";
    //console.log(locationName);
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response){
        console.log(response);

        lat = response.coord.lat;
        lon = response.coord.lon;
         getWeather();
    });
}


function getWeather () {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=imperial&appid=ed2ee741f61d9d60983426ca204e9ed6";  
    

$.ajax ({
    url: queryURL,
    method: "GET",
}).then(function (response){
    console.log(response);
    
    $("#cityName").text(response.name);
    image = response.weather[0].icon;
    $("#currentImage").attr("src", "https://openweathermap.org/img/wn/" + image + ".png");
    $("#temp").text("Temperature: " + response.main.temp + " F");
    $("#humidity").text("Humidity: " + response.main.humidity + "%");
    $("#windspeed").text("Wind Speed: " + response.main.wind_speed + "MPH");
    $("#uvIndex").text("UV Index: " + response.main.uvi);

    
     for(var i = 1; i < 6; i++){
        time = response.list[i].dt;
        convert(timestamp);
        $("#cardDate" + i).text(dataTime);
        image = response.list[i].weather[0].icon;
        console.log(image);
        $("#cardImage" + i).attr("src","https://openweathermap.org/img/wn/" + image + ".png");
        $("#cardTemp" + i).text("Temp: " + response.list[i].temp + "F");
        $("#cardHum" + i).text("Humidity: " + response.list[i].humidity + "%");
    }
})
}

// $("li").on("click", function () {
//     locationName = this.innerHTML;
//     getLocation();
// })

$("#button-addon").on("click", function() {
    if($("#searchInput").val() !== "") {
        var newPlace = $("#searchInput").val();
        var list = $("<li>");
        list.attr("class","list-group");
        locationName = $("#searchInput").val();
        console.log(locationName);
        location = location.concat(locationName);
        localStorage.setItem("cities", JSON.stringify(location));
        getLocation();
    };
})

// $("#button-addon").on("click", function (event){
//     event.preventDefault();
//     locationName = $(this).text().trim();
//     getLocation();


// })
})
