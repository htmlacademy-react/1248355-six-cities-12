import { RefObject, useEffect, useMemo, useState } from 'react';
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

  const memoOptions = useMemo(() => options, [options.zoom, options.center.lng, options.center.lat]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const mapInstance = createMapInstance(ref.current, memoOptions);

    addTileLayer(mapInstance);
    setLeaflet({
      map: mapInstance,
      groupLayer: Leaflet.layerGroup().addTo(mapInstance)
    });

    return () => {
      mapInstance.remove();
    };
  }, [ref, memoOptions]);

  return leaflet;
};

export default UseMap;
