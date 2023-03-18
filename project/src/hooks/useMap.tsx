import { MutableRefObject, useEffect, useState } from 'react';
import Leaflet, { LayerGroup, Map, MapOptions } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { addTileLayer, createMapInstance } from '../utils/leaflet';

type UseMapFn = (container: MutableRefObject<HTMLElement | undefined>, options: MapOptions) =>
  {
    map: Map;
    groupLayer: LayerGroup;
  } | undefined

const UseMap: UseMapFn = (ref, options) => {
  const [leaflet, setLeaflet] = useState<ReturnType<UseMapFn>>();

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const mapInstance = createMapInstance(ref.current, options);

    addTileLayer(mapInstance);
    setLeaflet({
      map: mapInstance,
      groupLayer: Leaflet.layerGroup().addTo(mapInstance)
    });

    return () => {
      mapInstance.remove();
    };
  }, [ref, options]);

  return leaflet;
};

export default UseMap;
