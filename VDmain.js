import 'ol/ol.css';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import sync from 'ol-hashed';
import DragAndDrop from 'ol/interaction/DragAndDrop';
import Modify from 'ol/interaction/Modify';
import Draw from 'ol/interaction/Draw';
import Snap from 'ol/interaction/Snap';
import {Fill, Stroke, Style} from 'ol/style';
import {getArea} from 'ol/sphere';
import colormap from 'colormap';

const min = 1e8; //the small area
const max = 2e13; //the biggest area
const steps = 50;
const ramp = colormap({
  colormap: 'blackbody',
  nshades: steps
});

function clamp(value, low, high){
  return Math.max(low, Math.min(value, high));
}

function getColor(feature){
  const area = getArea(feature.getGeometry());
  const f = Math.pow(clamp((area - min) / (max - min), 0,1), 1 / 2);
  const index = Math.round(f * (steps -1));
  return ramp[index];
}

const source = new VectorSource();

const map = new Map({
  target: 'map-container',

  view: new View({
    center: [0,0],
    zoom: 2
  })
});

const layer = new VectorLayer({
    source: source,
    style: function(feature) {
      return new Style ({
      fill: new Fill({
        color: getColor(feature)
      }),
      stroke: new Stroke({
        color: 'rgba(255,255,255,0.8)'
      })
    });
  }
});

map.addLayer(layer);

map.addInteraction(new DragAndDrop({
    source: source,
    formatConstructors: [GeoJSON]
}));

map.addInteraction(new Modify({
  source: source
}));

//creat a draw interaction configured to draw polygons
//and add them to our vector source:
map.addInteraction(new Draw({
  type: 'Polygon',
  source: source
}));

//configure snap interaction to work with our vector
//source and add it to the map
map.addInteraction(new Snap({
  source: source
}));

const clear = document.getElementById('clear');
clear.addEventListener('click', function(){
  source.clear();
});

const format = new GeoJSON({featureProjection: 'EPSG:3857'});
const download = document.getElementById('download');
source.on('change', function(){
  const features = source.getFeatures();
  const json = format.writeFeatures(features);
  download.href = 'data:text/json;charset=utf-8,' + json;
});

sync(map);
