import { RefObject, useLayoutEffect, useState } from 'react';
import Leaflet, { LatLngLiteral, LayerGroup, Map, MapOptions } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { addTileLayer, createMapInstance } from '../utils/leaflet';

type UseMapFn = (container: RefObject<HTMLElement>, options: MapOptions & { center: LatLngLiteral }) =>
  {
    map: Map;
    groupLayer: LayerGroup;
  } | undefined

const UseMap: UseMapFn = (ref, options) => {
  const [leaflet, setLeaflet] = useState<ReturnType<UseMapFn>>();

  useLayoutEffect(() => {
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
  }, [options, ref]);

  return leaflet;
};

export default UseMap;
