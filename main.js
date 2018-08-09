import 'ol/ol.css';
import Overlay from 'ol/Overlay';
import {apply} from 'ol-mapbox-style';

const map = apply('map-container', './data/ugly.json');


// map.on('click', function(e) {
//   let markup = '';
//   map.forEachFeatureAtPixel(e.pixel, function(feature){
//       markup += `${markup && '<hr>'}<table>`;
//       const properties = feature.getProperties();
//       for (const property in properties){
//           markup += `<tr><th>${property}</th><td>${properties[property]}</td></tr>`;
//       }
//       markup += '</table>';
//   }, {hitTolerance: 1});
//   if (markup) {
//       document.getElementById('popup-content').innerHTML = markup;
//       overlay.setPosition(e.coordinate);
//   } else {
//       overlay.setPosition();
//   }
// });