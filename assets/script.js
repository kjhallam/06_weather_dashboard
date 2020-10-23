$(document).ready(function(){
    
var currentDay = moment().format('MMMM Do YYYY');
$("#currentDay").text(currentDay);
var locations = [];
var locationName = "";
var dataTime;
var image;


// get location from local storage 
// if doesn't exits display "KC"
function getCities() {
    var storedCity = JSON.parse(localStorage.getItem('cities'));
    // console.log(getCities);

    if (storedCity !== null) {
        locations = storedCity;
    } else {
        locations = ["Kansas City", "Olathe"]
    }
    displayCity();
}

// should display the list of cities
function displayCity() {
    $("#cityList").empty();
    for(var i = 0; i < locations.length; i++) {
        var newPlace = $("<li>");
        var newBtn = $("<button>").attr("class", "btn");
        $("#cityList").append(newBtn);

        newPlace.text(locations[i]);
        newPlace.attr("class", "list-group");
        $("ul").prepend(newPlace);
        
    }
    //grabs the 1st list city and displays the function of weather    
    $("#cityName").text(locations[i]); 
    // locationName = $("li").locations[i].innerHTML;
    //getWeather(locationName);
};

function getWeather (locationName) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + locationName + "&units=imperial&appid=ed2ee741f61d9d60983426ca204e9ed6";
    // console.log(locationName)
    
$.ajax ({
    url: queryURL,
    method: "GET"
}).then(function (response){
    // console.log('RESPONSE OBJECT----->' , response);
    var lon2 = response.coord.lon;
    var lat2 = response.coord.lat;
    // console.log(lon2);
    // console.log(lat2);
    getUV(lat2, lon2);

    $("#cityName").text(response.name);
    image = response.weather[0].icon;
    $("#currentImage").attr("src", "https://openweathermap.org/img/w/" + image + ".png").removeClass("hide");
    $("#temp").text("Temperature: " + response.main.temp + " F");
    $("#humidity").text("Humidity: " + response.main.humidity + "%");
    $("#windspeed").text("Wind Speed: " + response.wind.speed + "MPH");

    renderDayCard();
    })
}

function getUV(lat, lon){
    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=ed2ee741f61d9d60983426ca204e9ed6"

    $.ajax ({
        url: queryURL,
        method: "GET",
    }).then(function (response){
        
        $("#uvIndex").text("UV Index: " + response.current.uvi);
        var uvColor = response.value;
        if (uvColor > 0 && uvColor < 2) {
          uvSpan = "green";
        } else if (uvColor > 2 && uvColor < 6) {
          uvSpan = "yellow";
        } else if (uvColor > 6 && uvColor < 8) {
          uvSpan = "orange";
        } else if (uvColor > 8 && uvColor < 11) {
          uvSpan = "red";
        } else {
          uvSpan = "purple";
        }
        $("<li>").attr("id", uvSpan).text(uvColor).appendTo("#uvIndex");

    })
} 
function renderDayCard (){ 
    $('#cards').empty();
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + locationName + "&units=imperial&appid=ed2ee741f61d9d60983426ca204e9ed6";
    
    $.ajax ({
        url: queryURL,
        method: "GET"
    }).then(function (response){

for(var i = 0; i < response.list.length; i++){
    if (response.list[i].dt_txt[12] === "5") {
    console.log(response.list[i].dt_txt);
     var card = $('<section>').addClass("card text-black bg-primary text-white").attr("style", "width: 7rem;");
     var cardBody = $('<div>').addClass("card-body");
    var cardDay = $('<h4>').addClass("card-title").text(moment.unix(response.list[i].dt).format("MM/DD/YYYY"));
    var cardTemp = $('<p>').addClass('card-text').text("Temp:" + response.list[i].main.temp + "F");
    var cardHumidity = $('<p>').addClass("card-text").text("Humidity: " + response.list[i].main.humidity + "%");
    
    var cardImg = $('<img>').attr("src","http://openweathermap.org/img/w/" + image + ".png");
    
     cardBody.append(cardDay, cardImg, cardTemp, cardHumidity);
     card.append(cardBody);
    $("#cards").append(card);
    }
}
 })
}
     

$("button").on("click", function() {
    if($("#searchInput").val() !== "") {
        var newPlace = $("#searchInput").val();
        var list = $("<li>");
        list.attr("class", "list-group");
        list.text(newPlace);
        $("ul").prepend(list)
        locationName = $("#searchInput").val();
        // console.log(locationName);
        locations = locations.concat(locationName);
        localStorage.setItem("cities", JSON.stringify(location));
        getWeather(locationName);
    };
})

//   $("#button-addon").on("click", function (event){
//     event.preventDefault();
//   locationName = $(this).val().trim();
//        getWeather(locationName);

//   })
})
