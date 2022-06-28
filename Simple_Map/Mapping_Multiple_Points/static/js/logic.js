// contains all data and js, leaflet code to make the map

// Add console.log to check to see if our code is working.
//console.log("working");

// Create the map object with a center and zoom level.
// var map assigned to obj lmap and instantiate the obj with a string mapid
//setView() sets the view of the map with a center, coordinate #1 = lat
// coordinate #2 = lng, third param = zoom level on a 0-18 scale
let map = L.map('mapid').setView([40.7, -94.5], 4);

// replaced simple one marker on LA to five most pop. from cities.js 
let cityData = cities;

// with cities array created; want to iterate through it
// make one marker per city
cities.forEach(function(city) {
    console.log(city)
// assigned a var; used marker function, passed the location 
let marker = L.marker(city.location).addTo(map);
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

