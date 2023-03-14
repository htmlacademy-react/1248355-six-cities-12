import { MutableRefObject, useEffect, useRef, useState } from 'react';
import Leaflet, { IconOptions, LayerGroup, Map, MapOptions, MarkerOptions } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Location } from '../types/offers';

type UseMapFn = (container: MutableRefObject<HTMLElement | null>, options: MapOptions) => {
  map: Map;
  groupLayer: LayerGroup;
} | null

const createMapInstance = (container: HTMLElement, options: MapOptions) => Leaflet.map(container, options);

const addTileLayer = (map: Map) => Leaflet
  .tileLayer(
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }
  )
  .addTo(map);

const createPoint = (point: Location, icon: IconOptions, markerOptions: MarkerOptions = {}) => Leaflet.marker({
  lat: point.latitude,
  lng: point.longitude
}, {
  icon: Leaflet.icon(icon),
  ...markerOptions
});

const UseMap: UseMapFn = (ref, options) => {
  const [leaflet, setLeaflet] = useState<null | ReturnType<UseMapFn>>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (!ref.current || isRenderedRef.current) {
      return;
    }

    const mapInstance = createMapInstance(ref.current, options);

    addTileLayer(mapInstance);
    setLeaflet({
      map: mapInstance,
      groupLayer: Leaflet.layerGroup().addTo(mapInstance)
    });

    isRenderedRef.current = true;
  }, [ref, options]);

  return leaflet;
};

export default UseMap;
export { createPoint };
