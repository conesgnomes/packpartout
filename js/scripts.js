// back-end logic
//
function Trip(destination, bag, addList) {
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
  // alert("hi");
  var masterList = [["Underwear", "Tanktops/T-Shirts"], // every list 0
  ["Shorts", "Light Cotton Pants/Skirts", "Thin Socks", "Sandals", "Brimmed Hat"], // 1 hot and temperate
  ["Light Jacket"], // temperate 2
  ["Comfortable Walking Shoes", "Jeans", "Long Sleeve Shirts"], // temperate and cold 3
  ["Thermal Shirts and Pants", "Sweaters", "Thick Socks", "Weatherproof Boots", "Heavy Coat", "Gloves",  "Scarfs", "Winter Hat"]]; //cold 4

  var tripList = [masterList[0]];
  var temp = this.temperature;
  for (i = 0; i <= this.temperature.length; i++) {

    console.log(temp);
    if (temp[i] === "hot") {
      tripList.push(masterList[1]);
    }

    if (temp[i] === "temperate") {
      tripList.push(masterList[1], masterList[2], masterList[3])
    }
    if (temp[i] === "cold") {
      tripList.push(masterList[3], masterList[4]);
    }

    return tripList;
  }
  // if (this.temperature === "hot") {
  //   result = masterList[0] + masterList[1];
  // } else if (this.temperature === "temperate" || (this.temperature === "hot" && this.temperature === "temperate")) {
  //   result = masterList[0] + masterList[1] + masterList[2];
  // } else if (this.temperature === "cold") {
  //   result = masterList[0] + masterList[3];
  // } else if () {
  //
  // }

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
