// back-end logic

function Trip(destination, bag, addList) {
  this.destination = destination;
  this.weather = {};
  this.bag = bag;
  this.coreList = [];
  this.addList = [];
}

function Weather(temperature, rain) {
this.temperature = [];
this.rain = rain;
}

// method to build core packing list based on temperature
Weather.prototype.core = function() {
  var masterList = [["Underwear", "Tanktops/T-Shirts"], // every list 0
  ["Shorts", "Light Pants/Skirts", "Thin Socks", "Sandals", "Brimmed Hat"], // 1 hot and temperate
  ["Light Jacket"], // temperate 2
  ["Comfortable Walking Shoes", "Jeans", "Long Sleeve Shirts"], // temperate and cold 3
  ["Thermal Shirts and Pants", "Sweaters", "Thick Socks", "Weatherproof Boots", "Heavy Coat", "Gloves",  "Scarves", "Winter Hat"]]; //cold 4
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

  return [].concat.apply([], tripList);
}

// Rain prototype to add to/take away from, core packing list based on whether it's raining or not
Weather.prototype.rainChance = function() {
  var output = "";

  if (this.rain === "yes") {
    output = "Don't forget to pack an umbrella and rain jacket!";
  }

  if (this.rain === "no") {
    output = "Check the weather just in case it might rain, okay?";
  }

  if (this.rain === "not-sure") {
    output = "Check the weather just in case it might rain, okay?";
  }
  return output;
}

//trip prototype that changes numbers of items based on size of bag

// UI to gather inputs from form

// UI logic

$(function() {
  var destination = $("#destination").val();
  // var bag;
  // var addList = [];
  // var newTrip = new Trip(destination);

  // grab values from form, display them all within .change
  $(".questions").change(function() {

    // get value for Weather rain property
    var rain =  $("input:radio[name=rain]:checked").val();
    var temperature = [];

    var newWeather = new Weather(temperature, rain);

    $("#temp input:checked").each(function(i) {
        temperature[i] = $(this).val();
    });

    newWeather.temperature = temperature;
    newWeather.rain = rain;
    var rainDisplay = newWeather.rainChance();
    $("#rain-notice").html(rainDisplay);
    // console.log(rainDisplay);

    var listArray = newWeather.core();
    var output = '';
    listArray.forEach(function(item) {

      output += '<li>' + item + '</li>';
    });

    $("#working-list").html(output);

  });

  $("#destination").keyup(function() {

    destination = $(this).val();

    $("#list-head").html(destination);

  });

  $("#adventure-button").click(function() {
    $("html,body").animate({
      scrollTop: $("#question-one").offset().top-70}, "slow");
  });

});
