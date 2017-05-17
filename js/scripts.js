// back-end logic

function Trip(destination, bag) {
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
  ["Shorts", "Light Pants/Skirt(s)", "Thin Socks", "Sandals", "Brimmed Hat"], // 1 hot and temperate
  ["Light Jacket"], // temperate 2
  ["Comfortable Walking Shoes", "Jeans", "Long Sleeve Shirt(s)"], // temperate and cold 3
  ["Thermal Shirt(s) and Pant(s)", "Sweater(s)", "Thick Socks", "Weatherproof Boots", "Heavy Coat", "Gloves",  "Scarves", "Winter Hat"]]; //cold 4
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
Trip.prototype.numberOfItems = function(array) {
  var numberOf = 0;

  if (this.bag === "small") {

    for(i = 0; i < array.length; i++)

      if (array[i] === "Underwear" || array[i] === "Thin Socks") {
        numberOf = 4;
      }

      if (array[i] === "Tanktops/T-Shirts") {
        numberOf = 3;
      }

      if (array[i] === "Thick Socks" || array[i] === "Long Sleeved Shirts") {
        numberOf = 2;
      }

      if (array[i] === "Shorts" || array[i] === "Light Pants/Skirt(s)" || array[i] === "Jeans" || array[i] === "Thermal Shirt(s) and Pant(s)" || array[i] === "Sweater(s)") {
        numberOf = 1;
      }

      return numberOf;
      alert(numberOf);
    }

  }

// UI to gather inputs from form

// UI logic

$(function() {
  var destination = $("#destination").val();
  // var addList = [];

  // grab values from form, display them all within .change
  $(".questions").change(function() {

    // get value for Weather rain property
    var rain =  $("input:radio[name=rain]:checked").val();
    var temperature = [];
    var bag = $("input:radio[name=bag]:checked").val();

    var newWeather = new Weather(temperature, rain);
    var newTrip = new Trip(destination, bag);

    $("#temp input:checked").each(function(i) {
        temperature[i] = $(this).val();
    });

    newWeather.temperature = temperature;
    newWeather.rain = rain;
    var rainDisplay = newWeather.rainChance();
    $("#rain-notice").html(rainDisplay);

    var listArray = newWeather.core();
    var output = '';
    listArray.forEach(function(item) {

      output += '<li><span id="number">' + ' ' + '</span>'+ item + '</li>';
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
