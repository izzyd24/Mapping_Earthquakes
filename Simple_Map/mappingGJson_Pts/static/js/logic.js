// contains all data and js, leaflet code to make the map
// added folder
// Create the map object with center and zoom level as given in 13.5.3
let map = L.map('mapid').setView([30, 30], 2);

// Grabbing our GeoJSON data from the .json url file
let airportData = 

// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data).addTo(map);
});