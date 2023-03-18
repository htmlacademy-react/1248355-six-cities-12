import Leaflet, { IconOptions, Map, MapOptions, MarkerOptions } from 'leaflet';
import { Location } from '../types/offers';

const createMapInstance = (container: HTMLElement, options: MapOptions) =>
  Leaflet.map(container, options);

const addTileLayer = (map: Map) => Leaflet
  .tileLayer(
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    {
      attribution: '&copy; ' +
        '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; ' +
        '<a href="https://carto.com/attributions">CARTO</a>'
    }
  )
  .addTo(map);

const createPoint = (point: Location, icon: IconOptions, markerOptions: MarkerOptions = {}) =>
  Leaflet.marker({
    lat: point.latitude,
    lng: point.longitude
  }, {
    icon: Leaflet.icon(icon),
    ...markerOptions
  });

export { createPoint, createMapInstance, addTileLayer };
