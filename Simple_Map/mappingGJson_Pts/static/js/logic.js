// contains all data and js, leaflet code to make the map
// added folder
// Create the map object with center at the San Francisco airport.
let map = L.map('mapid').setView([37.5, -122.5], 10);

// Grabbing our GeoJSON data.
// referencing the sanFranAirport var from geoJson_data js file
L.geoJSON(sanFranAirport, {
    // add a popup marker for each feature, and get the data from properties in js object
    // anon function to pass geojson feature + properties to layer
    onEachFeature: function(feature, layer) {
        console.log(layer);
        layer.bindPopup();
    }
}).addTo(map);