// contains all data and js, leaflet code to make the map
// added folder
// Create the map object with center at the San Francisco airport.
let map = L.map('mapid').setView([37.5, -122.5], 10);

// replaced simple one marker on LA to five most pop. from cities.js 
let cityData = cities;

// Create a polyline using the line coordinates and make the line red.
L.polyline(line, {
    color: "yellow"
}).addTo(map);

// with cities array created; want to iterate through it
// make one marker per city
cityData.forEach(function(city) {
    console.log(city)
    L.circlemarker(city.location, {
        radius: city.population/100000
    })
    // added bindPopup function from leaflet
    // retrieves the name of city, state, population
    .bindPopup("<h2>" + city.city + 
    ", " + city.state + 
    "</h2> <hr> <h3>Population "
    // added tolocale string method to show pop in thousands
    + city.population.toLocaleString + "</h3>")
    .addTo(map);
});

// create a tile layer for the map
// used to load, display a tile layer on the map
// leaflet documentation: https://leafletjs.com/index.html

// assign tileLayer() method to var streets
// reference the api given by leaflet
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// addTGo used to add the graymap obj tile layer to out let map above
streets.addTo(map);



sanFranAirport