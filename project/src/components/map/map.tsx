import { Block } from '../../consts/enum';
import classNames from 'classnames';
import useMap from '../../hooks/useMap';
import React, { useEffect, useMemo, useRef } from 'react';
import { PointExpression } from 'leaflet';
import { createPoint } from '../../utils/leaflet';
import { useAppSelector } from '../../hooks/store';
import { getLocations } from '../../utils/transform';
import { getActiveOfferId } from '../../store/reducers/cities-slice/selectors';
import { Location } from '../../types/offers';
import { useParams } from 'react-router-dom';

type MapProps = {
  block: Block;
  cityLocation: Location;
  locations: ReturnType<typeof getLocations>;
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

const Map = ({ block, cityLocation, locations }: MapProps) => {
  const activeOfferId = useAppSelector(getActiveOfferId);
  const mapRef = useRef<HTMLElement>(null);
  const { id } = useParams();

  const mapOptions = useMemo(() => ({
    zoom: cityLocation.zoom,
    center: {
      lng: cityLocation.longitude,
      lat: cityLocation.latitude
    }
  }), [cityLocation.latitude, cityLocation.longitude, cityLocation.zoom]);

  const leaflet = useMap(mapRef, mapOptions);

  useEffect(() => {
    if (!leaflet) {
      return;
    }

    locations.forEach((location) => {
      const icon = location.id === (Number(id) || activeOfferId) ? Icon.Active : Icon.Default;

      createPoint(location, icon).addTo(leaflet.groupLayer);
    });

    return () => {
      leaflet.groupLayer.clearLayers();
    };
  }, [activeOfferId, id, leaflet, locations]);

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
