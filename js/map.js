// Function to draw your map
var drawMap = function() {

  // Create map and set view
 	var map = L.map('container').setView([38.393, -98.745], 4);

  // Create a tile layer variable using the appropriate url
 	var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');


  // Add the layer to your map
  	layer.addTo(map);


  // Execute your function to get data
 	getData(map);
}

// Function for getting data
var getData = function(map) {

  // Execute an AJAX request to get the data in data/response.js
  	$.get("data/response.json", function(data) {
  		customBuild(data, map);
  });

}

// Loop through your data and add the appropriate layers and points
var customBuild = function(data, map) {
	var unknown = new L.LayerGroup([]);
	var white = new L.LayerGroup([]);
	var black = new L.LayerGroup([]);
	var asian = new L.LayerGroup([]);
	var indian = new L.LayerGroup([]);
	var hawaiian = new L.LayerGroup([]);

	var whiteMen = 0;
	var nonWhiteMen = 0;
	var whiteWomen = 0;
	var nonWhiteWomen = 0;

	data = $.parseJSON(data);
	for (var i = 0; i < data.length; i++) {
		var item = data[i];
		var lat = item.lat;
		var lng = item.lng;
		var text = item["Summary"];
		var link = item["Source Link"];
		var str = "(link)";
		var popup = text +  str.link(link);

		var circle = null;
		if (item['Hit or Killed?'] == "Hit") {
			circle = new L.circleMarker([lat, lng], {fillColor: "black", stroke: false}).setRadius(7);
		} else {
			circle = new L.circleMarker([lat, lng], {fillColor: "red", stroke: false}).setRadius(7);
		}
		circle.bindPopup(popup);

		var race = "";
		if (data[i].hasOwnProperty("Race")) {
			race = data[i].Race;
		} else {
			race = "Unknown";
		}

		if (race == "Unknown") {
			circle.addTo(unknown);
			if (item["Victim's Gender"] == "Male") {
				nonWhiteMen++;
			} else {
				nonWhiteWomen++;
			}
		} else if (race == "White") {
			circle.addTo(white);
			if (item["Victim's Gender"] == "Male") {
				whiteMen++;
			} else {
				whiteWomen++;
			}
		} else if (race == "Black or African American") {
			circle.addTo(black);
			if (item["Victim's Gender"] == "Male") {
				nonWhiteMen++;
			} else {
				nonWhiteWomen++;
			}
		} else if (race == "Asian") {
			circle.addTo(asian);
			if (item["Victim's Gender"] == "Male") {
				nonWhiteMen++;
			} else {
				nonWhiteWomen++;
			}
		} else if (race == "American Indian or Alaska Native") {
			circle.addTo(indian);
			if (item["Victim's Gender"] == "Male") {
				nonWhiteMen++;
			} else {
				nonWhiteWomen++;
			}
		} else {
			circle.addTo(hawaiian);
			if (item["Victim's Gender"] == "Male") {
				nonWhiteMen++;
			} else {
				nonWhiteWomen++;
			}
		}
	}
	// Be sure to add each layer to the map

	unknown.addTo(map);
	white.addTo(map);
	black.addTo(map);
	asian.addTo(map);
	indian.addTo(map);
	hawaiian.addTo(map);

	// Once layers are on the map, add a leaflet controller that shows/hides layers
	var overlays = {
		"Unknown": unknown,
		"White": white,
		"Black or African American": black,
		"Asian": asian,
		"American Indian or Alasky Native": indian,
		"Native Hawaiian or Other Pacific Islander": hawaiian
	}
	L.control.layers(null, overlays).addTo(map);

	document.getElementById("whiteMen").innerHTML = whiteMen;
	document.getElementById("whiteWomen").innerHTML = whiteWomen;
	document.getElementById("nonWhiteMen").innerHTML = nonWhiteMen;
	document.getElementById("nonWhiteWomen").innerHTML = nonWhiteWomen;
}
