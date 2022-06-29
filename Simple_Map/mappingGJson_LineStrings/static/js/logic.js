// create tile layer for background of map
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
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
    Light: light, 
    Dark: dark
};

// Create the map object with center and zoom level as given in 13.5.4
let map = L.map('mapid', {
    center: [44.0, -80.0],
    zoom: 2,
    layers: [light]
});
// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Grabbing our data from the toronoo json url
let torontoData = "https://github.com/izzyd24/Mapping_Earthquakes/blob/main/Simple_Map/torontoRoutes.json";

// Create a style for the lines.
let myStyle = {
    color: "#ffffa1",
    weight: 2
}

// added the toronotoData url, within d3.json()
d3.json(torontoData).then(function(data) {
    console.log(data);
    // creating geojson layer with retrieved data
L.geoJSON(data, {
    style: myStyle,
    onEachFeature: function(feature, layer){
        layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3> >hr><h3> Destination: "
        + feature.properties.dst + "</h3>");
    }
})
.addTo(map);
});