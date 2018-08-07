import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZSource from 'ol/source/XYZ';
import {fromLonLat} from 'ol/proj';
import ImageLayer from 'ol/layer/Image';
import RasterSource from 'ol/source/Raster';

const key = 'pk.eyJ1IjoiZ3JlZ2drZCIsImEiOiJjamtpeGVhYWowMWE1M2psM3MzdTZzN3dqIn0.RXTUXXK7ymPJiPxbyfS2Pg';

const elevation = new XYZSource({
  url: 'https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token=' + key,
  crossOrigin: 'anonymous' 
});

function flood(pixels, data) {
  const pixel = pixels[0];
  if (pixel[3]) {
    // decode R, G, B values as elevation

    const height = -10000 + ((pixel[0] * 256 * 256 + pixel[1] * 256 + pixel[2]) * 0.1);

    if (height <= data.level) {
      //sea blue
      pixel[0] = 145; //red
      pixel[1] = 175; //green
      pixel[2] = 186; //blue
      pixel[3] = 255; //alpha
    } else {

      //transparent

      pixel[3] = 0;
    }
  }

  return pixel;
}

const raster = new RasterSource({
  sources: [elevation],
  operation: flood
});

const control = document.getElementById('level');
const output = document.getElementById('output');
control.addEventListener('input', function() {
  output.innerText = control.value;
  rasterchanged();
});

output.innerText = control.value;

raster.on('beforeoperations', function(event){
  event.data.level = control.value;
});

new Map({
  target: 'map-container',
  layers: [
    new TileLayer({
      source: new XYZSource({
        url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg'
      })
    }),
    new ImageLayer({
      opacity: 0.8,
      source: raster
    })
  ],
  view: new View({
    center: fromLonLat([-71.06, 42.37]),
    zoom: 12
  })
});
