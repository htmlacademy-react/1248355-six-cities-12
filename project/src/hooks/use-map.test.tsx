import useMap from './use-map';
import { renderHook } from '@testing-library/react';
import { LayerGroup, Map } from 'leaflet';

describe('Hook: useMap', () => {
  it('should return obg with 2 elements', () => {
    const mapRef = { current: document.createElement('div') };
    const mapOptions = {
      zoom: 13,
      center: {
        lng: 12.22,
        lat: 13.33
      }
    };

    const { result } = renderHook(() => useMap(mapRef, mapOptions));

    expect(result.current?.map).toBeInstanceOf(Map);
    expect(result.current?.groupLayer).toBeInstanceOf(LayerGroup);
  });

  it('should not return map if no ref', () => {
    const mapRef = { current: null };
    const mapOptions = {
      zoom: 13,
      center: {
        lng: 12.22,
        lat: 13.33
      }
    };

    const { result } = renderHook(() => useMap(mapRef, mapOptions));

    expect(result.current?.map).not.toBeInstanceOf(Map);
    expect(result.current?.groupLayer).not.toBeInstanceOf(LayerGroup);
  });
});
