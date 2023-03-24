import { Block } from '../../consts/enum';
import classNames from 'classnames';
import useMap from '../../hooks/useMap';
import { useEffect, useMemo, useRef } from 'react';
import { PointExpression } from 'leaflet';
import { createPoint } from '../../utils/leaflet';
import { useAppSelector } from '../../hooks/store';
import { mapOffersToLocation } from '../../utils/transform';
import { Offers } from '../../types/offers';

type MapProps = {
  block: Block;
  offers: Offers;
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

const Map = ({ block, offers }: MapProps) => {
  const activeOffer = useAppSelector((state) => state.city.activeOffer);
  const city = useAppSelector((state) => state.city.city);

  const points = useMemo(() => activeOffer && block === Block.Property
    ? [...mapOffersToLocation(offers).slice(0, MAX_NEAR_PLACES_COUNT), { id: activeOffer.id, ...activeOffer.city.location }]
    : mapOffersToLocation(offers), [activeOffer, block, offers]);

  const mapConfig = useMemo(() => ({
    zoom: city?.location.zoom,
    center: {
      lng: city?.location.longitude || 0,
      lat: city?.location.latitude || 0
    }
  }), [city]);

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
