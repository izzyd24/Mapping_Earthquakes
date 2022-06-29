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

// Create the map object with center and zoom level as given in 13.5.4
let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 11,
    // default layer
    layers: [satelliteStreets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);


// Grabbing our data from the toronoo json url for neighborhoods
let torontoHoods = "https://raw.githubusercontent.com/izzyd24/Mapping_Earthquakes/main/Simple_Map/torontoNeighborhoods.json";

// Create a style for the lines.
let myStyle = {
    color: "#ffffa1",
    weight: 1
}

// Grabbing our GeoJSON data.
// added the airportData url, within d3.json()
d3.json(torontoHoods).then(function(data) {
    console.log(data);
    // create geojson layer with retrieved data
    L.geoJSON(data, {
        style: myStyle,
        // need to fix this to have popup of each neighborhood
        // make default layer = streets
        // with satellite streets as second option
        onEachFeature: function(feature, layer){
            layer.bindPopup("<h3> Neighborhood Name: " + feature.properties.AREA_NAME + "</h3> >hr><h3> Neighbordhood Number: "
            + feature.properties.AREA_S_CD + "</h3>");
        }
    })
.addTo(map);
});