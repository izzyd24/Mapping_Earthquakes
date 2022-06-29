// add console log to check if code is working
//console.log("working");

// create tile layer for background of map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// create a dark view tile layer option for our map
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// add both the streets and dark view vars to baseMaps var
// this var will be our base layer
let baseMaps = {
    "Classic Streets": streets, 
    "Satellite Streets": satelliteStreets
};

// Create the map object with center and zoom level as given in 13.6.1
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    // default layer
    layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);


// Grabbing our data from the toronoo json url for neighborhoods
let earthQ = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// // Create a style for the lines.
// let myStyle = {
//     color: "#ffffa1",
//     weight: 1
// }

// Grabbing our GeoJSON data.
// added the airportData url, within d3.json()
d3.json(earthQ).then(function(data) {
    L.geoJSON(data).addTo(map); 
});
