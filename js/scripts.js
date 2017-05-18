// back-end logic

function Trip(destination, bag) {
  this.destination = destination;
  this.weather = {};
  this.bag = bag;
  // this.coreList = [];
  // this.addList = [];
}

function Weather(temperature, rain) {
this.temperature = [];
this.rain = rain;
}

// method to build core packing list based on temperature
Weather.prototype.core = function() {
  var masterList = [["Pairs of Underwear", "Tanktops/T-Shirts"], // every list 0
  ["Pair(s) of Shorts", "Pair(s) of Light Pants/Skirt(s)", "Thin Socks", "Sandals", "Brimmed Hat"], // 1 hot and temperate
  ["Light Jacket"], // temperate 2
  ["Comfortable Walking Shoes", "Pair(s) of Jeans", "Long Sleeved Shirt(s)"], // temperate and cold 3
  ["Thermal Shirt(s) and Pant(s)", "Sweater(s)", "Thick Socks", "Weatherproof Boots", "Heavy Coat", "Gloves",  "Scarf", "Winter Hat"]]; //cold 4
  var tripList = [];

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

  if (tripList.length > 0) {
    tripList.push(masterList[0]);
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
Trip.prototype.numberOfItems = function(item) {
  var output = 0;

      if (item === "Pairs of Underwear" || item === "Thin Socks") {
        output = 4;
      }

      if (item === "Tanktops/T-Shirts") {
        output = 3;
      }

      if (item === "Thick Socks" || item === "Long Sleeved Shirt(s)") {
        output = 2;
      }

      if (item === "Pair(s) of Shorts" || item === "Pair(s) of Light Pants/Skirt(s)" || item === "Pair(s) of Jeans" || item === "Thermal Shirt(s) and Pant(s)" || item === "Sweater(s)") {
        output = 1;
      }
      if (this.bag === "medium" && output !== 0) {
        return output += 2;
      }

      if (this.bag === "large" && output !== 0) {
        return output += 3;
      }

      if (output === 0) {
        output = "";
      }
    return output;
  }


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
    // console.log(newTrip);

    $("#temp input:checked").each(function(i) {
        temperature[i] = $(this).val();
    });

    newTrip.destination = destination;
    newWeather.temperature = temperature;
    newWeather.rain = rain;
    newTrip.bag = bag;

    var rainDisplay = newWeather.rainChance();
    $("#rain-notice").html(rainDisplay);

    var listArray = newWeather.core();

    var num = newTrip.numberOfItems(listArray);

    var output = '';
    listArray.forEach(function(item) {
      var num = newTrip.numberOfItems(item);
      output += '<li><span id="number">' + num + ' ' + '</span>'+ item + '</li>';
    });

    $("#working-list").html(output);



  });// end .change method

  $("#submit-button").click(function(e) {
    e.preventDefault();
    destination = $("#destination").val();
    $(".question-two").fadeIn(600);
    $("#list-head").html(destination);
    $("#list-head").fadeIn(600);
  });

  $(".checkbox").click(function() {
    $(".question-three").fadeIn(600);
    $("ul").fadeIn(600);
    $("html,body").animate({
      scrollTop: $("#working-list").offset().top}, "slow");

  });

  $("#rainy").click(function() {
    $(".question-four").fadeIn(600);
    $("html,body").animate({
      scrollTop: $("#working-list").offset().top}, "slow");

  });
  // Smooth scoll effect from top

  $("#adventure-button").click(function() {
    $("html,body").animate({
      scrollTop: $("#question-one").offset().top-300}, "slow");
  });

});
