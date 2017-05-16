// back-end logic
//
function Trip(destination, weather, bag, addList) {
  this.destination = destination;
  this.weather = weather;
  this.bag = bag;
  this.coreList = [];
  this.addList = [];
}

function Weather(temperature, humidity) {
  this.temperature = temperature;
  this.humidity = humidity;
}

// Trip.prototype.core = function(weather) {
//   if (w)
// }

// ui logic

$(function() {
  var destination;
  var hot = [];
  var temperate = [];
  var cold = [];
  var bag;
  var addList = [];

  var newTrip = new Trip (destination);

  $("button#start-quiz").click(function(event) {
    event.preventDefault();
    destination = $("#destination").val();

    $(".result").text(destination);

  });

});
