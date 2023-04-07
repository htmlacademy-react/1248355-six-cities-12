import { DeepPartial } from '@reduxjs/toolkit';
import { RootState } from '../../types/store';
import { AuthorizationStatus, Block, NameSpace } from '../../consts/enum';
import { makeFakeOffer } from '../../utils/mocks';
import { createMockStoreWithAPI, ProviderWrapper } from '../../utils/jest';
import { render, screen } from '@testing-library/react';
import Map from './map';
import { getLocationsWithActiveOffer } from '../../utils/transform';

const fakeState: DeepPartial<RootState> = {
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth
  },
  [NameSpace.Cities]: {
    sortedOffers: [makeFakeOffer({}), makeFakeOffer({})],
  },
};
const { fakeStore } = createMockStoreWithAPI(fakeState);

describe('Component: Map', () => {
  it('should render correctly', () => {
    const activeOffer = makeFakeOffer({});

    fakeState[NameSpace.Cities] = {
      activeOfferId: activeOffer.id
    };

    const offers = [makeFakeOffer({}), makeFakeOffer({})];

    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <Map
          locations={getLocationsWithActiveOffer(offers, activeOffer)}
          cityLocation={offers[0].city.location}
          block={Block.Cities}
        />
      </ProviderWrapper>
    );

    const markerCount = offers.length;
    const isActiveOffer = Number(true);
    const withActiveMarkerCount = markerCount + isActiveOffer;

    expect(screen.getByRole('link', { name: 'Leaflet' })).toBeInTheDocument();
    expect(screen.getAllByAltText('Marker')).toHaveLength(withActiveMarkerCount);
  });
});
