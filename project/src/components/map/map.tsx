import { Block } from '../../consts/enum';
import classNames from 'classnames';
import useMap from '../../hooks/useMap';
import { LegacyRef, useEffect, useMemo, useRef } from 'react';
import { City, Location } from '../../types/offers';
import { PointExpression } from 'leaflet';
import { createPoint } from '../../utils/leaflet';

type MapProps = {
  block: Block;
  city: City;
  points: (Location & { id: number })[];
  activeCard?: number;
}

const Icon = {
  Default: {
    iconUrl: 'img/pin.svg',
    iconSize: [40, 60] as PointExpression,
    iconAnchor: [20, 60] as PointExpression
  },
  Active: {
    iconUrl: 'img/pin-active.svg',
    iconSize: [40, 60] as PointExpression,
    iconAnchor: [20, 60] as PointExpression
  }
};

const Map = ({ block, city, points, activeCard }: MapProps) => {
  const mapRef = useRef<HTMLElement>();
  const leaflet = useMap(mapRef, useMemo(() => ({
    zoom: city.location.zoom,
    center: {
      lng: city.location.longitude,
      lat: city.location.latitude
    }
  }), [city]));

  useEffect(() => {
    if (!leaflet) {
      return;
    }

    points.forEach((point) => {
      const icon = point.id === activeCard ? Icon.Active : Icon.Default;

      createPoint(point, icon).addTo(leaflet.groupLayer);
    });

    return () => {
      leaflet.groupLayer.clearLayers();
    };
  }, [leaflet, points, activeCard]);

  return (
    <section
      ref={mapRef as LegacyRef<HTMLElement> | undefined}
      className={classNames('map', {
        'property__map': block === Block.Property,
        'cities__map': block === Block.Cities
      })}
    >
    </section>
  );
};

export default Map;
