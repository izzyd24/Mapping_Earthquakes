// create tile layer for background of map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// create a dark view tile layer option for our map
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// add both the streets and dark view vars to baseMaps var
// this var will be our base layer
let baseMaps = {
    Street: streets, 
    Dark: dark
};

// Create the map object with center and zoom level as given in 13.5.4
let map = L.map('mapid', {
    center: [30, 30],
    zoom: 2,
    layers: [streets]
});
// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Grabbing our GeoJSON data from the .json url file
let airportData = "https://github.com/izzyd24/Mapping_Earthquakes/blob/mappingGJson_Pts/majorAirports.json";

// Grabbing our GeoJSON data.
// added the airportData url, within d3.json()
d3.json(airportData)
// anon function on data param, references airportData
.then(function(data) {
    console.log(data);
    // pass data to the layer and add to the map
    L.geoJSON(data).addTo(map);
});