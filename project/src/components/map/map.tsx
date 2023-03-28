import { Block } from '../../consts/enum';
import classNames from 'classnames';
import useMap from '../../hooks/useMap';
import React, { useEffect, useMemo, useRef } from 'react';
import { PointExpression } from 'leaflet';
import { createPoint } from '../../utils/leaflet';
import { useAppSelector } from '../../hooks/store';
import { getLocations, getLocationsWithActiveOffer } from '../../utils/transform';
import { Offers } from '../../types/offers';

type MapProps = {
  block: Block;
  offers: Offers;
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

const Map = ({ block, offers }: MapProps) => {
  const activeOffer = useAppSelector((state) => state.city.activeOffer);
  const cityLocation = offers[0]?.city.location || activeOffer?.city.location;

  const locations = useMemo(() =>
    activeOffer && block === Block.Property
      ? getLocationsWithActiveOffer(offers, activeOffer)
      : getLocations(offers),
  [offers, block]);

  const mapRef = useRef<HTMLElement>(null);

  const leaflet = useMap(mapRef, {
    zoom: cityLocation.zoom,
    center: {
      lng: cityLocation.longitude,
      lat: cityLocation.latitude
    }
  });

  useEffect(() => {
    if (!leaflet) {
      return;
    }

    locations.forEach((location) => {
      const icon = location.id === activeOffer?.id ? Icon.Active : Icon.Default;

      createPoint(location, icon).addTo(leaflet.groupLayer);
    });

    return () => {
      leaflet.groupLayer.clearLayers();
    };
  }, [leaflet, activeOffer, locations]);

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
