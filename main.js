import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import MVT from 'ol/format/MVT';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';

const key = '<arAYMSA6rBn1mQwOvOMZ>';

const map = new Map({
    target: 'map-container',
    view: new View({
        center: [0,0],
        zoom: 2
    })
});

const layer = new VectorTileLayer({
    source: new VectorTileSource({
       attributions: [
        '<a href="http://www.openmaptiles.org/" target="_blank">&copy; OpenMapTiles</a>',
        '<a href="http://www.openstreetmap.org/about/" target="_blank">&copy; OpenStreetMap contributors</a>'
        ],
        format: new MVT(),
        //free.tilehosting.com -- works but can't get the file.
        //url: 'https://free-{a-d}.tilehosting.com/data/v3/{z}/{x}/{y}.pbf.pict?key=arAYMSA6rBn1mQwOvOMZ',
        //url: 'https://{a-d}.tiles.mapbox.com/v4/mapbox.mapbox-streets-v6/' +
        //'{z}/{x}/{y}.vector.pbf?access_token=' + key,
        //maxZoom: 14
        url: 'https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf'
    })
});
map.addLayer(layer);