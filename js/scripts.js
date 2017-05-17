// back-end logic

function Trip(destination, bag, addList) {
  this.destination = destination;
  this.weather = {};
  this.bag = bag;
  this.coreList = [];
  this.addList = [];
}

function Weather(temperature, humidity) {
this.temperature = [];
  this.humidity = [];
}

// method to build core packing list based on temperature
Weather.prototype.core = function() {
  var masterList = [["Underwear", "Tanktops/T-Shirts"], // every list 0
  ["Shorts", "Light Pants/Skirts", "Thin Socks", "Sandals", "Brimmed Hat"], // 1 hot and temperate
  ["Light Jacket"], // temperate 2
  ["Comfortable Walking Shoes", "Jeans", "Long Sleeve Shirts"], // temperate and cold 3
  ["Thermal Shirts and Pants", "Sweaters", "Thick Socks", "Weatherproof Boots", "Heavy Coat", "Gloves",  "Scarfs", "Winter Hat"]]; //cold 4
  var tripList = [masterList[0]];
  for (i = 0; i < this.temperature.length; i++) {
    if (this.temperature[i] === "hot") {
        if(tripList.indexOf(masterList[1]) === -1) {
          tripList.push(masterList[1]);
        }
      }

      if (this.temperature[i] === "temperate") {
        if(tripList.indexOf(masterList[1]) === -1) {
          tripList.push(masterList[1]);
        }
        if(tripList.indexOf(masterList[3]) === -1) {
          tripList.push(masterList[3]);
        }
        tripList.push(masterList[2]);
      }

      if (this.temperature[i] === "cold") {
        if(tripList.indexOf(masterList[3]) === -1) {
          tripList.push(masterList[3]);
        }
        tripList.push(masterList[4]);
      }
  }
  return tripList;
}

// weather prototype to add to/take away from, core packing list based on humidity

//trip prototype that changes numbers of items based on size of bag

// UI to gather inputs from form

// UI logic

$(function() {
  var destination = $("#destination").val();
  var temperature = [];
  var humidity = [];
  // var bag;
  // var addList = [];

  var newTrip = new Trip(destination);
  var newWeather = new Weather(temperature, humidity); 

  $("#destination").keyup(function() {

    destination = $(this).val();

    $(".result").html("<h2>" + destination + "</h2>");

  });

});
