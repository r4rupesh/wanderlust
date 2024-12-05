let mapTilerApi = mapToken;
const key = mapTilerApi;
const styleJson = `https://api.maptiler.com/maps/streets-v2/style.json?key=${key}`;
const attribution = new ol.control.Attribution({
  collapsible: false,
});

const map = new ol.Map({
  target: "map",
  controls: ol.control.defaults
    .defaults({ attribution: false })
    .extend([attribution]),
  view: new ol.View({
    constrainResolution: true,
    center: ol.proj.fromLonLat(coordinates),
    zoom: 8,
  }),
});
olms.apply(map, styleJson);

