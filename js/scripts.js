// back-end logic
//
function Trip(destination, weather, bag, addList) {
  this.destination = destination;
  this.weather = {};
  this.bag = bag;
  this.coreList = [];
  this.addList = [];
}

function Weather(temperature, humidity) {
  this.temperature = temperature;
  this.humidity = humidity;
}

Weather.prototype.core = function() {
  var result = [];
  if (this.temperature === "hot") {
    result = this.coreList = ["Tanktops/T-Shirts", "Shorts", "Light Cotton Pants/Skirts", "Underwear", "Thin Socks", "Comfortable Walking Shoes", "Sandals", "Brimmed Hat"];
  // } else if (this.temperature === "temperate" || (this.temperature === )) {

  }
  return result;
}

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
