$(document).ready(function(){
    
var currentDay = moment().format('MMMM Do YYYY');
$("#currentDay").text(currentDay);
var locations = [];
var locationName;
var dataTime;
var image;


// get location from local storage 
// if doesn't exits display "KC"
function getCities() {
    var storedCity = JSON.parse(localStorage.getItem('cities'));
    console.log(getCities);

    if (storedCity !== null) {
        locations = storedCity;
    } else {
        locations = ["Kansas City"]
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
    locationName = $("li").locations[i].innerHTML;
    getWeather();
};
    
       
        
$("button").on("click",function() {
    if ($("#searchInput").val() !== "");
})


function convert(time) {
    var unixtime = time;

    var date = new Date(moment().format("MMM Do YY"));
    dataTime = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
}


function getWeather () {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + locationName + "&units=imperial&appid=ed2ee741f61d9d60983426ca204e9ed6";
    

$.ajax ({
    url: queryURL,
    method: "GET",
}).then(function (response){
    console.log('RESPONSE OBJECT----->' , response);
    var lon2 = response.city.coord.lon;
    var lat2 = response.city.coord.lat;
    console.log(lon2);
    console.log(lat2);
    getForecast(lat2, lon2);

    $("#cityName").text(response.city.name);
    image = response.list[0].weather[0].icon;
    $("#currentImage").attr("src", "https://openweathermap.org/img/wn/" + image + ".png","style: 150px");
    $("#temp").text("Temperature: " + response.list[0].main.temp + " F");
    $("#humidity").text("Humidity: " + response.list[0].main.humidity + "%");
    $("#windspeed").text("Wind Speed: " + response.list[0].wind.speed + "MPH");


    //for loop to render each card (5Day forecast)
     for(var i = 0; i < 6; i++){
        time = response.list[0].dt_text;
        convert(timestamp);
        $("#cardDate" + i).text(dataTime);
        image = response.list[i].weather[0].icon;
        console.log(image);
        $("#cardImage" + i).attr("src","https://openweathermap.org/img/wn/" + image + ".png","style: 20%");
        $("#cardTemp" + i).text("Temp: " + response.list[i].main.temp + "F");
        $("#cardHum" + i).text("Humidity: " + response.list[i].main.humidity + "%");
    }
})
}
function getForecast(lat, lon){
    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=ed2ee741f61d9d60983426ca204e9ed6"

    $.ajax ({
        url: queryURL,
        method: "GET",
    }).then(function (response){
        console.log('RESPONSE OBJECT----->' , response);
        $("#uvIndex").text("UV Index: " + response.current.uvi);

        for(var i = 0; i < 6; i++){
             time = response.list[i].dt_text;
             convert(timestamp);
            //  $("#cardDate" + i).text(dataTime);
            // image = response.daily[i].weather[0].icon;
            // // console.log(image);
            //  $("#cardImage" + i).attr("src","http://openweathermap.org/img/wn/" + image + "@2x.png");
            // $("#cardTemp" + i).html("Temp: " + (response.daily[i].temp.day + "F"));
            //  $("#cardHum" + i).text("Humidity: " + response.list[i].main.humidity + "%");
        }
    })
} 
function renderDayCard (data){ 
 var card = $('<section>').addClass("card text-black bg-primary").attr("style", "width: 7rem;");
var cardDay = $('<h4>').addClass("card-title").attr();
var cardImg = $('<img>').addClass("#cardImage1").attr("src","http://openweathermap.org/img/wn/" + image + "@2x.png");
var cardTemp = $('<p>').addClass('card-text').html("Temp:" + (response.daily[i].temp.day + "F"));
 return card.append(cardDay, cardImg, cardTemp);
    }
for(var i = 0; i < locations.length; i++){
     var card = renderDayCard(locations[i]);
     renderDayCard();
}
     
// $('#')
//     }


$("button").on("click", function() {
    if($("#searchInput").val() !== "") {
        var newPlace = $("#searchInput").val();
        var list = $("<li>");
        list.attr("class", "list-group");
        list.text(newPlace);
        $("ul").prepend(list)
        locationName = $("#searchInput").val();
        console.log(locationName);
        locations = locations.concat(locationName);
        localStorage.setItem("cities", JSON.stringify(location));
        getWeather();
    };
})

  $("#button-addon").on("click", function (event){
    event.preventDefault();
  locationName = $(this).text().trim();
       getWeather();

  })
})
