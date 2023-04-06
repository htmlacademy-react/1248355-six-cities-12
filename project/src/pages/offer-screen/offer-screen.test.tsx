import {DeepPartial} from '@reduxjs/toolkit';
import {RootState} from '../../types/store';
import {AuthorizationStatus, NameSpace} from '../../consts/enum';
import {makeFakeComment, makeFakeOffer, makeFakeUser} from '../../utils/mocks';
import {createMockStoreWithAPI, ProviderWrapper} from '../../utils/jest';
import {render, screen} from '@testing-library/react';
import OfferScreen from './offer-screen';

const fakeState: DeepPartial<RootState> = {
  [NameSpace.DataStatus]: {
    isLoading: false,
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    favorites: [makeFakeOffer({})],
    user: makeFakeUser()
  },
  [NameSpace.Offer]:
    {
      offer: makeFakeOffer({}),
      comments: [makeFakeComment()],
      nearOffers: [makeFakeOffer({})]
    },
  [NameSpace.Cities]:
    {
      filteredOffers: [makeFakeOffer({}), makeFakeOffer({})],
      sortedOffers: [makeFakeOffer({})],
      activeOfferId: 1,
      sourceOffers: [makeFakeOffer({})]
    }
};

const {fakeStore} = createMockStoreWithAPI(fakeState);

describe('Component: OfferScreen', () => {
  it('should render correctly', () => {
    window.scrollTo = jest.fn();
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <OfferScreen/>
      </ProviderWrapper>
    );

    let markerCount = fakeState[NameSpace.Offer]?.nearOffers?.length as number;
    const activeOffer = Number(true);
    markerCount += activeOffer;

    expect(screen.getByText('Meet the host')).toBeInTheDocument();
    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Your review')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Leaflet'})).toBeInTheDocument();
    expect(screen.getAllByAltText('Marker')).toHaveLength(markerCount);
  });
});
