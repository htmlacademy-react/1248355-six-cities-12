import { Block } from '../../consts/enum';
import classNames from 'classnames';
import useMap from '../../hooks/useMap';
import { useEffect, useMemo, useRef } from 'react';
import { PointExpression } from 'leaflet';
import { createPoint } from '../../utils/leaflet';
import { useAppSelector } from '../../hooks/store';
import { adaptLocation } from '../../utils/adapt';

type MapProps = {
  block: Block;
}

const MAX_NEAR_PLACES_COUNT = 3;

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

const Map = ({ block }: MapProps) => {
  const { offers, activeOffer, nearOffers } = useAppSelector((state) => state);

  const points = useMemo(() => activeOffer && block === Block.Property
    ? [...adaptLocation(nearOffers).slice(0, MAX_NEAR_PLACES_COUNT), { id: activeOffer.id, ...activeOffer.city.location }]
    : adaptLocation(offers), [block, activeOffer, offers, nearOffers]);

  const mapConfig = useMemo(() => ({
    zoom: offers[0].city.location.zoom,
    center: {
      lng: offers[0].city.location.longitude,
      lat: offers[0].city.location.latitude
    }
  }), [offers]);

  const mapRef = useRef<HTMLElement>(null);
  const leaflet = useMap(mapRef, mapConfig);

  useEffect(() => {
    if (!leaflet) {
      return;
    }

    points.forEach((point) => {
      const icon = point.id === activeOffer?.id ? Icon.Active : Icon.Default;

      createPoint(point, icon).addTo(leaflet.groupLayer);
    });

    return () => {
      leaflet.groupLayer.clearLayers();
    };
  }, [leaflet, activeOffer, points]);

  return (
    <section
      ref={mapRef}
      className={classNames('map', {
        'property__map': block === Block.Property,
        'cities__map': block === Block.Cities
      })}
    >
    </section>
  );
};

export default Map;
