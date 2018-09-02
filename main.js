import 'ol/ol.css';
import VectorLayer from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import Overlay from 'ol/Overlay';
import {apply} from 'ol-mapbox-style';
import WFS from 'ol/format/wfs';
import GeoJSON from 'ol/format/geojson';

const map = apply('map-container', './data/osm-basemap.json');

let parksSource = new VectorSource();
let parksLayer = new VectorLayer({
  source: parksSource
});

parksLayer.setZIndex(50);
map.addLayer(parksLayer);

console.log("hmm", parksLayer)
//generate a GetFeature request
let featureRequest = new WFS().writeGetFeature({
  srsName: 'EPSG:3857',
  //srsName: 'EPSG:102696',
  featureNS: 'http://launchcode.org',
  featurePrefix: 'lc',
  featureTypes: ['parks'],
  outputFormat: 'application/json'
});
console.log("fdhjsk;afhad;", featureRequest);

//then post the request and add the received features to a layer
fetch('http://localhost:8080/geoserver/wfs',{
  method: 'POST',
  body: new XMLSerializer().serializeToString(featureRequest)
}).then(function(response) {
  console.log(response.json)
  return response.json();
}).then(function(json) {
  console.log("abs", json)
  let features = new GeoJSON().readFeatures(json);
  parksSource.addFeatures(features);
  //map.getView().fit(vectorSource.getExtent());
});
console.log("here's the json", response.json)




