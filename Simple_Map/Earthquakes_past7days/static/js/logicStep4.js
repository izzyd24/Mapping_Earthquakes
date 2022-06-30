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

// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();

// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
    Earthquakes: earthquakes
};

// Then we add a control to the map that will allow the user to change
// which layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

// Create the map object with center and zoom level as given in 13.6.1
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    // default layer
    layers: [streets]
});


// Grabbing the data from a url here, instead of placing within d3.json()
let earthQ = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Grabbing our GeoJSON data.
// added the airportData url, within d3.json()
d3.json(earthQ).then(function(data) {
    function styleInfo(feature) {
        return {
          opacity: 1,
          fillOpacity: 1,
          fillColor: getColor(feature.properties.mag),
          color: "#000000",
          radius: getRadius(feature.properties.mag),
          stroke: true,
          weight: 0.5
        };
    }
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 4;
    }
    // function to set a color based on mag of eartquake
    function getColor(magnitude) {
        if (magnitude >= 5) {
            return "#ea2c2c";
        }
        if (magnitude >= 4) {
            return "#ea822c";
        }
        if (magnitude >= 3) {
            return "#ee9c00";
        }
        if (magnitude >= 2) {
            return "#eecc00";
        }
        if (magnitude >= 1) {
            return "#d4ee00";
        }
        return "#98ee00";
    }
// create geojson layer with the retrieved data
L.geoJSON(data, {
    // using circlemarker on our map for each feature
    pointTolayer: function(feature, latlng) {
        console.log(data);
        return L.circeleMarker (latlng);
    }, 
    // We set the style for each circleMarker using our styleInfo function.
style: styleInfo,
    // We create a popup for each circleMarker to display the magnitude and
    //  location of the earthquake after the marker has been created and styled.
    onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
    }).addTo(earthquakes);

    // then add earthquake layer to map
    earthquakes.addTo(map);
});
